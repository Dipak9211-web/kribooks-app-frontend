import React, { useEffect, useState } from 'react'
import Jumbotron from '../components/cards/Jumbotron'
import axios from 'axios'
import toast from 'react-hot-toast';
import ProductCard from '../components/cards/ProductCard';
import { Checkbox, Radio } from 'antd';
import { prices } from '../Prices';


function Shop() {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [checked, setChecked] = useState([]);//check categories
    const [radio, setRadio] = useState([]);//use for radio for price value
    //filter prodduct
    useEffect(()=>{
        if(!checked.length || !radio.length) loadProducts();//no length of check and radio then load all products
   },[]);

    useEffect(()=>{
        if(checked.length || radio.length) loadFilteredProduct()//means if checked or radio has some value then run loadFilterProducts
    },[checked, radio]);

   
    const loadFilteredProduct = async()=>{
         try {
            const {data} = await axios.post('/filtered-products', {checked, radio}) //where checked=[categorories id],radio=[range of price array like=>[0, 19] ] 
             setProducts(data)
            console.log(data);
        } catch (error) {
            console.log(error)
         }
        }
    const loadProducts = async()=>{
         try {
            const {data} = await axios.get('/products');
            setProducts(data)
         } catch (error) {
            console.log(error);
            toast.error("Load products failed")
         }
    };
    useEffect(()=>{
        loadCategaries()
    },[])
    const loadCategaries = async()=>{
        try {
            const {data} = await axios.get('/category');
            setCategories(data)
        } catch (error) {
            console.log(error)
            toast.error("Load categories failed")
        }
    };
    const handleCheck = (value, id)=>{
        let all = [...checked];//intially it is empty aaray but after check the checkboxes it have some value related to the checked box
        if(value){//checked means value=>true, we will get category id
            all.push(id)//means we will push the checked category id in all array
        }else{
            all = all.filter((c)=>c !== id)//means whens uncheck the box then we get again id which equalt the check box but this time value will be false
        }
        setChecked(all)
    }
  return (
    <>
        <Jumbotron title="Hi Sir" subtitle="Welcome To KriBooks-App" />
        {/* <pre>{JSON.stringify({radio, checked}, null, 4)}</pre> */}
         <div className="container-fluid">
            <div className="row">
                <div className="col-md-3">
                <h2 className='p-3 mt-3 mb-2 h4 bg-light text-center'>Filter by categories</h2>
                <div className="row p-5">
                    {categories?.map((c)=>(
                        <Checkbox key={c._id} onChange={(e)=>handleCheck(e.target.checked, c._id)}>
                            {c.name}
                        </Checkbox>
                    ))}
                  </div>

                  <h2 className='p-3 mt-3 mb-2 h4 bg-light text-center'>Filter by price</h2>
                <div className="row p-5">
                   <Radio.Group onChange={(e)=>setRadio(e.target.value)}>
                    {prices.map((p)=>(
                        <div key={p._id} style={{marginLeft:"8px"}}>
                            <Radio value={p.array}>{p.name}</Radio>
                        </div> 
                    ))}
                   </Radio.Group>
                  </div>

                  <div className="p-5 pt-0">
                    <button className="btn btn-outline-secondary col-12"
                    onClick={() => window.location.reload()}>Reset</button>
                  </div>

                </div>
                <div className="col-md-9">
                 <h2 className='p-3 mt-3 mb-2 h4 bg-light text-center'>{products?.length} Products</h2>
                  <div className="row" style={{height:"100vh", overflow:"scroll"}}>
                    {products?.map((p)=>(
                        <div className="col-md-4" key={p._id}>
                            <ProductCard p={p}/>
                        </div>
                    ))}
                  </div>
                </div>
            </div>
         </div>
    </>
  )
}

export default Shop