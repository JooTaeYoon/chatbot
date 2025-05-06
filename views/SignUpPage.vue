<template>
  <div>
    <div class="ocean">
      <div class="wave"></div>
      <div class="wave"></div>
    </div>
    <div class="text">
      <input
        type="text"
        placeholder="아이디"
        class="rounded-input"
        v-model="id"
        required
      />
      <input
        type="text"
        placeholder="비밀번호"
        class="rounded-input"
        v-model="password"
        required
      />
      <div class="btn_boxing">
        <button class="btn" type="submit" @click="enter($event)">확인</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      id: '',
      password: '',
    };
  },
  components: {},
  methods: {
    enter() {
      const params = {
        name: this.id,
        password: this.password,
      };

      axios
        .post('http://localhost:8080/api/signup', params)
        .then((res) => {
          console.log(res);
          this.$router.push('/loginpage');
        })
        .catch((err) => {
          console.log(err);
        });
    },
    register() {
      this.$router.push('/signup');
    },
  },
};
</script>

<style>
html,
body {
  height: 100%;
}
body {
  background: radial-gradient(
    ellipse at center,
    rgba(255, 254, 234, 1) 0%,
    rgba(255, 254, 234, 1) 35%,
    #b7e8eb 100%
  );
  overflow: hidden;
}

.ocean {
  height: 5%;
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  background: #015871;
}

.wave {
  background: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/85486/wave.svg)
    repeat-x;
  position: absolute;
  top: -198px;
  width: 6400px;
  height: 198px;
  animation: wave 7s cubic-bezier(0.36, 0.45, 0.63, 0.53) infinite;
  transform: translate3d(0, 0, 0);
}

.wave:nth-of-type(2) {
  top: -175px;
  animation: wave 7s cubic-bezier(0.36, 0.45, 0.63, 0.53) -0.125s infinite,
    swell 7s ease -1.25s infinite;
  opacity: 1;
}

@keyframes wave {
  0% {
    margin-left: 0;
  }
  100% {
    margin-left: -1600px;
  }
}

@keyframes swell {
  0%,
  100% {
    transform: translate3d(0, -25px, 0);
  }
  50% {
    transform: translate3d(0, 5px, 0);
  }
}

.text {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  flex-direction: column;
  gap: 15px;
  height: 100vh;
}

.rounded-input {
  padding: 12px 20px;
  font-size: 18px;
  /* border: none; */
  border-radius: 30px;
  background-color: #ececec;
  width: 100%;
  max-width: 350px;
  outline: none;
  transition: 0.3s;
}

.rounded-input:focus {
  background-color: #fff;
  border: 2px solid #ff6363;
}

.rounded-input::placeholder {
  color: #888;
}

.btn {
  border-radius: 30px;
  margin-top: 15px;
  font-size: 15x;
  width: 80px;
  height: 45px;
  font-size: 16px;
  transition: 0.3s;
  background-color: #ff6363;
  color: white;
  border: none;
}

.btn:focus {
  background-color: #fff;
  border: 2px solid #ff6363;
  color: #ff6363;
}
.btn::placeholder {
  color: #888;
}
.btn:hover {
  background-color: #e05252;
  cursor: pointer;
}
.memberRegister {
  cursor: pointer;
}
.btn_boxing {
  display: flex;
  gap: 20px;
}
</style>
