<template>
  <div id="body">
    <header>
      <div class="headerBar">
        <span><p>오목</p></span>
        <button class="top_btn" @click="topBtn($event)">오목</button>
      </div>
    </header>
    <main>
      <OmokGame v-if="showComponent"></OmokGame>
    </main>
    <footer>
      <button class="chatbot-btn" @click="chatBotClick()">
        <img src="../images/chatbot.svg" alt="chatbot" />
      </button>
      <ChatBot class="chatbot" v-model="showChatBot"></ChatBot>
    </footer>
  </div>
</template>

<script>
import OmokGame from './OmokGame.vue';
import ChatBot from './ChatBot.vue';
export default {
  components: {
    OmokGame,
    ChatBot,
  },
  data() {
    return {
      showComponent: false,
      showChatBot: false,
    };
  },
  methods: {
    topBtn(event) {
      console.log(event);
      this.showComponent = true;
    },
    chatBotClick() {
      console.log('click');
      this.showChatBot = !this.showChatBot;
    },
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
#body {
  display: flex;
  flex-direction: column;
}
.headerBar {
  width: 100%;
  height: 80px;
  /* background-color: #eefaf7; */
  transition: height 1s ease;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.headerBar span button {
  flex: 1;
  text-align: center;
}

.headerBar:hover {
  height: 100px;
  transition: height 1s ease;
}

.top_btn {
  background: none;
  border: none;
  font-size: 20px;
  position: relative;
  overflow: hidden;
}
.ripple {
  position: absolute;
  border-radius: 50%;
  background: red;
  animation: rippleEffect 0.6s linear;
  transform: scale(0);
}
@keyframes rippleEffect {
  to {
    transform: scale(4);
    opacity: 0;
  }
}
footer {
  position: relative;
}
.chatbot-btn:hover {
  width: 110px;
  height: 110px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  transition: width 0.3s ease, height 0.3s ease;
}
.chatbot-btn {
  all: unset; /* 버튼 기본 스타일 없애기 */
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 100px;
  height: 100px;
  border-radius: 50%;

  transition: width 0.3s ease, height 0.3s ease;
}
img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.chatbot {
}
</style>
