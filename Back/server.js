import express from 'express'
import mongoose from 'mongoose'
import Messages from './dbMessages.js'
import Pusher from "pusher";
import cors from "cors";
// app configs
const app=express();
const port= process.env.PORT || 9000;

//const Pusher = require("pusher");
const pusher = new Pusher({
    appId: "1462579",
    key: "d6bf682dabac7cc2f891",
    secret: "774dd840b4b10e3684f0",
    cluster: "us3",
    useTLS: true
});

/*pusher.trigger("my-channel", "my-event", {
    message: "hello world"
});*/

// middlewares
app.use(express.json())
app.use(cors())
/* // if not using cors use the below
app.use((req,res, next)=>{
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Headers","*");
    next();
});*/
// DB config
const connection_url='mongodb+srv://Sashank:sashank01@cluster0.gbxlbpg.mongodb.net/messengerdb?retryWrites=true&w=majority';
mongoose.connect(connection_url)
/* // since we are using advanced mongoose, the options mentioned are no longer supported
mongoose.connect(connection_url,{
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
})*/

const db = mongoose.connection
db.once('open',()=>{
    console.log("DB connected")
    const msgCollection = db.collection("messagecontents");
    const changeStream = msgCollection.watch();

    changeStream.on('change',(change)=>{
        console.log(change)
        if (change.operationType == 'insert'){
            const messageDetails = change.fullDocument;
            pusher.trigger('messages','inserted',{
                message: messageDetails.message,
                name: messageDetails.name,
                timestamps: messageDetails.timestamps,
                recieved: messageDetails.recieved
            })
        }
        else {
            console.log('Error trigger Pusher')
        }
    })
})
// api routes
app.get('/',(req,res)=> res.status(200).send('hello world'))
app.get('/api/v1/messages/sync', (req,res)=>{
    Messages.find((err,data)=>{
        if(err) {
            res.status(500).send(err)
        }
        else {
            res.status(200).send(data)
        }
        })
})
app.post("/api/v1/messages/new",(req,res)=> {
    const dbMessage = req.body
    Messages.create(dbMessage,(err,data)=>{
        if(err) {
            res.status(500).send(err)
        }
        else{
            res.status(201).send(`new message:\n ${data}`)
        }
    })
})
// listner
app.listen(port,()=> console.log(`listening on localhost:${port}`))