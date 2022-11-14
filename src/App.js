import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {Toaster} from 'react-hot-toast';

import Home from "./pages/Home";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Menu from './components/Nav/Menu';
import Dashboard from './pages/user/Dashboard';
import PrivateRoute from './components/routes/PrivateRoute';
import AdminDashboard from './pages/admin/Dashboard';
import AdminCategory from './pages/admin/Category';
import AdminRoute from './components/routes/AdminRoute';
import AdminProduct from './pages/admin/Product';
import UserOrders from './pages/user/Orders';
import UserProfile from './pages/user/Profile';
import AdminProducts from './pages/admin/ProductView';
import AdminProductUpdate from './pages/admin/ProductUpdate';
import Shop from './pages/Shop';
import Search from './pages/Search';
import SingleProductView from './pages/SingleProductView';
import CategoryList from './pages/CategoryList';
import CategoryView from './pages/CategoryView';
import Cart from './pages/Cart';
import AdminOrders from './pages/admin/Orders';

const PageNotFound = ()=>{
  return <div className='d-flex justify-content-center align-items-center vh-100'>404 | Page Not Found</div>
}
function App() {
  return (
      <BrowserRouter>
      <Menu/>
      <Toaster position='top-right'/>
        <Routes>
        {/* public, accessible for any user without login */}
          <Route path='/' element={<Home/>}/>
          <Route path='/shop' element={<Shop/>}/>
          <Route path='/categories' element={<CategoryList/>}/>
          <Route path='/category/:slug' element={<CategoryView/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/search' element={<Search/>}/>
          <Route path='/product/:slug' element={<SingleProductView/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          {/* user protected route */}
          <Route path="/dashboard" element={<PrivateRoute/>}>
          <Route path="user" element={<Dashboard/>}/>
          <Route path="user/profile" element={<UserProfile/>}/>
          <Route path="user/orders" element={<UserOrders/>}/>
          </Route>
          {/*admin protected route  */}
          <Route path="/dashboard" element={<AdminRoute/>}>
          <Route path="admin" element={<AdminDashboard/>}/>
          <Route path="admin/category" element={<AdminCategory/>}/>
          <Route path="admin/product" element={<AdminProduct/>}/>
          <Route path="admin/products" element={<AdminProducts/>}/>
          <Route path="admin/product/update/:slug" element={<AdminProductUpdate/>}/>
          <Route path="admin/orders" element={<AdminOrders/>}/>
          </Route>
          <Route path="*" element={<PageNotFound/>} replace />
        </Routes>
      </BrowserRouter>
  )
}

export default App;
