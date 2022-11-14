import {useAuth} from '../../context/Auth'
import Jumbotron from '../../components/cards/Jumbotron'
import UserMenu from '../../components/Nav/UserMenu';
import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';


function UserProfile() {
    //contex
    const [auth, setAuth] = useAuth();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState("");

    useEffect(()=>{
       if(auth.user){
        const { name, email, address} = auth.user;
        setName(name);
        setEmail(email);
        setAddress(address);
       }
    },[auth?.user]);

    const handleSubmit = async(e)=>{
      e.preventDefault();
      try {
          const {data} = await axios.put("/profile", {
               name,
               password,   //this is, how to send payload using axios
               address
          });
          if(data?.error){
            toast.error(data.error)
          }else{
            setAuth({...auth, user:data});
            //locat storage update(user profile)
            let ls = localStorage.getItem("auth");
            ls = JSON.parse(ls);//conver into object from json data
            ls.user = data;
            localStorage.setItem("auth", JSON.stringify(ls));
            toast.success("Profile Updated")
          }
        

      } catch (error) {
        console.log(error)
      }
    }

  return (
    <>
        <Jumbotron title={`Hello ${auth?.user?.name}`} subtitle="Dashboard"/>

        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3">
               <UserMenu/>
            </div>
            <div className="col-md-9">
              <div className="p-3 mt-2 bg-light">Profile</div>
                  <form onSubmit={handleSubmit}>
                    <input type="text" className="form-control m-2 p-2" placeholder='Enter your name'
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                    autoFocus={true}
                     />
                     <input type="email" className="form-control m-2 p-2"  placeholder='Enter your email'
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    autoFocus={true}
                     />
                     <input type="password" className="form-control m-2 p-2"  placeholder='Enter your password'
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    autoFocus={true}
                     />
                    <textarea className="form-control m-2 p-2" placeholder='enter your address'
                     value={address} onChange={(e)=>setAddress(e.target.value)}
                     />
                     <button  className="btn btn-primary m-2 p-2">Submit</button>
                  </form>
            </div>
          </div>
        </div>
    </>
  )
}

export default UserProfile