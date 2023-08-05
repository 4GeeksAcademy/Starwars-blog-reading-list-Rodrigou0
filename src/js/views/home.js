import React, { useEffect, useState, useContext } from "react";
import rigoImage from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import Character from "../component/character";
import Planets from "../component/planets.jsx";
import Vehicles from "../component/vehicles.jsx";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Home = () => {

	const {store, actions} = useContext(Context);
	const [favoritesDropdownOpen, setFavoritesDropdownOpen] = useState(false);

	const [characters, setCharacters] = useState([]);
	const [planets, setPlanets] = useState ([]);
	const [vehicles, setVehicles] = useState ([]);
	const [favorites, setFavorites] = useState([]);
	

	useEffect(() => {
		getPeople();
		getPlanets();
		getVehicles();
	},[])

	const getPeople = () => {
		fetch('https://www.swapi.tech/api/people/', {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		})
		.then(resp => {
			return resp.json();
		})
		.then(data => {
			setCharacters(data.results)
		})
		.catch(error => {
			console.log(error);
		});
	}
	const getPlanets = () => {
		fetch('https://www.swapi.tech/api/planets/', {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		})
		.then(resp => {
			return resp.json();
		})
		.then(data => {
			setPlanets(data.results)
		})
		.catch(error => {
			console.log(error);
		});
	}
	const getVehicles = () => {
		fetch('https://www.swapi.tech/api/vehicles/', {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		})
		.then(resp => {
			return resp.json(); 
		})
		.then(data => {
			setVehicles(data.results)
		})
		.catch(error => {
			console.log(error);
		});
	}

	const showCharacters = () => {
		return characters.map((character, index) => {
			return <Character character={character} image={`https://starwars-visualguide.com/assets/img/characters/${index +1}.jpg`}
			key={character.uid}/>
		})
	}
	const showPlanets = () => {
		return planets.map((planet, index) => {
			const isFirstCard = index === 0;
			const image = isFirstCard ? `https://starwars-visualguide.com/assets/img/planets/${planets.length}.jpg` : `https://starwars-visualguide.com/assets/img/planets/${index + 1}.jpg`;
	
			return (
				<Planets
					planets={planet}
					image={image}
					key={planet.uid}
				/>
			);
		});
	};
	const showVehicles = () => {
		return vehicles.map((vehicles) => {
			return <Vehicles vehicles={vehicles} image={`https://wallpapercave.com/wp/wp6792288.jpg`}
			key={vehicles.uid}/>
		})
	}

	return (
		<div>
			<div className="ml-auto dropdown d-flex justify-content-end">
			<button
				className="btn dropdown-toggle fixed-top"
				type="button"
				id="favoritesDropdown"
				onClick={() => setFavoritesDropdownOpen(!favoritesDropdownOpen)}
				aria-expanded={favoritesDropdownOpen ? "true" : "false"}
			>
				Favorites ({store.favorites.length})
			</button>
				<ul className={`dropdown-menu fixed-top ${favoritesDropdownOpen ? "show" : ""}`} aria-labelledby="favoritesDropdown">
					{store.favorites.length === 0 ? (
					<li>
						Empty
					</li>
					) : (
					store.favorites.map((favorite, index) => (
						<li className="d-flex align-items-center justify-content-between" key={index}>
								{favorite}
							<button
								className="btnDel btn-danger"
								onClick={(e) => {
									e.stopPropagation(); 
									actions.deleteFav(favorite);
								}}
							>
								<i className="fa solid fa-trash"></i>
							</button>
						</li>
					))
					)}
				</ul>
			</div>
			<div className="shine"></div>
			<div className="starwars-demo">
					<img src="//cssanimation.rocks/demo/starwars/images/star.svg" alt="Star" class="star"/>
					<img src="//cssanimation.rocks/demo/starwars/images/wars.svg" alt="Wars" class="wars"/>
			</div>
			<div className="py-2" style={{ marginTop:"500px", overflowX: 'auto', overflowY: 'hidden', paddingLeft: 10, paddingRight: 10}}>
				<h2 className="font-weight-light"  style={{color:"yellow"}}>Characters</h2>
				<div className="d-flex flex-row flex-nowrap" style={{width:"2800px"}}>
					{characters.length !== 0 ? showCharacters() : (
						<div className="spinner-border" role="status">
							<span className="visually-hidden">Loading...</span>
						</div>
					)}  
				</div>
			</div>
			<div className="py-2" style={{ marginTop:"50px", overflowX: 'auto', overflowY: 'hidden', paddingLeft: 10, paddingRight: 10}}>
				<h2 className="font-weight-light"  style={{color:"yellow"}}>Planets</h2>
				<div className="d-flex flex-row flex-nowrap" style={{width:"2800px"}}>
					{planets.length !== 0 ? showPlanets() : (
						<div className="spinner-border" role="status">
							<span className="visually-hidden">Loading...</span>
						</div>
					)}  
				</div>
			</div>
			<div className="py-2" style={{ marginTop:"50px", overflowX: 'auto', overflowY: 'hidden', paddingLeft: 10, paddingRight: 10}}>
				<h2 className="font-weight-light"  style={{color:"yellow"}}>Vehicles</h2>
				<div className="d-flex flex-row flex-nowrap" style={{width:"2800px"}}>
					{vehicles.length !== 0 ? showVehicles() : (
						<div className="spinner-border" role="status">
							<span className="visually-hidden">Loading...</span>
						</div>
					)}  
				</div>
			</div>
		</div>
	)
};

export default Home