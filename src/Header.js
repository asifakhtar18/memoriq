import React, {  useState , useEffect } from 'react'
import { auth } from './firebase.js'
import Box from '@mui/material/Box';
import { Button , Input}  from '@mui/material';
import Modal from '@mui/material/Modal';
import ImageUpload from './imageUpload.js';
import './styles/header.css'
import Profile from './profile.js';


export default function Header(){

    const [open, setOpen] = useState(false);
    const [signinOpen , setSigninOpen] = useState(false)
    const [email , setEmail] = useState('');
    const [username , setUsername] = useState('');
    const [password , setPassword] = useState('');
    const [user , setUser] = useState(null);

    //const handleOpen = () => setOpen(true);
    

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '350px',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,

    };
      

    const signUp = (event) => {
        event.preventDefault();
    
        auth
          .createUserWithEmailAndPassword(email, password)
          .then((authUser) => {
            return authUser.user.updateProfile({
              displayName: username
            })
            .then((authUser) =>{
              setUser(authUser);
            })
    
          })
          .catch((error) => alert(error.message));
    
        setOpen(false);
      }






    //   const signUp = (e) => {
    //     e.preventDefault();
       
    //     auth.createUserWithEmailAndPassword(email , password)
    //     .then((authUser) =>{
    //         return authUser.user.updateProfile({
    //             displayName: username
    //         })
    //     })
    //     .catch((err) => alert(err.message));

    //     setOpen(false)
    //     setEmail('')
    //     setPassword('')
    //     setUsername('')
    //   }

      useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser)=>{
             if(authUser){      
                 setUser(authUser)
             } else {
                 setUser(null);
             }
    
         })
    
         return () => {
             unsubscribe()
         }
       } , [user , username])
            


      const signIn = (e) => {
        e.preventDefault();

        auth
        .signInWithEmailAndPassword(email , password)
        .catch((err) => alert(err.message))

        setSigninOpen(false)
        setEmail('')
        setPassword('')
      }
 



    return(
        <header className="App-header">

            
            <img src={require('./imgs/logo.png')} id='hero-logo' alt='logo' />
            
            <div className='buttons'>

                {user?.displayName?(
                    <ImageUpload username={user.displayName} />
                
                    ):(
                    <h3></h3>
                )}


                {user ? (
                    <Button onClick={() => auth.signOut()}>Logout</Button>
                    ):(
                    
                    <div>
                        <Button onClick={() => setOpen(true)}>Sign Up</Button>
                     <Button onClick={() => setSigninOpen(true)}>LogIn</Button>

                    </div>
                
                
                )}

                <Profile user={user} />

            
            </div>

            
            <Modal
                open={signinOpen}
                onClose={()=> setSigninOpen(false)}
                className="modal"

            >
    
            <Box sx={style}>
                <form className='app-signup'>
                    <Input 
                        placeholder='email'
                        type='text'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                     />
                     
                     <Input 
                        placeholder='password'
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                     />

                     <Button className='signup-button' onClick={signIn}>Login</Button>
                </form>        
            </Box>
            </Modal>
           






            <Modal
                open={open}
                onClose={()=> setOpen(false)}
                className="modal"
            >
    
            <Box sx={style}>
                
                <form className='app-signup'>
                    <Input 
                        placeholder='email'
                        type='text'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                     />
                     <Input 
                        placeholder='username'
                        type='text'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                     /> 
                     <Input 
                        placeholder='password'
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                     />

                     <Button className='signup-button' onClick={signUp}>SignUp</Button>
                </form>
                
                
                
            </Box>

            </Modal>

            

            
           
        </header>
    )
}