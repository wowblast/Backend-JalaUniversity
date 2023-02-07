const amqp = require("amqplib");
async function directExchange() {
  try {
    const rabbitmqUrl = "amqp://localhost:5672";
    const connection = await amqp.connect(rabbitmqUrl);
    const exchange = "jobs";
    const exchangeType = "direct";
    const routingKey = "software_engineer";
    const options = {};
    const payload = {
      Name: "Jeff",
      yearOfExperience: 2,
    };
    let channel = await connection.createChannel();
    await channel.assertExchange(exchange, exchangeType, options);
    channel.publish(
      exchange,
      routingKey,
      Buffer.from(JSON.stringify(payload)),
      options
    );
  } catch (error) {
    console.error(error);
  }
}
directExchange();