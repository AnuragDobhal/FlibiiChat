import React, { useEffect, useState } from 'react'
import './App.css';
import Chat from './Chat';
import Sidebar from './Sidebar.';
import Pusher from 'pusher-js';
import axios from './axios';

function App() {

  const[messages,setMessages]  = useState([]);

  useEffect(() =>{
     axios.get('/messages/sync').then(response =>{
        setMessages(response.data);
});
  },[]);

  useEffect(() => {

    const pusher = new Pusher('0fe68bd2102a1bb6074f',{
      cluster: "ap2"
    });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted',(newMessage) => {
      alert(JSON.stringify(newMessage));
      setMessages([...messages,newMessage])
    });
    },[messages]);

    console.log(messages);

  return (
    <div className="app">
    <div className="app_body">

  <Sidebar/>
  <Chat/> 
    </div>  
    </div>
  );
}

export default App;
