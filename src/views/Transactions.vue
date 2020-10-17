<template>
  <div class="container">
    <h2>Transactions</h2>

    <button @click="init" class="r-margin">Start</button>
    <button @click="closeConnection" class="r-margin">Stop</button>
    <button @click="resetMessages">Reset</button>

    <table>
      <thead>
        <tr>
          <th class="fixed-width">From</th>
          <th class="fixed-width">To</th>
          <th>Sum</th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="(message, i) in messages"
          :key="i"
        >
          <td>
            <p
              v-for="(input, i) in message.x.inputs"
              :key="i"
            >
              {{ input.prev_out.addr}}
            </p>
          </td>

          <td>
            <p
              v-for="(out, i) in message.x.out"
              :key="i"
            >
              {{ out.addr}}
            </p>
          </td>

          <td>
            <p
              v-for="(out, i) in message.x.out"
              :key="i"
            >
              {{ out.value / 100000000 }}
            </p>
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
      console.log("Starting connection to WebSocket Server");
      this.connection = new WebSocket("wss://ws.blockchain.info/inv");

      this.connection.onopen = function (event) {
        console.log(event);
        console.log("Successfully connected");
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
      this.connection.close();
    },

    resetMessages() {
      this.closeConnection();
      this.messages = [];
      this.openConnection(this.sendInitMessage, this.messages);
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
  border: 1px solid #eee;
  padding: 10px;
}

.fixed-width {
  width: 420px;
}

.r-margin {
  margin-right: 10px;
}
</style>