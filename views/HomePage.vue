<template>
  <div id="body">
    <header>
      <div class="headerBar">
        <button class="top_btn" @click="showingShort($event)">쇼츠</button>
        <button class="top_btn" @click="topBtn($event)">오목</button>
      </div>
    </header>
    <main>
      <!-- <OmokGame v-if="showComponent"></OmokGame> -->
      <RoomList v-show="showComponent"></RoomList>
      <ShortView v-show="showShort"></ShortView>
    </main>
    <footer>
      <button class="chatbot-btn" @click="chatBotClick()">
        <img src="/images/chatbot.svg" alt="chatbot" />
      </button>
      <ChatBot class="chatbot" v-show="showChatBot"></ChatBot>
    </footer>
  </div>
</template>

<script>
import ChatBot from './ChatBot.vue';
import ShortView from './ShortView.vue';
import RoomList from './RoomList.vue';
export default {
  components: {
    ChatBot,
    ShortView,
    RoomList,
  },
  data() {
    return {
      showComponent: false,
      showChatBot: false,
      showShort: false,
    };
  },
  methods: {
    topBtn(_event) {
      this.showComponent = true;
      this.showShort = false;
    },
    showingShort() {
      this.showShort = true;
      this.showComponent = false;
    },
    chatBotClick() {
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
  cursor: pointer;
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
  z-index: 1;
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
footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: auto;
  border: 1px solid red;
}
.chatbot {
  position: fixed; /* fixed로 변경 */
  bottom: 140px; /* footer 위로 조금 띄우기 */
  right: 40px; /* 오른쪽 여백 */
  z-index: 10; /* 버튼보다 뒤에 가면 안 되니까 높여 */
}
</style>
