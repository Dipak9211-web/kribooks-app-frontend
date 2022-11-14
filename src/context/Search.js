import { useState, createContext, useContext } from "react";

const SearchContext = createContext();

const SearchProvider = ({children}) =>{//those component which is use this context they all consider as a children(rap component)
    const [values, setValues] = useState({
        keyword:"",
        results:[],
    });
    
    return (
        <SearchContext.Provider value={[values, setValues]}>
                {children}
        </SearchContext.Provider>
    )
}
const useSearch = ()=>useContext(SearchContext);
//now in our component we can easily access=> const [auth, setAuth] = useAuth()
export {useSearch, SearchProvider};