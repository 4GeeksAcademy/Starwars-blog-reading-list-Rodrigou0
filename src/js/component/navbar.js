import React,{useState} from "react";
import { Link } from "react-router-dom";


export const Navbar = () => {
	const [favorites, setFavorites] = useState([]);
	const addToFavorites = (item) => {
		setFavorites((prevFavorites) => [...prevFavorites, item]); 
	  };
	return (
			<nav className="navbar mb-3 ps-5 pe-5">
				<div className="icons">
					<a href="https://www.facebook.com/StarWars/" target="_blank" rel="noopener noreferrer">
						<i className="fab fa-facebook me-4" style={{ color: "yellow" }}></i>
					</a>
					<a href="https://www.instagram.com/starwars/" target="_blank" rel="noopener noreferrer">
						<i className="fab fa-instagram me-4" style={{ color: "yellow" }}></i>
					</a>
					<a href="https://www.twitter.com/starwars/" target="_blank" rel="noopener noreferrer">
						<i className="fab fa-twitter" style={{ color: "yellow" }}></i>
					</a>
				</div>
			</nav>
	);
};