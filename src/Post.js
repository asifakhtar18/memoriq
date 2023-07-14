import React, { useEffect, useState ,  } from "react";
import { Avatar } from "@mui/material";
import './styles/Post.css'
import { db  } from './firebase'
import firebase from 'firebase/compat/app';


export default function Post({ user , postId , username , caption , img }){
    const [comments , setComments] = useState([])
    const [comment ,  setComment] = useState('') 
  //const [user , setUser] = useState(null);

   


    useEffect(() =>{
        let unsubscribe ;
        if(postId){
            unsubscribe = db.collection("post")
            .doc(postId)
            .collection("comments")
            .orderBy('timestamp' , 'desc')
            .onSnapshot((snapshot) =>{
                setComments(snapshot.docs.map((doc) => doc.data()))
            })

        };


        return () => {
            unsubscribe()
        };
        
    }, [postId])


    // useEffect(() => {
    //     const unsubscribe = auth.onAuthStateChanged((authUser)=>{
    //          if(authUser){      
    //              setUser(authUser)
    //          } else {
    //              setUser(null);
    //          }
    
    //      })
    
    //      return () => {
    //          unsubscribe()
    //      };
    //    } , [user])

    const postComment = (e) => {
        e.preventDefault()
        db.collection("post").doc(postId).collection("comments").add({
            text : comment,
            username : user.displayName,
            timestamp : firebase.firestore.FieldValue.serverTimestamp()
        });

        setComment('')

    }
    


   
    return(
        <div className="post">
            
            <div className="post-left">
                <img className="post-image" src={img} alt="post" />
            </div>

           <div className="post-right">

            <div className="content">


                <div className="post-header">
                    <Avatar style={{height:"32px" , width:"32px"}} className="post-avatar"/>
                    <h3 className="post-user">{username}</h3>
                </div>


                <div className="post-caption">
                     <p><strong>{username} </strong>{caption}</p> 
                </div>

            

          
                <div className="comments-div">
                    <p style={{marginBottom:'7px'}}>Comments</p>
                    {
                   
                        comments?.map((comment) =>(
                            <p key={comment.uid} className="post-comments"> 
                                <strong > {comment.username}</strong>  {comment.text}
                            </p>
                        ))
                    }
                </div>
            
                </div>
                {user && 
                    (<form className="comment-box">
                    <input
                        className="comment-input"
                        type="text"
                        placeholder="Add a comment..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value) }
                    />
                    <button
                        className="comment-btn"
                        disabled={!comment}
                        type="submit"
                        onClick={postComment}
                    >
                        Post
                    </button>
                    </form>)
                }
            </div>
        </div>
    )
}