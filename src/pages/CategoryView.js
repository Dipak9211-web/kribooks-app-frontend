import {useState, useEffect} from 'react';
import ProductCard from '../components/cards/ProductCard';
import axios from 'axios';
import {useParams} from 'react-router-dom'
import Jumbotron from '../components/cards/Jumbotron';

function CategoryView() {
    //state
    const [products, setProducts] = useState([])
    const [category, setCategory] = useState([])
    //hooks
   // const navigate = useNavigate();
    const params = useParams();
    useEffect(()=>{
     if(params?.slug) loadProductsByCategory();
    },[params?.slug]);
     const loadProductsByCategory = async()=>{
        try {
            const {data} = await axios.get(`/products-by-category/${params.slug}`)  
            setProducts(data.products);
            setCategory(data.category);
        } catch (error) {
            console.log(error);
        }
     }
  return (
    <>
       
        <Jumbotron title={category[0]?.name} subtitle={`${products?.length} product found in ${category[0]?.name}`}/>
           <div className="container-fluid">
            <div className="row mt-3">
                {products?.map(p =>(
                    <div key={p._id} className="col-md-4">
                    <ProductCard p={p}/>
                    </div>
                ))}
            </div>
           </div>
    </>
  )
}

export default CategoryView