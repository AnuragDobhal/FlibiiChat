import { Avatar } from '@material-ui/core'
import React from 'react'
import './SidebarChat.css'

function SidebarChat() {
    return (
        <div className="sidebarChats">
        <Avatar/>
        <div className="sidebarChat_info">
            <h2>User Name</h2>
            <p>the last message</p>
        </div>
     </div>
    )
}

export default SidebarChat
