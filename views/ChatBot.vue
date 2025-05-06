<template>
  <div class="chatbot_box">
    <div class="check">
      <button class="btn" v-if="chattingBtn" @click="checking('chat')">
        챗봇이랑 대화 하기
      </button>
      <button class="btn" v-if="chattingBtn" @click="checking('admin')">
        관리자랑 대화 하기
      </button>

      <!--  -->
      <div class="chat-messages" v-show="sceneChat">
        <div
          v-for="(msg, index) in message"
          :key="index"
          :class="['message', msg.sender === 'user' ? 'user' : 'bot']"
        >
          <p>{{ msg.text }}</p>
        </div>
      </div>
      <!--  -->
      <div class="input-container" v-show="chatBox">
        <input type="text" class="inputTag" v-model="input" /><button
          class="btn send"
          @click="sendBtn()"
        >
          확인
        </button>
      </div>
      <div v-if="chatScenario_1">
        <button class="btn" @click="inputCheckBox($event)" v-if="chatStart">
          안녕하세요 😀
        </button>
      </div>
      <div class="showing" v-if="showingMassage">아직 준비 중 입니다.</div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      chattingBtn: true,
      showingMassage: false,
      chatBox: false,
      input: '',
      chatScenario_1: false,
      message: [{ text: '', sender: '' }],
      chatStart: true,
      sceneChat: false,
    };
  },
  mounted() {
    this.chattingBtn = true;
    this.showingMassage = false;
  },
  methods: {
    sendBtn() {
      this.chatStart = false;
      if (!this.input.trim()) return;
      const text = { text: this.input, sender: 'user' };

      this.message.push(text);
      const params = { questionKeyword: this.input, sender: 'user' };

      axios
        .post('http://localhost:8080/api/chat/message', params)
        .then((res) => {
          this.sceneChat = true;

          const botMessage = {
            text: res.data.answer,
            sender: 'bot',
          };
          this.message.push(botMessage);
          this.input = '';
          this.$nextTick(() => {
            const chattingBox = document.querySelector('.chat-messages');
            chattingBox.scrollTop = chattingBox.scrollHeight;
          });
        })
        .catch((err) => {
          console.log(err.message);
        });
    },
    showMessage() {
      this.showingMassage = !this.showingMassage;
      this.chattingBtn = true;
      this.showingMassage = false;
    },
    checking(who) {
      if (who === 'admin') {
        this.showingMassage = true;
        this.chattingBtn = false;
      } else if (who === 'chat') {
        this.chatBox = true;
        this.chattingBtn = false;
        this.chatScenario_1 = true;
      }
    },
    enterKey(_event) {
      this.chatStart = false;
      if (!this.input.trim()) return;
      const text = { text: this.input, sender: 'user' };

      this.message.push(text);
      const params = { questionKeyword: this.input, sender: 'user' };
      console.log(params);
      axios
        .post('http://localhost:8080/api/chat/message', params)
        .then((res) => {
          this.sceneChat = true;
          console.log(this.sceneChat);
          const botMessage = {
            text: res.data.answer,
            sender: 'bot',
          };
          this.message.push(botMessage);
          this.input = '';
          console.log(botMessage);
          this.$nextTick(() => {
            const chattingBox = document.querySelector('.chat-messages');
            chattingBox.scrollTop = chattingBox.scrollHeight;
          });
        })
        .catch((err) => {
          console.log(err.message);
        });
    },

    inputCheckBox(event) {
      this.input = event.target.textContent;
    },
  },
};
</script>

<style>
.chatbot_box {
  width: 300px;
  height: 500px;
  border: 1px solid black;
  border-radius: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.showing {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.check {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  position: relative;
}
.btn {
  width: 150px;
  cursor: pointer;
  height: 45px;
}
.send {
  width: 50px;
  border-radius: 10px;
  height: 27px;
  text-align: center;
  margin: auto;
}
.input-container {
  display: flex;
  gap: 10px; /* 버튼과 input 간의 간격 */
  align-items: center;
  position: absolute;
  bottom: 15px;
  margin: auto;
  opacity: 1;
}

.inputTag {
  border-radius: 30px;
  background-color: #ececec;
  width: 100%;
  max-width: 350px;
  outline: none;
}

.message {
  background-color: #ececec;
  padding: 10px;
  border-radius: 10px;
  max-width: 250px;
  margin-bottom: 5px;
  padding: 10px 15px;
  word-break: break-word;
  position: relative;
  display: flex;
  margin: 5px 10px;
}

.user {
  align-items: flex-end;
  background-color: #aee1f9;
  justify-content: flex-end;
}
.bot {
  align-items: flex-start;
  background-color: #ececec;
  justify-content: flex-start;
}

.user p {
  background-color: #aee1f9;
  border-bottom-right-radius: 0;
}

.bot p {
  background-color: #ececec;
  border-bottom-left-radius: 0;
}

.user p::after {
  content: '';
  position: absolute;
  right: -10px;
  top: 10px;
  border-width: 10px 0 10px 10px;
  border-style: solid;
  border-color: transparent #aee1f9 transparent transparent;
}

.bot p::after {
  content: '';
  position: absolute;
  left: -10px;
  top: 10px;
  border-width: 10px 10px 10px 0;
  border-style: solid;
  border-color: transparent #ececec transparent transparent;
}
.message p {
  max-width: 70%;
  padding: 10px 15px;
  border-radius: 15px;
  word-break: break-word;
  position: relative;
}
.chat-messages {
  display: flex;
  width: 100%;
  padding: 10px;
  overflow: auto;
  /* flex: 1; */
  flex-direction: column;
}
</style>
