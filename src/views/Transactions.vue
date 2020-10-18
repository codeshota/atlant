<template>
  <div>
    <h2>Transactions</h2>

    <button
      @click="init"
      class="r-margin"
    >Start</button>
    <button
      @click="closeConnection"
      class="r-margin"
    >Stop</button>
    <button @click="resetMessages">Reset</button>

    <table>
      <thead>
        <tr>
          <th>From</th>
          <th>To</th>
          <th>Sum</th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="(message, i) in messages"
          :key="i"
        >
          <td>
            <span
              v-for="(input, i) in message.x.inputs"
              :key="i"
            >
              {{ input.prev_out.addr}}
            </span>
          </td>

          <td>
            <span
              v-for="(out, i) in message.x.out"
              :key="i"
            >
              {{ out.addr}}
            </span>
          </td>

          <td>
            {{ calcValuesSum(message.x.out) }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'Transactions',

  data() {
    return {
      connection: null,
      message: '',
      messages: []
    }
  },


  methods: {
    init() {
      this.openConnection(this.sendInitMessage, this.messages);
    },

    openConnection(sendInitMessage, messages) {
      this.connection = new WebSocket("wss://ws.blockchain.info/inv");

      this.connection.onopen = function (event) {
        console.log(event);
        sendInitMessage();
      }

      this.connection.onmessage = function (event) {
        console.log(JSON.parse(event.data));
        messages.push(JSON.parse(event.data));
      }

      this.connection.onclose = function (event) {
        console.log(event);
      }
    },

    sendInitMessage() {
      this.connection.send(JSON.stringify({ "op": "unconfirmed_sub" }));
    },

    closeConnection() {
      this.connection && this.connection.close();
    },

    resetMessages() {
      if (this.connection) {
        this.closeConnection();
        this.messages = [];
        this.openConnection(this.sendInitMessage, this.messages);
      }
    },

    calcValuesSum(out) {
      let sum = 0;
      for (let i = 0; i < out.length; i++) {
        sum += out[i].value;
      }
      return sum / 100000000;
    }
  }
}
</script>

<style scoped>
table {
  margin-top: 10px;
  border-collapse: collapse;
  width: 100%;
}

table,
th,
td {
  border: 1px solid #ddd;
  padding: 10px;
  width: 1200px;
}

.r-margin {
  margin-right: 10px;
}
</style>