import {BrowserRouter, Route,Routes} from 'react-router-dom';
import Dashboard from '../view/Dashboard';
import Login from '../view/Login';
import Register from '../view/Register';
import { useEffect ,useState} from 'react';
import { setuser } from "../reducers/authSlice";
import { useSelector, useDispatch } from "react-redux";
import {ProtectedRoute} from "./ProtectedRoutes"
import { RootState } from '../store';
import { getDatabase, ref, child, get } from "firebase/database"

function Router() {
    const dispatch=useDispatch();
    const {isLogged,name}=useSelector((state:RootState)=>state.auth)
    const [userval,setuserval]=useState({
        username:'',
        follow:[]
    })
    useEffect(()=>{
    const token:any = localStorage.getItem('token')
    if ((token&&!isLogged)||name==='') {
      let user=JSON.parse(token)
      const dbRef = ref(getDatabase());
      get(child(dbRef, `users/${user.uid}`)).then((snapshot) => {
        if (snapshot.exists()) {
          let fl:any=snapshot.val().follow
          let x:any={username:snapshot.val().username,follow:(fl.length>0)?[...fl]:[]}
          setuserval(x)
        } else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      });
      dispatch(setuser({...user,username:userval.username,follow:userval.follow}))
      }

    },[dispatch,isLogged,userval,name])

    
    return ( 
    <BrowserRouter>
      <Routes>
        <Route path='/' element={
                  <ProtectedRoute>
                    <Dashboard/>
                  </ProtectedRoute>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='*' element={<></>}/>
      </Routes>
      </BrowserRouter>
     );
}

export default Router;