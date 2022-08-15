import React from 'react'
import "./Sidebar.css"
import ChatIcon from '@mui/icons-material/Chat';
import SettingsIcon from '@mui/icons-material/Settings';
import VrpanoIcon from '@mui/icons-material/Vrpano';
import SearchIcon from '@mui/icons-material/Search';
import {Avatar, IconButton} from "@mui/material";
import SidebarChat from "./SidebarChat";


function Sidebar() {
    return <div
        className="sidebar">
        <div className="sidebar_header">
            <Avatar src='https://www.lego.com/cdn/cs/set/assets/blt167d8e20620e4817/DC_-_Character_-_Details_-_Sidekick-Standard_-_Batman.jpg?fit=crop&format=jpg&quality=80&width=800&height=426&dpr=1'></Avatar>
            <div className="Status">
                <IconButton><VrpanoIcon /></IconButton>
                <IconButton><ChatIcon /></IconButton>
                <IconButton><SettingsIcon /></IconButton>
            </div>
        </div>
        <div className="SearchBar">
            <div className="SearchBar_Container">
                <SearchIcon />
                <input placeholder="Search Contact" type="text" />
            </div>
        </div>

        <div className="sidebar_chatroom">
            <SidebarChat/>

        </div>
    </div>;
}
export default Sidebar