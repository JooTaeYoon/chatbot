<template>
  <div class="body">
    <h1>오목</h1>
    <div
      class="board"
      :style="{
        padding: '10px',
        justifyContent: 'center',
        alignItems: 'center',
        pointerEvents: gameOver ? 'none' : 'auto',
      }"
    >
      <div
        v-for="(row, rowIndex) in 15"
        :key="rowIndex"
        :style="{
          gridRow: '1 / 16',
          gridColumn: row,
          width: '2px',
          height: '100%',
          backgroundColor: 'black',
        }"
      >
        {{ rowIndex }}
      </div>
      <div
        v-for="(col, colIndex) in 15"
        :key="colIndex"
        :style="{
          gridColumn: '1/16',
          gridRow: col,
          width: '100%',
          height: '2px',
          backgroundColor: 'black',
        }"
      >
        {{ colIndex }}
      </div>

      <template v-for="i in 15" :key="'row-' + i">
        <div
          v-for="j in 15"
          :key="'col-' + j"
          :class="[
            'stone',
            stones[i - 1][j - 1],
            stones[i - 1][j - 1] ? 'placed' : '',
          ]"
          :style="{
            gridRow: i,
            gridColumn: j,
            zIndex: 1,
          }"
          @click="placeStone(i - 1, j - 1, turnPlayer)"
        ></div>
      </template>

      <div
        v-for="([_x, _y], index) in [
          [3, 3],
          [3, 11],
          [11, 3],
          [11, 11],
        ]"
        :key="index"
        :style="{
          width: '10px',
          height: '10px',
          borderRadius: '50%',
          backgroundColor: 'black',
          gridColumn: _x + 1,
          gridRow: _y + 1,
        }"
      ></div>
    </div>
    <WinModal
      v-show="showModal"
      @close="showModal = false"
      @call-parent="reGame"
    ></WinModal>
  </div>
</template>

<script>
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import bus from '../src/event-bus.js';
import WinModal from './WinModal.vue';

export default {
  components: { WinModal },
  data() {
    return {
      stones: Array(15)
        .fill()
        .map(() => Array(15).fill(null)),

      client: '',
      x: '',
      y: '',
      player: {
        BLACK: 'black',
        WHITE: 'white',
      },
      turnPlayer: true,
      showModal: false,
      gameOver: false,
    };
  },
  mounted() {
    const socket = new SockJS('http://localhost:8080/ws');
    this.client = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 1000,
      onConnect: () => {
        console.log('접속 성공');
      },
      onStompError: (frame) => {
        console.error('Broker reported error: ' + frame.headers['message']);
        console.error('Additional details: ' + frame.body);
      },
    });
    this.client.activate(console.log('🔥')); // 🔥 여기 필수
  },
  methods: {
    reGame() {
      this.showModal = false;
      this.stones = Array(15)
        .fill()
        .map(() => Array(15).fill(null));
      this.gameOver = false;
    },
    placeStone(x, y, _turnPlayer) {
      if (this.stones[x][y]) return;

      this.stones[x][y] = _turnPlayer ? 'black' : 'white';
      this.turnPlayer = !_turnPlayer;

      this.win(x, y);
    },
    countInDirection(x, y, dx, dy) {
      let count = 0;
      const color = this.stones[x][y];
      let nx = x + dx;
      let ny = y + dy;

      while (this.inBoard(nx, ny) && this.stones[nx][ny] === color) {
        count++;
        nx += dx;
        ny += dy;
      }
      return count;
    },
    inBoard(x, y) {
      return x >= 0 && x < 15 && y >= 0 && y < 15;
    },
    win(x, y) {
      const direction = [
        [1, 0],
        [0, 1],
        [1, 1],
        [-1, -1],
      ];

      for (const [i, j] of direction) {
        const total =
          1 +
          this.countInDirection(x, y, i, j) +
          this.countInDirection(x, y, -i, -j);
        if (total === 5) {
          this.showModal = true;
          bus.emit('winner', { winnerPlayer: this.stones[x][y] });
          this.gameOver = true;
          // const $board = document.querySelector('.board');
          // $board.style.pointerEvents = 'none';
          return true;
        }
      }
    },
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
  grid-template-columns: repeat(15, 1fr); /* 15개의 열 */
  grid-template-rows: repeat(15, 1fr); /* 15개의 행 */
  width: 800px;
  height: 800px;
  background-color: var(--board-color);

  justify-items: center;
  align-items: center;
}
.stone {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background-color: white;
  opacity: 0;
}
.stone:hover {
  opacity: 0.3;
}
.black:hover {
  background-color: black;
}
.white:hover {
  background-color: white;
}

.stone.black {
  background-color: black;
}

.stone.white {
  background-color: white;
}
.stone.placed {
  opacity: 1;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
}
</style>
