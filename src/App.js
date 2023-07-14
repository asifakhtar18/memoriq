import React , {useState , useEffect} from 'react';
import Post from './Post';
import Profile from './profile';
import Header from './Header';
import './styles/App.css';
import { db  , auth } from './firebase'


function App() {
  const [posts , setPosts] = useState([])
  const [user , setUser] = useState(null);
 

 

  useEffect(()=>{

    //fetching all post from firebase db

    db.collection('post').orderBy('timestamp' , 'desc').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => ({
        id : doc.id,
        data : doc.data()
      })))
    })
  }, []) 


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
     };
   } , [user])



  return (
    <div className="App">
      <Header  />
      

      <div className='body'>

      
        

        <div>
        {
          posts.map (({id , data }) => (
            <Post 
              key={id}
              user={user}  
              postId={id} 
              username={data.username} 
              caption={data.caption} 
              img={data.img} />  
          ))
        }

        </div>
      </div>

      
   
      
    </div>
  )
}

export default App;
