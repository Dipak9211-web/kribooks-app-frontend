import {NavLink,Link, useNavigate} from 'react-router-dom';
import { useAuth } from '../../context/Auth';
import Search from '../forms/Search';
import useCategory from '../../hooks/useCategory';
import { useCart } from '../../context/Cart';
import {Badge} from 'antd'

export default function Menu(){
  //constex 
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  //created hooks
  const categories = useCategory();
  const navigate = useNavigate()
 // console.log("categories => ", categories);
  const logout = ()=>{
    setAuth({...auth, user:null, token:""})
    localStorage.removeItem("auth")
       navigate("/login");
  };
  
    return <>
<ul  className="nav d-flex justify-content-between shadow-sm mb-2 sticky-top bg-light" >
  <li className="nav-item">
    <NavLink to="/" className="nav-link" >HOME</NavLink>
  </li>
  <li className="nav-item">
    <NavLink to="/shop" className="nav-link" >SHOP</NavLink>
  </li>
  <div className="dropdown">
    <li>
      <Link className="nav-link dropdown-toggle" data-bs-toggle="dropdown">CATEGORIES</Link>
      <ul className="dropdown-menu" style={{height: "300px", overflow:"scroll"}}>
      <li className="nav-item">
        <NavLink to="/categories" className="nav-link">All Categories</NavLink>
      </li>
      {categories?.map(c =>(
        <li className="nav-item" key={c._id}>
        <NavLink to={`/category/${c.slug}`} className="nav-link">{c.name}</NavLink>
      </li> 
      ))}
    </ul>
    </li>
    </div>
    <li className="nav-item mt-1">
    <Badge offset={[-5, 12]} showZero={true} count={cart.length>=1? cart.length : 0}>
    <NavLink to="/cart" className="nav-link">CART</NavLink>
    </Badge>
  </li>
   <Search/>

  {!auth?.user?<>
  <li className="nav-item">
    <NavLink to="/login" className="nav-link">LOGIN</NavLink>
  </li>
  <li className="nav-item">
    <NavLink to="/register" className="nav-link">REGISTER</NavLink>
  </li>
  </>:(
    <div className="dropdown">
    <li>
      <Link className="nav-link dropdown-toggle" data-bs-toggle="dropdown">{auth?.user?.name}</Link>
      <ul className="dropdown-menu">
      <li className="nav-item">
        <NavLink to={`/dashboard/${auth?.user.role===1?'admin':'user'}`} className="nav-link">Dashboard</NavLink>
      </li>
    <li className="nav-item">
        <Link  onClick={logout}  to="/login"  className="nav-link">Logout</Link>
    </li>
    </ul>
    </li>
    </div>
   
  )
  }
</ul>
    </>
}