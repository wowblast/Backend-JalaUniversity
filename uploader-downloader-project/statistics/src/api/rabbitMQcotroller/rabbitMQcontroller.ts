import client, {Channel, Connection, ConsumeMessage} from 'amqplib'
import { createReport } from '../services/report';

export class RabbitMqController {

    private static _instance:RabbitMqController = new RabbitMqController();

    private connection: Connection;
    private channel: Channel;
    private statisticsChannel: string = 'statisticsChannel';
    private downloadChannel: string = 'downloadChannel';
    private consumer;
    constructor() {
        if(RabbitMqController._instance){
            throw new Error("Error: Instantiation failed: Use RabbitMqController.getInstance() instead of new.");
        }
        RabbitMqController._instance = this;
    }

    public async initializateRabbitMQ() {
        if(!this.connection) {
            this.connection  = await client.connect(
                'amqp://guest:guest@localhost:5672'
                );
            this.consumer = ((channel: Channel) => async (msg: ConsumeMessage | null): Promise<void> => {
                if (msg) {
                    //this.messages.push(msg.content.toString())
                    console.log("recibido de statis ", msg.content.toString())
                    channel.ack(msg)
                    
                }
            })        
            console.log("init")
            await this.initializateChannel();
            await this.createChannel(this.statisticsChannel);
            
            await this.startToReceiveMessages();
        }
    }

    async initializateChannel() {
        this.channel = await this.connection.createChannel();
    }

    async createChannel(channelName: string) {
        await this.channel.assertQueue(channelName);
    }

    public async  sendMessage(message:string, channel: string) {
        console.log("mesage sent: ", message)

        this.channel.sendToQueue(channel, Buffer.from(message))
    }

    public async startToReceiveMessages() {
        const consumer = (channel: Channel) => async (msg: ConsumeMessage | null): Promise<void> => {
            if (msg) {
              console.log("message received: on statisics " +msg.content.toString())
              console.log(await createReport())
              channel.ack(msg)
            }
          }
        
       // this.channel.consume(this.downloadChannel, consumer(this.channel))
        this.channel.consume(this.statisticsChannel, consumer(this.channel))
    }


    

    public static getInstance():RabbitMqController
    {
        return RabbitMqController._instance;
    }



   

}