import React, {useState} from 'react'
import './Chat.css'
import {Avatar, IconButton} from "@mui/material";
import {AttachmentOutlined, InsertEmoticon, Mic, MoreVert, SearchOutlined} from "@mui/icons-material";
import axios from './axios'

function Chat({ messages }){
    const [input,setinput] = useState('')
    const sendMessage = async (e)=>{
        e.preventDefault();
        axios.post('/api/v1/messages/new',{
            message: input,
            name: "Bruce",
            timestamps: new Date().toUTCString(),
            recieved: false
        });
        setinput('')
    }
    return(
    <div className="chat">
        <div className="Header">
            <Avatar/>
            <div className="Headerinfo">
                <h2> Room Name</h2>
                <p>last seen info</p>
            </div>
            <div className="HeaderOptions">
                <IconButton><SearchOutlined/> </IconButton>
                <IconButton><AttachmentOutlined/> </IconButton>
                <IconButton><MoreVert/> </IconButton>
            </div>
        </div>

        <div className="ChatBody">
            {messages.map(message => (
                <p className={`ChatMessage ${message.recieved && "MessageRecieved"} ${!message.recieved && "MessageSent"}`}>
                    <span className="chatterName">{message.name}</span>
                    {message.message}
                    <span className="MsgTimestamp">{message.timestamps}</span>
                </p>
            ))}
        </div>

        <div className="MessengerInputs">
            <InsertEmoticon/>
            <form>
                <input value = {input}
                       onChange={(e)=> setinput(e.target.value)}
                       type="text"
                       /*value={messageinput}
                       onChange={(e)=> setInput(e.target.value)}*/
                       placeholder="type in message"/>
                <button onClick={sendMessage}
                        type="Submit">Send</button>
            </form>
            <Mic/>
        </div>

    </div>
    );
}

export default Chat

/*
<p className="ChatMessage MessageRecieved">
                <span className="chatterName">Alfred</span>
                In the name of everything holy, master Bruce..
                <span className="MsgTimestamp">{new Date().toUTCString() }</span>
            </p>
            <p className="ChatMessage MessageRecieved">
                <span className="chatterName">Alfred</span>
                What have you done?..
                <span className="MsgTimestamp">{new Date().toUTCString() }</span>
            </p>
            <p className="ChatMessage MessageSent">
                <span className="chatterName">Bruce</span>
                I had to do it Alfred, and you know why!
                <span className="MsgTimestamp">{new Date().toUTCString() }</span>
            </p>
            <p className="ChatMessage MessageRecieved">
                <span className="chatterName">Alfred</span>
                Why..?
                <span className="MsgTimestamp">{new Date().toUTCString() }</span>
            </p>
            <p className="ChatMessage MessageSent">
                <span className="chatterName">Bruce</span>
                BECAUSE I'M BATMAN!!!
                <span className="MsgTimestamp">{new Date().toUTCString() }</span>
            </p>
            <p className="ChatMessage MessageSent">
                <span className="chatterName">Bruce</span>
                Everything is batman!
                Everything is cool when you'r BAT MAN!!
                Everything is Batman!!
                BECAUSE I'M BATMAN!!!
                <span className="MsgTimestamp">{new Date().toUTCString() }</span>
            </p>
 */