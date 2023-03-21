import styled from "styled-components";
import { popularProducts } from "../data";
import Product from "./Product";
import axios from 'axios';
import { useState,useEffect } from "react";
import { CollectionsOutlined } from "@material-ui/icons";
const Container = styled.div`
padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const Products = ({category, filters,sort}) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(()=>{
    const getProducts = async ()=>{
      try{
        const res = await axios.get( category? `http://localhost:5000/api/products?category=${category}`:"http://localhost:5000/api/products");
        setProducts(res.data);
      }catch(err){
        console.log(err);
      }
    }
    getProducts();
  },[]);
  useEffect(()=>{
    console.log("GG",products)
    category && setFilteredProducts(
      products.filter(item=>  {
        Object.entries(filters).every(([key,value])=>{
          item[key].includes(value)
        }
        )}
      )
    );
    console.log(products,filteredProducts)
  },[products,category,filters]);


  console.log(category, filters,sort)
  return (
    <Container>
      {products.map((item) => (
        <Product item={item} key={item._id} />
      ))}
    </Container>
  );
};

export default Products;
