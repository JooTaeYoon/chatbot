<template>
  <div class="body">
    <header>
      <div class="header">
        <button class="btn" @click="createRoom">방 생성</button>
      </div>
    </header>
    <main>
      <div class="room_list">
        <div
          class="room"
          v-for="(room, index) in rooms"
          :key="index"
          @click="roomTouch(index)"
        >
          <div>방제 : {{ room.roomName }}</div>
          <div>방장 : {{ room.roomChief }}</div>
          <div>참여자 : {{ room.roomPart }}</div>
          <div>방 상태 : {{ room.status }}</div>
          <div>비밀번호 : {{ room.roomPassword }}</div>
        </div>
      </div>
    </main>
    <RoomCreateModal
      @close="showModal = false"
      v-show="showModal"
    ></RoomCreateModal>
    <footer>
      <div class="footer_list"></div>
    </footer>
  </div>
</template>

<script>
import RoomCreateModal from './RoomCreateModal.vue';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import axios from 'axios';

export default {
  components: { RoomCreateModal },
  data() {
    return {
      room_name: '방제',
      participants1_sessionId: '방장',
      participants2_sessionId: '참여자',
      status: '대기중 ',
      room_password: 'Y',
      showModal: false,
      client: null,
      sessionId: '',
      rooms: [],
    };
  },
  mounted() {
    const socket = new SockJS('http://localhost:8080/ws');
    this.client = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 1000,
      onConnect: () => {
        this.connected = true;
        this.firstConnection();
      },
      onStompError: (frame) => {
        console.error('Broker reported error: ' + frame.headers['message']);
        console.error('Additional details: ' + frame.body);
      },
    });

    this.client.activate(); // 🔥 여기 필수
  },
  methods: {
    createRoom() {
      this.showModal = true;
    },
    firstConnection() {
      const payload = {
        sessionId: '',
      };
      this.client.publish({
        destination: '/app/session/init',
        body: JSON.stringify(payload),
        headers: { 'content-type': 'application/json' },
      });

      this.positionSubscription = this.client.subscribe(
        `/topic/position/init`,
        (message) => {
          const { sessionId } = JSON.parse(message.body);
          this.sessionId = sessionId;
          this.$store.commit('setSessionId', this.sessionId);
          localStorage.setItem('sessionId', this.sessionId);
        }
      );

      this.positionSubscription = this.client.subscribe(
        `/topic/position`,
        (message) => {
          const { sessionId } = JSON.parse(message.body);
          this.sessionId = sessionId;
        }
      );

      axios.get('http://localhost:8080/api/omok/read/rooms').then((res) => {
        const data = res.data;
        for (let i = 0; i < data.length; i++) {
          this.rooms.push(data[i]);
        }
      });
    },
    roomTouch(index) {
      console.log(index);
    },
  },
};
</script>

<style scoped>
.body {
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.header {
  display: flex;
  width: 100%;
  margin-top: 30px;
}
.room_list {
  width: 100%;
  border: 1px solid red;
  height: 1000px;
  display: grid;
  gap: 15px;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(5, 1fr);
}
main {
  width: 100%;
}
footer {
  width: 100%;
}

.room {
  background-color: coral;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 10px;
  font-weight: bold;
  font-size: 20px;
  cursor: pointer;
}
</style>
