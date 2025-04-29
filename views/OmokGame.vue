<template v-for="i in 15" :key="'row' - +i">
  <div class="body">
    <h1>오목</h1>
    <div
      class="board"
      :style="{
        padding: '10px',
        justifyContent: 'center',
        alignItems: 'center',
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
        :class="vline"
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
          class="stone"
          :class="stones"
          :style="{
            gridRow: i,
            gridColumn: j,
            zIndex: 1,
          }"
          @click="placeStone(i - 1, j - 1)"
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
      x: '',
      y: '',
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

    // for (let i = 0; i < 15; i++) {
    //   for (let j = 0; j < 15; j++) {
    //     const stone = document.createElement('div');
    //     stone.className = 'stone';
    //     stone.style.gridRow = i + 1;
    //     stone.style.gridColumn = j + 1;
    //     board.appendChild(stone);
    //     this.stones[i][j] = stone;
    //     stone.addEventListener('click', () => {
    //       (this.x = i), (this.y = j);
    //     });
    //   }
    // }
  },
  methods: {
    placeStone(x, y) {
      this.stones[x][y] = 'placed stone';
      console.log(this.stones[x][y]);
      console.log(this.stones);
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
</style>
