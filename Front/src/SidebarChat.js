import {Avatar} from "@mui/material";
import React from 'react';
import './SidebarChat.css';

function SidebarChat() {
    return(
    <div className="sidebarchatgroup">
        <Avatar/>
        <div className="chatgroupinfo">
            <h2>RoomName</h2>
            <p>Last message shared</p>
        </div>
    </div>
    );
}

export default SidebarChat