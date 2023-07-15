import React from "react";
import { Avatar } from "@mui/material";
import './styles/profile.css'

export default function Profile({ user }){
    return(
        
            
        <div className="side-bar">
            {user ? (<div className="user_name" >
                 <img src={require("./imgs/user.png")} alt="user" className="no-user"/>
                  <p>{user.displayName}</p>
            </div>):(
                <img src={require('./imgs/download.png')} className="no-user" alt="No user" />
            )}
           
        </div>
    )
}