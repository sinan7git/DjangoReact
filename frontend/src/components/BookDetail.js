import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./BookDetail.css";

function BookDetail({ match }) {

	const navigate = useNavigate();
  const [detail, setDetail] = useState({
    name: "",
  });
  const { id } = useParams();

  const getSingleBook = async () => {
    const { data } = await axios.get(
      `http://localhost:8000/api/v1/products/view/${id}`
    );
    console.log(data);
    setDetail(data.data);
  };

  useEffect(() => {
    getSingleBook();
  }, []);

  return (
		<>
		  <section className="cont">
			<div class="wrapper">
			  <div class="main_card">
				<div class="card_left">
				  <div class="card_datails">
					<h1>{detail.name}</h1>
					<div class="card_cat">
					  <p class="genre">{detail.product}</p>
					  <p class="time">2h 28m</p>
					</div>
					<p class="disc">{detail.description}</p>
					<div class="social-btn">
					  <button
						onClick={() => {
						  axios
							.post(
							  "http://localhost:8000/api/v1/products/add_favorites/" +
								detail.id,+ "/",
							  {}
							)
							.then((response) => {
							  navigate("/");
							})
							.catch((error) => {
							  if (error.response.status === 401) {
								// handle unauthorized access
							  }
							});
						}}
					  >
						<i class="fas fa-play"></i> Add To Favorite
					  </button>
	  
					  <button>
						<i class="fas fa-download"></i> DOWNLOAD
					  </button>
					</div>
				  </div>
				</div>
				<div class="card_right">
				  <div class="img_container">
					<img src={detail.image} alt="" />
				  </div>
				  <div class="play_btn"></div>
				</div>
			  </div>
			</div>
		  </section>
		</>
	  );
	  
}

export default BookDetail;
