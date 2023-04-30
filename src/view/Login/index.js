import { Container,Form,Button } from "react-bootstrap";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import {  signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseService/firebaseService";
export default function Login(){
    const [Email,setEmail]= React.useState('');
    const [Pass,setPass]= React.useState('');
    const handleEmail=(e)=>{setEmail(e.target.value)}
    const handlePass=(e)=>{setPass(e.target.value)}
    const navigate=useNavigate();
    async function login(e){
        e.preventDefault();
        signInWithEmailAndPassword(auth, Email, Pass)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          localStorage.setItem('token',JSON.stringify(user));    
          navigate('/');
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode,errorMessage)
          // ..
        });
        }


        function Registration(){
            navigate('/Register')
        }

    return(
    <div className="form-container">
        <Container className="justify-content-md-center  mt-5 p-4 frm" >
            <div className="">
                <h2 className="tile">Login</h2>
                <Form onSubmit={login}>
              <Form.Group className="mb-3 mt-3" controlId="Email">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" size="lg" placeholder="Enter email"  value={Email} onChange={handleEmail} />
              </Form.Group>

              <Form.Group className="mb-3" controlId="Password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control className="frm-inp"  size="lg" type="password" placeholder="Password" minLength="8"  value={Pass} onChange={handlePass} />
                  <span className="warn " >Min 8 characters limit.</span>
              </Form.Group>

              <center>
                  <Button className="btn-f  mt-2 center" size="lg" variant="primary" type="submit">
                    Login
                  </Button>
              </center>
              <center><span className="mb-4 text-success cursor-pointer " onClick={Registration}>Registration</span></center>
              
              </Form>
              </div>

        </Container>
     </div>

   );

}

