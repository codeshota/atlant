<template>
  <div>
    <h2>Drag and Resize</h2>

    <div style="height: 1000px; width: 1000px; border: 1px solid red; position: relative;">
      <vue-draggable-resizable
        v-for="(card, index) in cards"
        :key="index"
        :grid="[10,10]"
        :w="card.width"
        :h="card.height"
        :x="card.x"
        :y="card.y"
        @dragging="onDrag(index)"
        @resizing="onResize(index)"
        :parent="true"
      >
        <p>title {{ index + 1 }}</p>
      </vue-draggable-resizable>
    </div>
  </div>
</template>

<script>
import VueDraggableResizable from 'vue-draggable-resizable'
import 'vue-draggable-resizable/dist/VueDraggableResizable.css'

export default {
  name: 'Home',

  components: {
    VueDraggableResizable
  },

  data: function () {
    return {
      cards: [
        {
          width: 300,
          height: 100,
          x: 10,
          y: 10
        },
        {
          width: 300,
          height: 100,
          x: 400,
          y: 30
        },
        {
          width: 300,
          height: 100,
          x: 200,
          y: 150
        },
        {
          width: 300,
          height: 100,
          x: 600,
          y: 200
        },
      ]
    }
  },

  methods: {
    onResize: function (index) {
      console.log(index)
    },

    onDrag: function (index) {
      console.log(index)
    }
  }
}
</script>
