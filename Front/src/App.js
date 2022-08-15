import logo from './logo.svg';
import React, {useEffect, useState} from "react";
import './App.css';
import Sidebar from "./Sidebar"
import Chat from "./Chat";
import Pusher from "pusher-js";
import axios from "./axios";

function App() {
    const [messages,setMessages] = useState([]);
    useEffect(()=>{
        axios.get('/api/v1/messages/sync')
            .then(response =>{
                setMessages(response.data)
            })

    },[])

    useEffect( ()=>{
        const pusher = new Pusher('d6bf682dabac7cc2f891', {
            cluster: 'us3'
        });

        const channel = pusher.subscribe('messages');
        channel.bind('inserted', (newMessage)=> {
        // there was an alert here
            setMessages([...messages,newMessage])
        });
        return ()=>{
            channel.unbind_all();
            channel.unsubscribe();
        };
    },[messages])

    console.log(messages)
  return (
    <div className="app">
        <div className="app_body">
            <Sidebar />
            <Chat messages={messages}/>
        </div>
        { /* Chat body*/};


    </div>
  );
}

export default App;