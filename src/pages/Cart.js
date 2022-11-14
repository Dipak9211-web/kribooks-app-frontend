import React from 'react'
import { useCart } from '../context/Cart'
import Jumbotron from '../components/cards/Jumbotron'
import {useNavigate} from 'react-router-dom';
import {useAuth} from '../context/Auth'
import ProductCardHorizontal from '../components/cards/ProductCardHorizontal';
import UserCartSidebar from '../components/cards/UserCartSidebar';

function Cart() {
    //context
    const [cart, setCart] = useCart();
    const [auth] = useAuth();
    //hooks
    const navigate = useNavigate();


  return (
    <>
        <Jumbotron title={`hello ${auth?.token && auth?.user?.name}`} subtitle={cart?.length > 0? `you have ${cart.length} item in the cart. ${auth?.token? '':'please login to checkout'}`:'cart is empty'} />
   <div className="container-fluid">
    <div className="row">
        <div className="col-md-12">
            <div className="p-3 mt-2 mb-2 h4 bg-light text-center">
                {cart?.length>=1 ? 'My Cart': <div className='text-center'>
                    <button className="btn btn-primary" onClick={()=>navigate('/')}>Back to HoME</button>
                </div>}
            </div>
        </div>
    </div>
   </div>
   {cart?.length>=1 && (
     <div className="container">
        <div className="row">
            <div className="col-md-8">
            <div className="row">
               {cart?.map((p, index)=>( 
                <ProductCardHorizontal key={index} p={p}/>
                ))}) 
            </div>
            </div>

         <UserCartSidebar/>   

        </div>
     </div>
   )}
    </>
  )
}

export default Cart