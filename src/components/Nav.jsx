import React, { useContext } from "react";
import { ProductContext } from "../utils/Context";
import { Link } from "react-router-dom";

function Nav() {
  
  const [products]= useContext(ProductContext);
  // console.log(products);

  let distinct_category = products && products.reduce((acc,cv) => [...acc,cv.category], []);
  distinct_category = [...new Set(distinct_category)];
  // console.log(distinct_category);

  const color = () => {
    return `rgba(${(Math.random()*255).toFixed()},${(Math.random()*255).toFixed()},${(Math.random()*255).toFixed()},0.4)`;
  };
  // console.log(color());
  
    return (
        <nav className="w-[15%] h-full bg-zinc-100 flex flex-col items-center pt-5">
        <a className="py-2 px-5 border rounded-md border-2 border-sky-500" href="/create">Add new Product</a>
        <Link to="/" className="mt-5 w-[65%] py-2 px-5 h-10 border rounded-md border-2 border-sky-500 text-sky-500">Home</Link>
        <hr className="mt-3 w-full" />
        <h1 className="text-2xl mb-3 w-[80%]">Category Filter</h1>
        <div className=" w-[80%]">

          {distinct_category.map((c,i) => <Link key={i} to={`/?category=${c}`} className="flex items-center mb-3">
            <span style={{backgroundColor: color()}} className="rounded-full mr-2 w-[15px] h-[15px] bg-blue-200"></span>
            {c}</Link>)}
          
        </div>
      </nav>
    )

}

export default Nav;