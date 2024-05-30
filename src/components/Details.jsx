import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';
import { ProductContext } from "../utils/Context";
import axios from '../utils/axios.jsx';
import Loading from "./Loading.jsx";

function Details() {
    const {id}=useParams();
    // console.log(id);
    const [product, setProduct] = useState(null);

   const getsingleproduct = async () => {
    try{
        const {data}= await axios.get(`/products/${id}`);
        // console.log(data);
        setProduct(data);
    } catch (error) {
        console.log(error);
    }
   }

   useEffect(() => {
    getsingleproduct();
   },[])
    
    return product ? (
        <div className='w-[80%] flex h-full  m-auto p-[10%] justify-between items-center '>
            <img className='object-contain h-[90%] w-[60%] ' src={product.image} alt='Kutch bhi' />
            <div className='content rounded-lg px-5'>
                <h1 className='text-4xl font-bold underline underline-offset-1'> {product.title} </h1>
                <h2 className="text-xl mt-3 opacity-50"> {product.category} </h2>
                <h2 className='text-red-600 mt-3 text-xl'> {product.price} </h2>
                <p className='mt-3 mb-[5%]'> {product.description} </p>
                <Link className='mr-10 py-2 px-5 border rounded-md border-2 border-sky-500 text-sky-500'>Edit</Link>
                <Link className='mr-10 py-2 px-5 border rounded-md border-2 border-red-500 text-red-500'>Delete</Link>
                
            </div>
        </div>
    ) :  (
        <Loading />
    );
}

export default Details;