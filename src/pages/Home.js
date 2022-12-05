import { useEffect, useState } from 'react'
import axios from 'axios'
import Jumbotron from '../components/cards/Jumbotron'
import toast from 'react-hot-toast';
import ProductCard from '../components/cards/ProductCard';

function Home() {
  //state
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)

  useEffect(()=>{
    loadProducts();
    getToatal();
  },[]);
  useEffect(()=>{
    if(page===1) return;
    loadMore();
  }, [page])
  const getToatal = async()=>{
    try {
      const {data} = await axios.get("/products-count");
        setTotal(data);
    } catch (error) {
      console.log(error)
    }
  }
  const loadProducts = async()=>{
    try {
        const {data} = await axios.get(`/list-products/${page}`)
        setProducts(data) 
    } catch (error) {
      console.log(error)
      toast.error("product request failed")
    }
  };

  const loadMore = async()=>{
    try {
       setLoading(true)
        const {data} = await axios.get(`/list-products/${page}`)
        setProducts([...products, ...data])
        setLoading(false) 
    } catch (error) {
      console.log(error)
       setLoading(false)
    }
  }
  //apply sort
  const arr = [...products];
  const sortedBySold = arr?.sort((a, b)=>(a.sold < b.sold? 1: -1 ))
  return (
<>
    <Jumbotron title="Hi Sir" subtitle="Welcome To KriBooks-App"/>
      <div className="container">
      <div className='row'>
        <div className="col-md-6">
        <h2 className='p-3 mt-2 mb-2 h4 bg-light text-center'>New Arrivals</h2>
    <div className="row">
    {products?.map((p)=>(
         <div className="col-sm-6" key={p._id}>
         <ProductCard  p={p}/>
         </div>
    ))}
        </div>
        </div>
        <div className="col-md-6">
        <h2 className='p-3 mt-2 mb-2 h4 bg-light text-center'>Best Sellers</h2>
        <div className="row">
        {sortedBySold?.map((p)=>(
         <div className="col-sm-6" key={p._id}>
         <ProductCard  p={p}/>
         </div>
    ))}
        </div>
        </div>
      </div> 
      <div className="container text-center p-4">
          {products && products.length < total && (
            <button className='btn btn-warning col-md-6'
            disabled = {loading}
            onClick={e=>{e.preventDefault();
             setPage(page +1);
            }}
            >
            {loading ? 'Loading...': 'Load More'}</button>
          ) }
          </div>  
          </div> 
</>
  )
}

export default Home