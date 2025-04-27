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
      <div class="chat-messages">
        <div v-for="(msg, index) in messages" :key="index" class="message">
          <p>{{ msg }}</p>
        </div>
      </div>
      <!--  -->
      <div class="input-container" v-show="chatBox">
        <input
          type="text"
          class="inputTag"
          v-model="input"
          @keydown.enter="enterKey($event)"
        /><button class="btn send" @click="enterKey($event)">확인</button>
      </div>
      <div v-if="chatScenario_1">
        <button class="btn" @click="inputCheckBox($event)">
          안녕하세요 😀
        </button>
      </div>
      <div class="showing" v-if="showingMassage">
        관리자가 직접 답 해줍니다.
      </div>
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
      message: [],
    };
  },
  mounted() {
    this.chattingBtn = true;
    this.showingMassage = false;
  },
  methods: {
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
      if (!this.input.trim()) return;
      const userMessage = this.input;
      this.message.push(userMessage);
      const params = { questionKeyword: this.input };

      axios
        .post('http://localhost:8080/api/chat/message', params)
        .then((res) => {
          const botMessage = res.data.answer;
          this.message.push(botMessage);
          this.input = '';
          console.log(this.message);
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

  transition: opacity 0.5s ease; /* 서서히 나타나게 할 transition */
  transition: opacity 0.5s ease, visibility 0.5s ease; /* opacity와 visibility를 서서히 변하게 함 */
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
  align-self: flex-start;
}
</style>
