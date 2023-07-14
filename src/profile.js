import React from "react";
import { Avatar } from "@mui/material";
import './styles/profile.css'

export default function Profile({ user }){
    return(
        
            
        <div className="side-bar">
            {user ? (<div className="user_name" >
                 <Avatar className="profile-avatar" />
                  <h2>{user.displayName}</h2>
            </div>):(
                <img src={require('./imgs/download.png')} id="no-user" alt="No user" />
            )}
           
        </div>
    )
}