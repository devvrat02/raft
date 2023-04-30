import { Card } from 'antd';
import { Input } from 'antd';
import { useForm, Controller } from "react-hook-form";
import { getDatabase, ref, set } from "firebase/database";
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';


const { TextArea } = Input;
function Post() {
    type FormData = {
        Post:string
      };
   const {uid,email,name}=useSelector((state:RootState)=>state.auth)
   function writePost(userId:string,Post:string,email:string,name:string) {
    const db = getDatabase();
    let timeid=userId+Date.now();
    const userpostListRef = ref(db, 'users/'+ userId +'/posts/'+timeid);
    let data={
      rel:timeid,
      Msg:Post,
      userId:userId,
      Like:0,
      Comment:[],
      email,
      username:name,
      time:Date.now()
      }
    set( userpostListRef, data);
   
   const postListRef = ref(db, 'posts/'+timeid);
   set(postListRef,data);
  
  }      

    const {
        control,
        handleSubmit,
      } = useForm<FormData>({ defaultValues: {
        Post:''
      }})
  
      const upload=(data:any)=>{
        writePost(uid,data.Post,email,name)
      }
    return ( 
        <div className="w-auto shadow-md bg-white rounded-lg">
                    <Card title="FEED ">
                        <div className='flex flex-col '>
                            <Controller
                                name="Post"
                                control={control}
                                rules={{
                             required: true,
                            }}
                            render={({ field }) =>(
                                <TextArea rows={4} 
                                    id={field.name}
                                    value={field.value}
                                    onChange={field.onChange}
                                    placeholder='Enter Message'
                                />
                                )}
                            />
                            <div className='flex flex-row justify-center p-2'>
                                <div className='w-20 h-8 p-2 flex justify-center justify-items-center rounded text-neutral-50 cursor-pointer' style={{background:'#0a80ed'}} onClick={handleSubmit(upload)}>POST</div>
                            </div>
                        </div>
                    </Card>
                
                
        </div>
     );
}

export default Post;