
import React, { useState } from "react";
import { storage , db } from "./firebase";
import firebase from 'firebase/compat/app';
import Box from '@mui/material/Box';
import { Button , Input}  from '@mui/material';
import Modal from '@mui/material/Modal';
import './styles/imageUpload.css'


export default function ImageUpload({username}){
    const [open , setOpen] = useState(false)
    const [caption , setCaption] = useState('')
    const [image , setImage] = useState(null)
    const [progress , setProgress] = useState(0)

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 300,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const handleChange = (e) =>{
        if(e.target.files[0]){
            setImage(e.target.files[0])
        }
    }

    const handleUpload = () => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image)

        uploadTask.on(
            "state_changed",
            (snapshot) => {
               const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progress)
            },
            (error) => {
                console.log(error)
            },
            () => {
                storage
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then(url =>{
                            db.collection("post").add({
                                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                                caption: caption,
                                img : url,
                                username : username
                            })
                            setProgress(0);
                            setCaption('');
                            setImage();
                            setOpen(false)
                        }
                    )

            }
        )

    }



    return(
        <div>

            <Button onClick={()=> setOpen(true)} > Upload </Button>

            <Modal
                open={open}
                onClose={()=> setOpen(false)}
                className="modal"
                
            >
    
            <Box sx={style} >

                <div className="image-upload">


                <progress 
                    value={progress} 
                    max="100"
                    className="upload-progress" 
                />

                <Input
                    placeholder="Enter a caption..."
                    type="text"
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    className="upload-input"
                />

                <Input 
                    type="file"
                    onChange={handleChange}
                    className="upload-input"
                />
            
                <Button className="upload-btn" onClick={handleUpload}>Upload</Button>
            </div>
            </Box>
            </Modal>






            
        </div>
    )
}