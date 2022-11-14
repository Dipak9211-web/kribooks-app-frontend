import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/Auth"
import { useCart } from "../../context/Cart";
import DropIn from "braintree-web-drop-in-react"
import toast from "react-hot-toast";


function UserCartSidebar() {
    //context
    const [auth, setAuth] = useAuth();
    const [cart, setCart] = useCart();
    //hooks
    const [clientToken, setClientToken] = useState("");
    const [instance, setInstance] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    useEffect(()=>{
        if(auth?.token){
          getClientToken()
        }
      }, [auth?.token]);
  
      const getClientToken = async () =>{
          try {
              const {data} = await axios.get("/braintree/token");
              setClientToken(data.clientToken)
          } catch (error) {
              console.log(error)
          }
      }
        //price of total added cart
        const cartTotal = () =>{
            let total = 0;
            cart.map((item)=>{
                total += item.price;
            });
            return total.toLocaleString("en-US", {
                style:"currency",
                currency:"USD"
            });
        };

 //buy course//handle buy
 const handleBuy = async()=>{
    try{
        setLoading(true)
      const {nonce} = await instance.requestPaymentMethod();
      //console.log("nonce=>", nonce)
      const {data} = await axios.post("/braintree/payment", {
        nonce, cart
      });
      setLoading(false)
     localStorage.removeItem("cart")
     setCart([]);
     navigate("/dashboard/user/orders")
     toast.success("Payment Successful")
    }catch(error){
        console.log(error)
        setLoading(false)
    }
 }
  return (
        <div className="col-md-4">
            <h4>Your cart summary</h4>
                <p>total/delivery/ address</p>
                <hr />
                <h4>Total: {cartTotal()}</h4>
                 {auth?.user?.address?(
                    <>
                    <div className='mb-3'>
                    <hr />
                    <h4>Delivery address:</h4>
                    <h5>{auth?.user?.address}</h5>
                </div>
                <button className='btn btn-outline-warning'
                 onClick={()=>navigate("/dashboard/user/profile")}
                >Update Address</button>
                    </>
                ):(
                    <div className="mb-3">
                        {auth?.token? (
                            <button className="btn btn-outline-warning" onClick={()=>navigate("/dashboard/user/profile")}>
                                Add devivery address
                            </button>
                        ):(
                          <button className="btn btn-outline-danger mt-3" onClick={()=>navigate("/login", {
                            state:"/cart"
                          })}>
                            Login to checkout
                          </button>
                        )}
                        <div>       
                        </div>
                    </div>
                ) } 
                {!clientToken || !cart?.length? '':(
                    <>
                <DropIn options={{
                   authorization: clientToken,
                //    paypal:{
                //      flow: "vault",
                //       },
                }}
                    onInstance = {(instance)=> setInstance(instance)}
                />
                <button className="btn btn-primary col-12 mt-2"
                onClick={handleBuy}
                disabled={!auth?.user?.address || !instance || loading}
                >{loading?'Processing...':"Buy"}</button>
                </>)}
                
            </div>
  )
}

export default UserCartSidebar