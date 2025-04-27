<template>
  <div class="body">
    <h1>오목</h1>
    <div
      class="board"
      :style="{
        display: 'grid',
        gridTemplateColumns: 'repeat(15, 1fr)',
      }"
    >
      <div
        class="vline"
        v-for="i in 15"
        :key="i"
        :style="{ left: (i * 100) / 16 + '%' }"
      ></div>
      <div
        v-for="i in 15"
        :key="'h' + i"
        class="hline"
        :style="{ top: (i * 100) / 16 + '%' }"
      ></div>

      <div
        class="stone"
        v-for="(stone, colIndex) in row"
        :key="`${rowIndex} - ${colIndex}`"
        :style="{
          top: (rowIndex * 100) / 15 + '%',
          left: (colIndex * 100) / 15 + '%',
        }"
      ></div>
    </div>
  </div>
</template>

<script>
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

export default {
  data() {
    return {
      stones: Array(15)
        .fill(null)
        .map((_) => Array(15).fill(null)),
      client: '',
    };
  },
  methods: {},
  mounted() {
    const socket = new SockJS('http://localhost:8080/ws');
    this.client = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 3000,
      onConnect: () => {
        console.log('접속 성공');
      },
      onStompError: (frame) => {
        console.error('Broker reported error: ' + frame.headers['message']);
        console.error('Additional details: ' + frame.body);
      },
    });

    this.client.activate(); // 🔥 여기 필수
  },
};
</script>

<style>
:root {
  --board-color: #deb887;
  --box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
  --size: 480px;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.body {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
}
.board {
  display: grid;
  grid-template-columns: repeat(15, 1fr);
  grid-template-rows: repeat(15, 1fr);

  width: 800px;
  height: 800px;
  background-color: var(--board-color);
  justify-items: center;
  align-items: center;
}

.vline {
  width: 2px;
  height: 100%;
  background-color: black;
}
.hline {
  width: 100%;
  height: 2px;
  background-color: black;
}
.stone {
  border-radius: 50%;
  background-color: white;
  width: 45px;
  height: 45px;
  opacity: 0.1;
}
</style>
