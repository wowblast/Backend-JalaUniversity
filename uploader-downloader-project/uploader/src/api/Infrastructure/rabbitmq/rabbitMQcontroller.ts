import client, {Channel, Connection, ConsumeMessage} from 'amqplib'

export class RabbitMqController {

    private static _instance:RabbitMqController = new RabbitMqController();

    private connection: Connection;
    private channel: Channel;
    private uploadChannel: string = 'uploadChannel';
    private downloadChannel: string = 'downloadChannel';
    private statisticsChannel: string = 'statisticsChannel';

    private consumer;
    private isuploaderReady = true;
    private myconsumer;
    private messages: Array<string> = new Array();
    
    constructor() {
        if(RabbitMqController._instance){
            throw new Error("Error: Instantiation failed: Use RabbitMqController.getInstance() instead of new.");
        }
        //this.initializateRabbitMQ()
        RabbitMqController._instance = this;
    }

    public async initializateRabbitMQ() {
        if(!this.connection) {
            this.connection  = await client.connect(
                'amqp://guest:guest@localhost:5672'
                );
            this.consumer = ((channel: Channel) => async (msg: ConsumeMessage | null): Promise<void> => {
                if (msg) {
                    this.messages.push(msg.content.toString())
                    //console.log(this.messages)
                    channel.ack(msg)
                    this.uploadFiles()
                    
                }
            })        
            console.log("init")
            this.isuploaderReady = true;
            await this.initializateChannel();
            await this.createChannel(this.uploadChannel);
            await this.createChannel(this.downloadChannel);
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

    public async  sendMessage(message:string) {
        console.log("mesage sent: ", message)

        //this.channel.sendToQueue(this.uploadChannel, Buffer.from(message))
        this.channel.sendToQueue(this.downloadChannel, Buffer.from(message))
        //this.channel.sendToQueue(this.statisticsChannel, Buffer.from("hola statiscits"))


    }

    public async startToReceiveMessages() {
       
        this.myconsumer = await this.channel.consume(this.uploadChannel, this.consumer(this.channel))
        if(!this.isuploaderReady) {
           
            //await this.stopToRceiveMessages()
        }
        
    }

    public async uploadFiles() {
        const sleep = (ms) => new Promise(r => setTimeout(r, ms));
        if(this.isuploaderReady) {

            this.isuploaderReady = false
            while(true) {
                await sleep(5000)
                let currentMesages = this.messages
                console.log("done ", currentMesages[0])
                this.messages.shift()
                console.log(this.messages)
                if(this.messages.length == 0) {
                    break;
                }
                
                
            }
            this.isuploaderReady = true;

        }
      
    }
    

    public static getInstance():RabbitMqController
    {
        return RabbitMqController._instance;
    }

   

}