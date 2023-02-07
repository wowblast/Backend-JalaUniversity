const amqp = require("amqplib");
async function directExchangeConsumer() {
  try {
    const rabbitmqUrl = "amqp://localhost:5672";
    const connection = await amqp.connect(rabbitmqUrl);
    const exchange = "jobs";
    const exchangeType = "direct";
    const routingKey = process.argv[2];
    const options = {};
    let channel = await connection.createChannel();
    await channel.assertExchange(exchange, exchangeType, options);
    const { queue } = await channel.assertQueue("", options);
    channel.bindQueue(queue, exchange, routingKey);
    channel.consume(queue, (data) => {
      console.log("Received", JSON.parse(data.content.toString()));
      channel.ack(data, false, true);
    });
  } catch (error) {
    console.error(error);
  }
}
directExchangeConsumer();