<template>
  <div>
    <h2>Drag and Resize</h2>

    <button @click="returnLastCard">Return last card</button>

    <div class="table">
      <vue-draggable-resizable
        v-for="(card, index) in cards"
        :key="index"
        v-show="!card.disabled"
        :grid="[10, 10]"
        :x="card.x"
        :y="card.y"
        :z="card.z"
        :w="card.width"
        :h="card.height"
        :min-width="30"
        :min-height="30"
        :parent="true"
        @dragging="onDrag"
        @resizing="onResize"
        @activated="onActivated(index)"
        class="card"
      >
        <div class="card-header">
          <button
            class="card-disable-button"
            @click="disableCard(index)"
          >x</button>
          <p class="card-title">Title {{ card.id }}</p>
        </div>
      </vue-draggable-resizable>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Table',

  data() {
    return {
      cards: [
        {
          id: 1,
          width: 300,
          height: 100,
          x: 70,
          y: 20,
          z: 'auto',
          disabled: false
        },
        {
          id: 2,
          width: 300,
          height: 100,
          x: 450,
          y: 320,
          z: 'auto',
          disabled: false
        },
        {
          id: 3,
          width: 300,
          height: 100,
          x: 690,
          y: 230,
          z: 'auto',
          disabled: false
        },
        {
          id: 4,
          width: 300,
          height: 100,
          x: 750,
          y: 100,
          z: 'auto',
          disabled: false
        },
        {
          id: 5,
          width: 300,
          height: 100,
          x: 250,
          y: 190,
          z: 'auto',
          disabled: false
        }
      ],

      currentCardIndex: null,

      disabledCardsOrder: []
    }
  },

  watch: {
    disabledCardsOrder() {
      localStorage.setItem('storedDisabledCardsOrder', JSON.stringify(this.disabledCardsOrder));
    },

    cards: {
      deep: true,
      handler() {
        localStorage.setItem('storedCards', JSON.stringify(this.cards));
      }
    }
  },

  mounted() {
    if (localStorage.storedCards) {
      this.cards = JSON.parse(localStorage.getItem('storedCards'));
    }

    if (localStorage.storedDisabledCardsOrder) {
      this.disabledCardsOrder = JSON.parse(localStorage.getItem('storedDisabledCardsOrder'));
    }
  },

  methods: {
    onResize: function (x, y, width, height) {
      this.cards[this.currentCardIndex].x = x;
      this.cards[this.currentCardIndex].y = y;
      this.cards[this.currentCardIndex].width = width;
      this.cards[this.currentCardIndex].height = height;
    },

    onDrag: function (x, y) {
      this.cards[this.currentCardIndex].x = x;
      this.cards[this.currentCardIndex].y = y;
    },

    onActivated(index) {
      this.currentCardIndex = index;
      this.cards.forEach(card => card.z = 'auto');
      this.cards[index].z = 1;
    },

    disableCard(index) {
      this.cards[index].disabled = true;
      this.disabledCardsOrder.push(index);
    },

    returnLastCard() {
      if (this.disabledCardsOrder.length > 0) {
        const lastCardIndex = this.disabledCardsOrder[this.disabledCardsOrder.length - 1];
        this.cards.forEach(card => card.z = 'auto');
        this.cards[lastCardIndex].width = 300;
        this.cards[lastCardIndex].height = 100;
        this.cards[lastCardIndex].x = 450;
        this.cards[lastCardIndex].y = 300;
        this.cards[lastCardIndex].z = 1;
        this.cards[lastCardIndex].disabled = false;
        this.disabledCardsOrder.splice(-1, 1);
      }
    }
  }
}
</script>

<style scoped>
.table {
  margin-top: 10px;
  height: 800px;
  width: 1200px;
  border: 1px solid #ddd;
  position: relative;
}

.card {
  background: #fff;
  border: 1px solid #ddd;
}

.card-header {
  position: relative;
  border-bottom: 1px solid #ddd;
}

.card-disable-button {
  position: absolute;
  left: 5px;
  line-height: 10px;
  padding: 1px 3px;
}

.card-title {
  margin: 5px;
  text-align: center;
}
</style>