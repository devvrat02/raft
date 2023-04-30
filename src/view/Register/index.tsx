import { Container,Form,Button } from "react-bootstrap";
import * as React from 'react'
import {  createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseService/firebaseService";
import { useNavigate } from "react-router-dom";
import { getDatabase, ref, set } from "firebase/database";

function writeUserData(userId:string, name:string, email:string, imageUrl:string,pass:string) {
  const db = getDatabase();
  set(ref(db, 'users/' + userId), {
    username: name,
    email: email,
    profile_picture : imageUrl,
    pass:pass,
    post:[]
  });
}


export default function Register(){
    const [Email,setEmail]= React.useState('');
    const [Pass,setPass]= React.useState('');
    const [Name,setName]= React.useState('');
    const handleEmail=(e:any)=>{setEmail(e.target.value)}
    const handlePass=(e:any)=>{setPass(e.target.value)}
    const handleName=(e:any)=>{setName(e.target.value)}

    const [send,setSend]=React.useState(false);
    const navigate=useNavigate();
    const CheckPassword=(inputtxt:string)=>{ 
    var passw=   /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
        if(inputtxt.match(passw)) 
        { 
            return true;
        }
        else
        { 
            alert('Format Password!')
            return false;
        }
    }

    async function registerUser(e:any){
    e.preventDefault();
    if(CheckPassword(Pass)){
        createUserWithEmailAndPassword(auth, Email, Pass)
        .then((userCredential) => {
          // Signed in 
          const user:any = userCredential.user;
          console.log(user)
          writeUserData(user.uid,Name,Email,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjSLQf7OlSIhHyhCGTo0G4YrJ1jpoB2p5QLc5h_zxLOg&usqp=CAU&ec=48665698',Pass)
          localStorage.setItem('token',JSON.stringify(user)); 
          console.log(user)
          setSend(!send)
          console.log(user)   
          navigate('/')
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode,errorMessage)
          // ..
        });
       
    }
    }

    const login=()=>{
        navigate('/login');
    }

    return( 
    <div className="form-container">
    <Container className="justify-content-md-center  mt-5 p-4 frm" >
        <div className="">
            <h2 className="tile">Sign Up</h2>
          <Form onSubmit={registerUser}>
          
          <Form.Group className="mb-3 mt-3" controlId="Email">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" size="lg" placeholder="Enter email" value={Email} onChange={handleEmail} />
          </Form.Group>
          <Form.Group className="mb-3 mt-3" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" size="lg" placeholder="Enter Name" value={Name} onChange={handleName} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="Password">
              <Form.Label>Password</Form.Label>
              <Form.Control className="frm-inp"  size="lg" type="password" placeholder="Password" minLength={8} value={Pass} onChange={handlePass} />
              <span className="warn " >Min 8 characters limit.</span>
          </Form.Group>

          <center>
              <Button className="btn-f mt-2 center" size="lg" variant="primary" type="submit">
                Sign Up
              </Button>
          </center>
          <center><span className="mt-5 mb-4 text-success cursor-pointer" onClick={login}>Login</span></center>
          </Form>
          </div>


    </Container>
 </div>
);

}

