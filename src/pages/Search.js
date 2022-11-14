import ProductCard from '../components/cards/ProductCard'
import Jumbotron from '../components/cards/Jumbotron'
import { useSearch } from '../context/Search';

function Search() {
    const [values] = useSearch()
  return (
  <>
    <Jumbotron title="Search Result" subtitle={values?.results?.length<1? "No Products found": `Found ${values?.results?.length} products`}/>
<div className="container mt-3">
    <div className="row">
        {values?.results?.map((p)=>(
            <div key={p._id} className="col-md-4">
                <ProductCard p={p}/>
            </div>
        ))}
    </div>
</div>
</>
  )
}

export default Search