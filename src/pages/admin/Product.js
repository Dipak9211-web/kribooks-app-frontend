import {useState, useEffect} from 'react'
import {useAuth} from '../../context/Auth'
import Jumbotron from '../../components/cards/Jumbotron'
import AdminMenu from '../../components/Nav/AdminMenu';
import axios from 'axios';
import toast from 'react-hot-toast'
import { Select } from 'antd';
import {useNavigate} from 'react-router-dom'


const {Option} = Select;

function AdminProduct() {
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
    const navigate = useNavigate()
    useEffect(()=>{
      loadCategory()
    });
    const loadCategory = async()=>{
      try {
        const {data} = await axios.get("/category")
        setCategories(data)
      } catch (error) {
       // console.log(error)
        toast.error("error loading the category")
      } 
  };
  const handleSubmit= async(e) =>{
       e.preventDefault();
        try {
           const productData = new FormData();
           productData.append('photo', photo);//here we are added all form in formData
           productData.append('name', name);
           productData.append('description', description);
           productData.append('price', price);
           productData.append('category', category);
           productData.append('shipping', shipping);
           productData.append('quantity', quantity);

           const {data} = await axios.post('/product', productData);
           if(data.error){
            toast.error(data.error)
           }else{
            toast.success(`"${data.name}" is created`)
            //hook
            navigate("/dashboard/admin/products");
           }
        } catch (error) {
          console.log(error);
          toast.error("Product create failed, try again")
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
              <div className="p-3 mt-2 bg-light"> Create Product</div>
              {photo && <div className='text-center'>
                       <img src={URL.createObjectURL(photo)} alt="product" className="img img-responsive" height="200px" />
                    </div>}
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
               >
                {categories?.map((c)=><Option key={c._id} value={c._id}>{c.name}</Option>)}
               </Select>

               <Select showSearch bordered={false} size="large" className='form-select mb-3' placeholder="Choose shipping"
               onChange={(value)=>setShipping(value)}
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
                <button onClick={handleSubmit} className='btn btn-primary mb-4' >Submit</button>
            </div>
          </div>
        </div>
    </>
  )
}

export default AdminProduct