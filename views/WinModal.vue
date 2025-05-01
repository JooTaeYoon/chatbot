<template>
  <div class="modal-overlay">
    {{ winner }} 승리
    <slot></slot>
    <div class="btn_position">
      <button class="btn" @click="$emit('call-parent')">다시 하기</button>
      <button class="btn" @click.self="close">닫기</button>
    </div>
  </div>
</template>

<script>
import bus from '../src/event-bus.js';
export default {
  data() {
    return {
      winner: '',
    };
  },
  created() {
    bus.on('winner', (data) => {
      this.winner = data.winnerPlayer;
    });
  },
  methods: {
    close() {
      this.$emit('close');
    },
    reGame() {},
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  width: 50%;
  z-index: 1;
  height: 500px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  background-color: rgba(0, 0, 0, 0.6);

  flex-direction: column;
  font-weight: bold;
  border: 1px solid red;
}
.btn_position {
  display: flex;
  gap: 20px;
  padding: 10px;
}
</style>
