import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';
import './ShowBook.css';
import Header from './includes/Header';



function ShowBooks() {
    const [books, setBooks] = useState([]);
    


    useEffect(() =>{
        axios.get('http://localhost:8000/api/v1/products/').then((response => {
            setBooks(response.data.data);
        })).catch(error => {
            console.log(error)
        });
    }, []);

   

const renderBooks = () => {
    return books.map((book) => (
        <div className="column is-one-quarter">
			<Link to={`/book/${book.id}`}><img style={{marginTop:'15px'}} src={book.image} alt=''/></Link>
		</div>
    ));
}

  return (
    
    <>
    <Header/>
    <div className="all">
    <div className="top">
</div>
<div className="container">
	<div className="columns is-multiline p-0 pt-6 last">
		<div className="column is-full">
			<p style={{marginTop:'-40px',marginBottom: '0rem'}} className="has-text-white"> Books Collection</p>
		</div>
			{ renderBooks() }
		
	</div>
</div>
</div>
</>
  );
}

export default ShowBooks;