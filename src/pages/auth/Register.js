import { useState } from 'react'
import Jumbotron from '../../components/cards/Jumbotron';
import axios from 'axios';
import toast, {Toaster}  from 'react-hot-toast'
import { useAuth } from '../../context/Auth';
import {useNavigate} from 'react-router-dom'

function Register() {
    const [name, setName] = useState('');//here the name is state and to update name we can use setName function//means name===state, setName=funtion(used to updste the state)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
   //context hook
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e)=>{
       e.preventDefault();
      try {
         const {data} = await axios.post(`/register`, {name, email, password} )
          console.log(data)
         if(data?.error){
              toast.error(data.error)
           }else{
            localStorage.setItem("auth", JSON.stringify(data))
            setAuth({...auth, token:data.token, user:data.user })
            toast.success("Registration successful")
            setName("")
            setEmail("");
            setPassword("");
            navigate("/dashboard/user")
           }
         
          
        } catch (error) {
        console.log(error)
        toast.error("Registration failed, try again")
      }
    }
    return (
    <>
    <Jumbotron title="Register" subtitle="Register new user"/>
      <Toaster/>
      <div className="container mb-5">
        <div className="row">
          <div className="col-md-6 offset-md-3">
          <div class="card shadow mt-3 p-3">
          <form onSubmit={handleSubmit}>
              <input type="text"  value={name} onChange={(e)=>setName(e.target.value)} autoFocus className="form-control mb-4 p-2" placeholder='enter your name' />
              <input type="email"  value={email} onChange={(e)=>setEmail(e.target.value)}  className="form-control mb-4 p-2" placeholder='enter your email' /> 
              <input type="password"  value={password} onChange={(e)=>setPassword(e.target.value)} className="form-control mb-4 p-2" placeholder='enter your password' />  
             <button type="submit" className="btn btn-primary" >Submit</button>
          </form>
          </div>
          </div>
        </div>
      </div>
     </>
  )
}

export default Register
