import {useAuth} from '../../context/Auth'
import { useState, useEffect } from 'react';
import Jumbotron from '../../components/cards/Jumbotron'
import AdminMenu from '../../components/Nav/AdminMenu';
import axios from 'axios';
import toast from 'react-hot-toast'
import CategoryForm from '../../components/forms/CategoryForm';
import { Modal } from 'antd';


function AdminCategory() {
    //contex
    const [auth] = useAuth();
    //state
    const [name, setName] = useState("");
    const [categories, setCategories] = useState([]);
    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState(null)
    const [updateName, setUpdateName] = useState("")
    useEffect(()=>{
     loadCategory();
    },[])
    const loadCategory = async()=>{
        try {
          const {data} = await axios.get("/category")
          setCategories(data)
        } catch (error) {
          console.log(error)
        }
    }
    const handleSubmit = async(e)=>{
        e.preventDefault();
        try {
            const {data} = await axios.post('/category', {name})
            if(data?.error){
              toast.error(data.error)
            }else{
              loadCategory();
              setName("");
              toast.success(`${data.name} is created`)
            }
        } catch (error) {
          console.log(error)
          toast.error('create category failed, try again')
        }
    }
    const handleUpdate = async (e)=>{
      e.preventDefault();
      try {
      
        const {data} = await axios.put(`/category/${selected._id}`, {name:updateName});
       // console.log(data)
        if(data?.error){
          toast.error(data?.error)
         }else{
          toast.success(`"${data.name}" is updated`);
          setSelected(null);
          setUpdateName("");
          loadCategory()//use to directly updated the category in the web page
          setVisible(false)
         } 
      } catch (error) {
        console.log(error);
        toast.error("category may already exist, try again")
      }
    }
    //delete category
    const handleDelete = async(e)=>{
      e.preventDefault();
      const {data} = await axios.delete(`/category/${selected._id}`);
      if(data?.error){
        toast.error(data?.error)
      }else{
        toast.success(`${data?.name} is deleted`);
        setSelected(null);
        loadCategory();
        setVisible(false);
      }
      try {
        
      } catch (error) {
        console.log(error);

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
              <div className="p-3 mt-2 h4 bg-light">Manage Category</div>
               <CategoryForm value={name} setValue={setName} handleSubmit={handleSubmit}/>
              <hr />
              <div className="col">
                  {categories.map((c)=>(
                    <button key={c._id} className="btn btn-outline-primary m-3" onClick={()=>{
                      setVisible(true);
                      setSelected(c);
                      setUpdateName(c.name);
                    }}>{c.name}</button>
                  ))}
                  </div>  
                  <Modal open={visible} onOk={()=>setVisible(false)} onCancel = {()=>setVisible(false)} footer={null}>
                  <CategoryForm 
                  value={updateName} setValue={setUpdateName}
                   handleSubmit={handleUpdate} buttonText="Update"
                    handleDelete={handleDelete}
                   />
                  </Modal>
          </div>
          </div>
        </div>
    </>
  )
}

export default AdminCategory