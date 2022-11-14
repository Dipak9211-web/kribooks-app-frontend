import { useState, createContext, useContext, useEffect } from "react";

const CartContext = createContext();

const CartProvider = ({children}) =>{//those component which is use this context they all consider as a children(rap component)
    const [cart, setCart] = useState([]);
    useEffect(()=>{
        let existingCart = localStorage.getItem("cart");
        if(existingCart) setCart(JSON.parse(existingCart))
    },[])
    return (
        <CartContext.Provider value={[cart, setCart]}>
                {children}
        </CartContext.Provider>
    )
}
const useCart = ()=>useContext(CartContext);
//now in our component we can easily access=> const [cart, setCart] = useCart()
export {useCart, CartProvider};

//here we are using useState but we are also uses useContext that means this file(Cart.js) will accessible globalaly