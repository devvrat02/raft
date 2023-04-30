import { getDatabase, ref, update,onValue } from "firebase/database";
import { Input } from 'antd';
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import {ReactComponent as Send} from '../../images/send.svg'
import {ReactComponent as Like} from '../../images/like.svg'
import {ReactComponent as Follow} from '../../images/follow.svg'
import { useSelector,useDispatch } from 'react-redux';
import { RootState } from '../../../store';
import {updatestate} from '../../../reducers/authSlice'
const { TextArea } = Input;
function PostCard({Data}:any) {
    const {uid:userId,follow}=useSelector((state:RootState)=>state.auth)
    function writeNewPost(pid:string,uid:string, username:string,Like:number,Comment:string[]=[]) {
        const dbRef = ref(getDatabase());
        let postData={
            ...Data,
            rel:pid,
            userId:uid, 
            username,
            Like,
            Comment,
        }

        const updates:any = {};
        updates['/posts/' + pid] = postData;
        updates['/users/' + uid + '/posts/' + pid] = postData;
        return update(dbRef, updates);
    }

  function Followstatus(uid:string,fuid:string ) {
    const db = getDatabase();
    const dbRef = ref(db, 'users/');
        onValue(dbRef, (snapshot) => {
            snapshot.forEach((childSnapshot:any) => {
                const id:any = childSnapshot.key;
                    if(id===uid){
                        const childData:any = childSnapshot.val()
                        const dbuserRef = ref(getDatabase());
                        let nfollow:any=[];
                        if(follow&&follow.length>0&&follow.includes(fuid)){
                           let temp=follow;
                            for( var i = 0; i < follow.length; i++){ 
                                if ( temp[i] === uid) { 
                                    if(temp.length>1){
                                        temp.splice(i, 1);
                                    } 
                                    temp=[]
                                    i--; 
                                }
                            }
                            nfollow=temp
                        }else{
                            if(follow&&follow.length>0){
                                nfollow=[uid,...follow]
                            }else nfollow=[uid]

                        }
                            let userData={
                                ...childData,
                                follow:nfollow,
                            }
                            const updates:any = {};
                            updates['/users/' + uid ] = userData;
                            update(dbuserRef, updates);
                    }
                
            });
        }, {
            onlyOnce: true
        });     
    
    }
    const dispatch=useDispatch()
    const followup=()=>{
        Followstatus(userId,Data.userId);
        dispatch(updatestate())
    }

    const Likeupdate=()=>{
        writeNewPost(Data.rel,Data.userId,Data.username,Data.Like+1)
        dispatch(updatestate())
    }

    type FormData = {
        Comment:string
      };
    const {
        control,
        handleSubmit,
      } = useForm<FormData>({ defaultValues: {
        Comment:''
      }})
    const addcomment=(data:any)=>{
            console.log(data)
            let x:string[]=[];
            console.log(x)
            if(Data.Comment&&(Data.Comment.length>0)){
                x=[...Data.Comment]
            }
            x.unshift(data.Comment)
            console.log(data)
            writeNewPost(Data.rel,Data.userId,Data.username,Data.Like,x)
            dispatch(updatestate())
        
    }

    const CommentComponent=()=>{
        return (
            <div className="shadow-md bg-white rounded-lg">
                    <div className="border-neutral-200 w-full flex flex-col justify-between pr-4 pl-4 ">
                        <div>
                                <Controller
                                        name="Comment"
                                        control={control}
                                        rules={{
                                    required: true,
                                    }}
                                    render={({ field }) =>(
                                        <TextArea rows={2} 
                                            id={field.name}
                                            value={field.value}
                                            onChange={field.onChange}
                                            placeholder='Enter Comment'
                                        />
                                        )}
                                    />
                        </div>
                    </div>
                    <div className="w-full flex justify-end my-2">
                            <div className="w-1/6 flex p-2 cursor-pointer" onClick={handleSubmit(addcomment)}>
                                Send <Send className="w-5"/>
                            </div>
                    </div>
            </div>
        )
    }


    const [showcomment,setshowcomment]=useState(false)
    return ( 
        <div className="w-auto border-neutral-200 mt-4 border-1 flex flex-col justify-start pt-2 rounded-lg" style={{background:"#ffffff"}}>
            <div className="border-neutral-200 border-b-2 w-full flex flex-row justify-between pr-4 pl-4 pb-2">
                <div>
                    User:{Data.username}
                </div>
                <div className={`flex cursor-pointer ${follow.includes(Data.userId)?`text-purple-800`:`text-white-800`}`} onClick={followup}>
                    <Follow className="w-5"/>{follow.includes(Data.userId)?'Unfollow':'Follow'} 
                </div>
            </div>
            <div className="h-20">
                {Data.Msg}
            </div>
            <div className="border-neutral-200 border-t-2 w-full flex flex-row justify-between pr-4 pl-4 py-1">
                <div className="flex flex-row cursor-pointer" onClick={Likeupdate}>
                    {Data.Like}<Like className="w-5"/> Like 
                </div>
                <div className="cursor-pointer" onClick={()=>{setshowcomment(!showcomment)}}>
                    Comment 
                  
                </div>
            </div>
            <div className="pt-2 pb-2">
                {Data.Comment&&Data.Comment.map((x:string,key:number)=>{
                    return (
                        <div key={key} className="">
                        <div className="flex flex-col items-start pl-4 py-1">
                                {x}
                        </div>
                    </div>    
                    
                    )}
                    )
                }
            </div>

            {showcomment&&<CommentComponent/>}
        </div>
     );
}

export default PostCard;