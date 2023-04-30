import { createSlice } from '@reduxjs/toolkit'

interface Userstate {
  users:any,
  email:string,
  uid:string,
  name:string,
  follow:string[],
  isLogged:boolean,
  updater:boolean
}
const initialState:Userstate={
  users:{},
  email:'',
  name:'',
  uid:'',
  follow:[],
  isLogged:false,
  updater:false,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setuser: (state,user:any) => {
      state.users={...user}
      state.uid=user.payload.uid
      state.name=user.payload.username
      state.email=user.payload.email
      state.follow=[...user.payload.follow]
      state.isLogged=true
    },   
    unsetuser: (state) => {
      state.users=[]
      state.isLogged=false
      localStorage.removeItem('token'); 
    },
    updatestate:(state)=>{
      state.updater=!state.updater
    }
  },
})

// Action creators are generated for each case reducer function
export const { setuser,unsetuser,updatestate } = authSlice.actions

export default authSlice.reducer