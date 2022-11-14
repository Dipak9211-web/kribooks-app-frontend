import {useState, useEffect} from 'react'
import {useNavigate, useLocation} from 'react-router-dom'

import LoadingGIF from '../../images/dilip-sardesai.webp';


function Loading({path="login"}) {
    const [count, setCount] = useState(3);
    const navigate = useNavigate();
    const location = useLocation();
    //console.log(location)
   
     useEffect(() => {
       const interval = setInterval(()=>{
          setCount((currentCount)=> --currentCount);
       },1000)
     //  redirect once count equal to zero
       count === 0 && navigate(`${path}`, {
        state:location.pathname
       })
       //cleanup
       return ()=>clearInterval(interval)

     }, [count])
    
  return (
    <div className='d-flex justify-content-center align-items-center' style={{height:"90vh"}}>
    <img src={LoadingGIF} alt="Loading..." style={{width:"480px"}} />
    </div>
  )
}

export default Loading