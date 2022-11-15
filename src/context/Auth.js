import axios from "axios";
import { useState, createContext, useContext, useEffect } from "react";

const AuthContext = createContext();

const AuthProvider = ({children}) =>{//those component which is use this context they all consider as a children(rap component)
    const [auth, setAuth] = useState({
        user:null,
        token:"",
    });
    //axios config
    axios.defaults.baseURL=process.env.REACT_APP_API;
    axios.defaults.headers.common['Authorization'] = auth?.token
      useEffect(()=>{
        const data = localStorage.getItem("auth");
        if(data){
            const parsed = JSON.parse(data);//converting json data to into js object using JSON.parse(data)
            setAuth({...auth, user:parsed.user, token:parsed.token})
        }
      },[])
    return (
        <AuthContext.Provider value={[auth, setAuth]}>
                {children}
        </AuthContext.Provider>
    ) 
}
const useAuth = ()=>useContext(AuthContext);
//now in our component we can easily access=> const [auth, setAuth] = useAuth()
export {useAuth, AuthProvider};