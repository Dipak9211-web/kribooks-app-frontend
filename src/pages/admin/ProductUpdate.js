import {useState, useEffect} from 'react'
import {useAuth} from '../../context/Auth'
import Jumbotron from '../../components/cards/Jumbotron'
import AdminMenu from '../../components/Nav/AdminMenu';
import axios from 'axios';
import toast from 'react-hot-toast'
import { Select } from 'antd';
import {useNavigate, useParams} from 'react-router-dom'


const {Option} = Select;

function AdminProductUpdate() {
    //contex
    const [auth] = useAuth();
    //state
    const [categories, setCategories] = useState([])
    const [photo, setPhoto] = useState("")
    const[name, setName] = useState("");
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [category, setCategory] = useState("")
    const [shipping, setShipping] = useState("")
    const [quantity, setQuantity] = useState("")
    const [id, setId] = useState("")
    //router hook 
    const navigate = useNavigate()
    const params = useParams();
    useEffect(()=>{
        loadProduct();
    },[])
    useEffect(()=>{
      loadCategory()
    },[]);
    const loadCategory = async()=>{
      try {
        const {data} = await axios.get("/category")
        setCategories(data)
      } catch (error) {
       // console.log(error)
        toast.error("error loading the category")
      } 
  };
  const loadProduct = async()=>{
      try {
        const {data} = await axios.get(`/product/${params.slug}`);
        setName(data.name);
        setDescription(data.description);
        setPrice(data.price);
        setCategory(data.category._id);
        setShipping(data.shipping);
        setQuantity(data.quantity);
        setId(data._id);
      } catch (error) {
        console.log(error)
      }
  }
  const handleUpdate= async(e) =>{
       e.preventDefault();
        try {
           const productData = new FormData();
          photo && productData.append('photo', photo);//here we are added all form in formData
           productData.append('name', name);
           productData.append('description', description);
           productData.append('price', price);
           productData.append('category', category);
           productData.append('shipping', shipping);
           productData.append('quantity', quantity);
           

           const {data} = await axios.put(`/product/${id}`, productData);
           if(data.error){
            toast.error(data.error)
           }else{
            toast.success(`"${data.name}" is updated`)
            //hook
            navigate("/dashboard/admin/products");
         
           }
        } catch (error) {
          console.log(error);
          toast.error("Product update failed, try again")
        }
  };
  //handle Delete product by admin
   const handleDelete = async(e)=>{
       e.preventDefault();
       try {
        const answer = window.confirm("Are you sure you want to delete this product")
        if(!answer) return;
        const {data} = await axios.delete(`/product/${id}`);
        toast.success(`${data.aame} is deleted`)
        navigate("/dashboard/admin/products")
       } catch (error) {
          console.log(error);
          toast.error("Deleting process failed, try again")
       }
   }
  return (
    <>
        <Jumbotron title={`Hello ${auth?.user?.name}`} subtitle="Admin Dashboard"/>

        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3">
               <AdminMenu/>
            </div>
            <div className="col-md-9">
              <div className="p-3 mt-2 h4 bg-light"> Update Product</div>
              {photo ? (
                <div className='text-center'>
                       <img src={URL.createObjectURL(photo)} alt="product" className="img img-responsive" height="200px" />
                </div>
              ):(
                <div className='text-center'>
                       <img src={`${process.env.REACT_APP_API}/product/photo/${id}?${new Date().getTime()}`} alt="product updated" className="img img-responsive" height="200px" />
                </div>
            )}
               <div className="pt-2">
               <label className='btn btn-outline-secondary col-12 mb-3'>
                   
                    {photo? photo.name:"Upload Photo"}
                 <input type="file" name="photo" accept='image/*'
                   onChange={e=>setPhoto(e.target.files[0])}
                  hidden
                    />
               </label>
               </div>

               <input type="text" className='form-control p-2 mb-3'
                placeholder='write a name'
                  value={name}
                  onChange={(e)=>setName(e.target.value)}
                />
                <textarea type="text" className='form-control p-2 mb-3'
                placeholder='write a description'
                  value={description}
                  onChange={(e)=>setDescription(e.target.value)}
                />
                <input type="number" className='form-control p-2 mb-3'
                 placeholder='Enter price'
                  value={price}
                  onChange={(e)=>setPrice(e.target.value)}
                />

               <Select showSearch bordered={false} size="large" className='form-select mb-3' placeholder="Choose category"
               onChange={(value)=>setCategory(value)}
               value={category}
               >
                {categories?.map((c)=><Option key={c._id} value={c._id}>{c.name}</Option>)}
               </Select>

               <Select showSearch bordered={false} size="large" className='form-select mb-3' placeholder="Choose shipping"
               onChange={(value)=>setShipping(value)}
               value={shipping? "Yes": "No"}
               >
                <Option value="0">No</Option>
                <Option value="1">Yes</Option>
               </Select>


               <input type="number" className='form-control p-2 mb-3'
                placeholder='Enter quantity'
                min="1"
                  value={quantity}
                  onChange={(e)=>setQuantity(e.target.value)}
                />
                <div className="d-flex justify-content-between">
                <button onClick={handleUpdate} className='btn btn-primary mb-4' >Update</button>
                <button onClick={handleDelete} className='btn btn-danger mb-4' >Delete</button>
                </div>
            </div>
          </div>
        </div>
    </>
  )
}

export default AdminProductUpdate