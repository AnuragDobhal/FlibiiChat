//importing
import express from "express";
import mongoose from 'mongoose';
import Messages from './dbMessages.js';
import Pusher from 'pusher';
import cors from 'cors';

//app config
const app = express();
const port = process.env.PORT || 9000;



const pusher = new Pusher({
  appId: "1105520",
  key: "0fe68bd2102a1bb6074f",
  secret: "04d361f91f3871981f02",
  cluster: "ap2",
  useTLS: true
});


//MID LEWARE

app.use(express.json());

app.use(cors())


//DB config
const connection_url ="mongodb+srv://myadmin:qXd4D21chGvdXWjH@cluster0.cj8tz.mongodb.net/flibiichat?retryWrites=true&w=majority";

mongoose.connect(connection_url,{

    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true
});


const db = mongoose.connection

db.once("open",()=>{

    console.log("DataBase is connected")

    const msgCollection = db.connection("messagecontents");
 
    const changeStream = msgCollection.watch();
    console.log(change);

    changeStream.on('change',(change)=>{
        console.log('change occured',change);


if(change.operationType==='insert')
{
const messageDetails = change.fullDocument;
pusher.trigger('messages','inserted',
{
   name:messageDetails.name,
   message:messageDetails.message,
   timestamp:messageDetails.timestamp,
});
    }else{
        console.log('error triggering Pusher')
    }
    });
});

//API routes:
// 200 means "OKAY" it is the  (means the request is gone to the server)
// 201 means the request message is stored in the Data Base Successfully. 
// These are International statistics .

//GET is used when we need to FETCH some information.
//POST is used when we need to PUSH  some information to the DataBase.
//DELETE is used when we need to DELETE some information / DATA .

app.get("/", (req,res) => res.status(200).send("hello Flibii world"));

app.get('/messages/sync',(req,res)=>{

    Messages.find((err,data)=>{

        if(err) {
            res.status(500).send(err)
        }
        else{
            res.status(200).send(data)
        }
    })
})




app.post("/messages/new",(req,res)=>{

    const dbMessage = req.body;

    Messages.create(dbMessage,(err,data) =>{
        if(err){
            //500 means INTERNAL ERROR in the server:
            res.status(500).send(err)
        }
        else{
            // 201 means every thing is OKAY :
            res.status(201).send(`new message created: \n ${data}`)
        }

    })
})
    
//Listeners

app.listen(port,()=>console.log(`Listening on localhost:${port}`));