import React, { useContext, useEffect, useState } from "react";
import Nav from "./Nav";
import { Link, useLocation } from "react-router-dom";
import { ProductContext } from "../utils/Context";
import Loading from "./Loading.jsx";
import axios from '../utils/axios.jsx';

function Home() {
    
   const [products]= useContext(ProductContext);
   //console.log(products);
   const {search} = useLocation();
   //console.log(search);
   const category = decodeURIComponent(search.split("=")[1]);
   //console.log(category);

   const [filteredProducts,setfilteredProducts] = useState(null);

   const getproductscategory = async () => {
    try {
        const {data} = await axios.get(`/products/category/${category}`);
        setfilteredProducts(data);
    } catch(error) {
        console.log(error);
    }
   };

   useEffect(() => {
    if(!filteredProducts || category=='undefined') setfilteredProducts(products);
    if(category != "undefined") getproductscategory();
   },[category,products]);

    return products ? ( 
        <>
        <Nav />
        <div className=" h-full w-[85%] p-10 pt-[5%] flex flex-wrap overflow-x-hidden overflow-y-auto">
            {filteredProducts && filteredProducts.map( (p,i) => {
                return (
                    <Link key={i} to={`/details/${p.id}`} className="mr-3 mb-3 card p-3 border shadow rounded-md w-[18%] h-[30vh] flex-col flex justify-center items-center">
                    <div className="hover:scale-110 w-full h-[80%] bg-contain bg-no-repeat bg-center" style={{backgroundImage: `url(${p.image})`}}> </div>
                    <h1  className="text-center hover:text-blue-400">{p.title}</h1>
                    </Link>
                )
            })}


        </div></>         
    ) :  (
        <Loading />
    );
}

export default Home;