import React, { useEffect, useState } from "react";
import rigoImage from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import Character from "../component/character";
import Planets from "../component/planets.jsx";
import Vehicles from "../component/vehicles.jsx";
import { Link } from "react-router-dom";

export const Home = () => {

	const [characters, setCharacters] = useState([]);
	const [planets, setPlanets] = useState ([]);
	const [vehicles, setVehicles] = useState ([]);
	const [favorites, setFavorites] = useState([]);
	

	useEffect(() => {
		getPeople();
		getPlanets();
		getVehicles();
	},[])

	const addToFavorites = (item) => {
		const isFavorite = favorites.some((favorite) => favorite.uid === item.uid);
		if (!isFavorite) {
		  setFavorites((prevFavorites) => [...prevFavorites, item]);
		}
	  };

	const removeFromFavorites = (item) => {
		event.stopPropagation();
		setFavorites((prevFavorites) => prevFavorites.filter((fav) => fav.uid !== item.uid));
	  };
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
			key={character.uid}
			addToFavorites={addToFavorites}
			favorites={favorites}/>
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
					addToFavorites={addToFavorites}
					favorites={favorites}
				/>
			);
		});
	};
	const showVehicles = () => {
		return vehicles.map((vehicles) => {
			return <Vehicles vehicles={vehicles} image={`https://wallpapercave.com/wp/wp6792288.jpg`}
			key={vehicles.uid}
			addToFavorites={addToFavorites}
			favorites={favorites}/>
		})
	}

	return (
		<div>
			<div className="ml-auto dropdown d-flex justify-content-end">
				<button
					className="btn dropdown-toggle fixed-top"
					type="button"
					id="favoritesDropdown"
					data-bs-toggle="dropdown"
					aria-expanded="false"
					>
					Favorites ({favorites.length})
				</button>
				<ul className="dropdown-menu" aria-labelledby="favoritesDropdown">
					{favorites.length === 0 ? (
					<li>
						<Link className="dropdown-item" to="#">
						Empty
						</Link>
					</li>
					) : (
					favorites.map((favorite, index) => (
						<li className="d-flex align-items-center justify-content-between" key={index}>
							<Link className="dropdown-item" to="#">
								{favorite.name}
							</Link>
							<button
								className="btnDel btn-danger"
								onClick={() => removeFromFavorites(favorite)}>
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