import { useState } from 'react'
import Jumbotron from '../../components/cards/Jumbotron'
import axios from 'axios';
import toast, {Toaster}  from 'react-hot-toast'
import { useAuth } from '../../context/Auth';
import {useNavigate, useLocation} from 'react-router-dom'
function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
//conext hook
    const [auth, setAuth] = useAuth()
    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = async (e)=>{
       e.preventDefault();
      try {
         const {data} = await axios.post(`/login`, {email, password} )
          console.log(data)
         if(data?.error){
              toast.error(data.error)
           }else{
            localStorage.setItem("auth", JSON.stringify(data))//always store data in json fromate inside the localstorage
            setAuth({...auth, token:data.token, user:data.user })
            toast.success("Login successful")
            setEmail("");
            setPassword("");
            navigate( location.state ||`/dashboard/${data?.user?.role===1?'admin':'user'}` )
           }
         
          
        } catch (error) {
        console.log(error)
        toast.error("Login failed, try again")
      }
    }
    return (
    <>
    <Jumbotron title="Login" subtitle="Register new user"/>
      <Toaster/>
      <div className="container mb-5">
        <div className="row">
          <div className="col-md-6 offset-md-3">
          <div class="card shadow mt-3 p-3">
          <form onSubmit={handleSubmit}>
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

export default Login
