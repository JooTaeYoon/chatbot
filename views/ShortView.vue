<template>
  <div class="body">
    <div class="shot">
      <div class="main" v-for="(video, index) in videoList" :key="index">
        {{ video }}
        <video :src="`/videos/${video}`" controls></video>
      </div>
      <div class="side">
        <button @click="like">
          <img src="/images/like.png" alt="" />
          <span>좋아요</span>
        </button>
        <button @click="unlike">
          <img src="/images/unlike.png" alt="" class="transparent-trick" />
          <span>싫어요</span>
        </button>
      </div>
      <div class="bottom">밑</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      videoList: ['20151215_182647.mp4', 'VID_20120607_134525.mp4'],
    };
  },
  methods: {
    like() {
      console.log('click like');
    },
    unlike() {
      console.log('click unlike');
    },
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.body {
  margin-top: 100px;
}

.video {
  width: 100%;
  height: 100%;
}

.shot {
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  border-radius: 20px;
  width: 800px;
  height: 1000px;
  overflow: scroll;
}

.side {
  position: absolute;
  right: 0;
  top: 0;
  border: 1px solid blue;
  width: 100px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
}

.bottom {
  display: flex;
  position: absolute;
  left: 0;
  background-color: #fff; /* 배경색 */

  bottom: 0;
  width: 100%;
  border: 1px solid red;
  height: 80px;
  align-items: center;
  justify-content: center;
}

button {
  all: unset; /* 버튼 기본 스타일 없애기 */
}
.transparent-trick {
  mix-blend-mode: multiply;
  width: 100%;
  height: 100%;
}
</style>
