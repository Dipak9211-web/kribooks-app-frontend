import moment from 'moment';
import { useCart } from '../../context/Cart'



function ProductCardHorizontal({p, remove= true}) {
 //hooks
    const [cart, setCart] = useCart();
      //remove cart
const removeFromCart = (productId)=>{
  let myCart = [...cart];
  let index= myCart.findIndex((item)=>item._id === productId)
  myCart.splice(index, 1);
  setCart(myCart);
  localStorage.setItem("cart", JSON.stringify(myCart))
};
  return (
    <>
        <div className="card mb-3" >
                   <div className="row g-0">
                      <div className="col-md-4">
                        <img src={`${process.env.REACT_APP_API}/product/photo/${p._id}`} alt={p.name} 
                            style={{height:"170px", objectFit:"cover", marginLeft:"-12px", borderTopLeftRadius:"0px"}}
                        />
                      </div>
                      <div className="col-md-8">
                           <div className="card-body">
                            <h5 className="card-title">
                             {p.name} {p?.price?.toLocaleString("USD", {
                               style:'currency',
                               currency:'USD'
                               })}
                             </h5> 
                            
                             <p className="card-text"><small className="text-muted">
                                Listen {moment(p.createAt).fromNow()}
                             </small></p>
                           </div>
                      </div>
                       <div className="d-flex justify-content-between">
                       <p className="card-text">{`${p?.description?.substring(0, 50)}...`}</p>
                       <p className="text-danger mb-2" onClick={()=>removeFromCart(p._id)} style={{cursor:"pointer"}} >
                            {remove}
                        </p>
                      
                       </div>
                   </div>
                </div>
    </>
  )
}

export default ProductCardHorizontal