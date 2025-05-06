<template>
  <div class="modal_overlay">
    <div class="modal_content">
      <slot></slot>
      <div class="room_name">
        방제 :
        <input type="text" v-model="roomName" />
      </div>
      <div class="pwd">
        비밀번호 :
        <input
          type="radio"
          name="usePwd"
          id="no_btn"
          class="btn"
          v-model="passwordOption"
          checked
          value="no"
        /><label for="no">아니오</label>
        <input
          type="radio"
          name="usePwd"
          id="yes_btn"
          class="btn"
          value="yes"
          v-model="passwordOption"
        /><label for="no">예</label>

        <transition name="slide">
          <input
            type="password"
            v-model="password"
            v-if="passwordOption === 'yes'"
            class="password-input"
          />
        </transition>
      </div>

      <div class="footer_btn">
        <button class="btn" @click="roomBtn(true)">확인</button>
        <button class="btn" @click.self="close">취소</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      passwordOption: 'no',
      password: '',
      roomName: '',
    };
  },
  methods: {
    async roomBtn(_value) {
      const payload = {
        roomName: this.roomName,
        roomPassword: this.password,
        hostName: this.$store.state.sessionId,
      };
      if (_value) {
        await axios
          .post('http://localhost:8080/api/omok/create/room', payload)
          .then((_res) => {
            this.$emit('close');
            this.$router.push(`/room/${this.$store.state.sessionId}`);
          })
          .catch((err) => {
            console.err(err.message);
          });
      }
    },
    close() {
      this.$emit('close');
    },
  },
};
</script>

<style scoped>
.btn {
  width: 30px;
  height: auto;
  font-size: 20px;
}

.modal_overlay {
  font-size: 20px;
  padding: 30px;
  font-family: 'Arial', sans-serif;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 20px;
  position: fixed;
  width: 400px;
  /* height: 100px; */
  z-index: 10;
}

.password-input {
  position: absolute;
  left: 200px; /* 필요한 위치로 조절 */
  top: 10px;
}
.modal_overlay {
  padding: 20px;
}
.footer_btn {
  display: flex;
  justify-content: center;
  gap: 15px;
}

.pwd {
  position: relative;
  display: inline-block;
}
.footer_btn > .btn {
  width: 100%;
  height: 40px;
}

input[type='password'] {
  margin-left: 20px;
}
input[type='text'] {
  margin-left: 20px;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter-from {
  opacity: 0;
  transform: translateX(20px);
}
.slide-enter-to {
  opacity: 1;
  transform: translateX(0);
}
.slide-leave-from {
  opacity: 1;
  transform: translateX(0);
}
.slide-leave-to {
  opacity: 0;
  transform: translateX(20px);
}
</style>
