import { useEffect, useState } from "react";
import PostCard from "../PostCard";
import { getDatabase, ref, onValue} from "firebase/database";
import { useSelector } from "react-redux";
function PostList({page=''}) {
    const {uid,follow,updater}=useSelector((state)=>state.auth)
    const [Post,setPost]=useState([])
    const db = getDatabase();
    const dbRef = ref(db, 'posts');
    useEffect(()=>{
        let data=[];
        onValue(dbRef, (snapshot) => {
            snapshot.forEach((childSnapshot) => {
                const childData = childSnapshot.val();
                console.log(page,uid,childData.userId,follow)
                if(page==='follow'&&follow&&follow.includes(childData.userId)){
                    data.unshift(childData)
                    setPost([...data])
                }
                if(page==='all'&&uid!==childData.userId){
                    data.unshift(childData)
                    setPost([...data])
                }
                if(page==='self'&&uid===childData.userId){
                    data.unshift(childData)
                    setPost([...data])
                }

            });
        }, {
            onlyOnce: true
        });  
        return (()=>{
            setPost([...Post])
        })
        
    },[page,updater,follow,uid])
    
    return ( 
        <div className="flex flex-col" >
            {
                Post.length===0&&<div>NO POST FOUND</div>
            }

            {Post.length>0&&Post.map((x,key)=>{
                return (
                    <PostCard key={key} Data={x} className='w-full' />
                )
            })}
        </div>
     );
}

export default PostList;