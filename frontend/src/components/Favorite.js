import React,{useState, useEffect} from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import './ShowBook.css';
export default function Favorite() {

    const [Book,SetBook] = useState([]);

    let BookApi = 'http://localhost:8000/api/v1/products/favorites/';

    useEffect(() => {
        axios
        .get(BookApi)
        .then((res) => {
            console.log(res.data);
            SetBook(res.data.data)
        })
        .catch((err) => {
            console.log(err)
        })
    },[])
        
    return (
      <div className="all">
      <div className="top">
    <div className="columns">
    </div>
  </div>
  <div className="container">
    <div className="columns is-multiline p-0 pt-6 last">
  {Book.map((item)=>(
   <div className="column is-one-quarter">
   <Link to={`/book/${item.id}`}><img style={{marginTop:'15px'}} src={item.image} alt=''/></Link>
  </div>
))}
      
  </div>
  </div>
  </div>
    )
}


