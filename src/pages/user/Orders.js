import {useAuth} from '../../context/Auth'
import Jumbotron from '../../components/cards/Jumbotron'
import UserMenu from '../../components/Nav/UserMenu';
import { useState } from 'react';
import { useEffect } from 'react';
import moment from 'moment'
import ProductCardHorizontal from '../../components/cards/ProductCardHorizontal';
import axios from 'axios';

function UserOrders() {
    //contex
    const [auth] = useAuth();
    //state
    const [orders, setOrders] = useState([]);

    useEffect(()=>{
     if(auth?.token) getOrders();
    },[auth?.token]);

    const getOrders = async()=>{
      try {
        const {data} = await axios.get("/orders");
        setOrders(data);
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
              <div className="p-3 mt-2 bg-light">Orders</div>
                
                  {orders?.map((o, i) => {
                    return (
                      <div key={o._id} className="border shadow bg-light rounded-4 mb-5">
                           <table className='table'>
                            <thead>
                              <tr>
                                <th scope="col">#</th>
                                <th scope="col">Status</th>
                                <th scope="col">Buyer</th>
                                <th scope="col">Ordered</th>
                                <th scope="col">Payment</th>
                                <th scope="col">Quantity</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>{i + 1}</td>
                                <td>{o?.status}</td>
                                <td>{o?.buyer?.name}</td>
                                 <td>{moment(o.createdAt).fromNow()}</td>                              
                                 <td>{o?.payment?.status?"Success":"Failed"}</td>
                                 <td>{o?.products?.length} products</td>
                              </tr>
                            </tbody>
                           </table>  
                           <div className="container">
                        <div className="row m-2">
                        {o?.products?.map((p, index)=>(<ProductCardHorizontal key={index} p={p} remove={false}/>))}
                        </div>
                       </div>
                            
                      </div>
                    )
                  })}
                 </div>
            </div>
          </div>
          
    </>
  )
}

export default UserOrders