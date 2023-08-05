import React,{useEffect, useState, useContext} from "react";
import { Link, BrowserRouter as Router } from "react-router-dom";
import LearnMore from "./learnmore.jsx";
import { Context } from "../store/appContext";

const Character = (props) =>{

    const {store, actions} = useContext(Context);

    console.log('character', props.character);

    const [character,setCharacter] = useState()

    useEffect(() =>{
        getCharacter()
    },[])

    const getCharacter = () => {
        fetch('https://www.swapi.tech/api/people/' + props.character.uid, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(resp => {
            return resp.json();
        })
        .then(data => {
            console.log(data);
            setCharacter(data.result.properties);
        })
        .catch(error => {
            console.log(error);
        });
    }
    return(
        <div className="mycard card card-body card-container">
            <div className=" mycard">
                        <img src={props.image} className="card-img-top" alt="..." style={{ borderRadius: 5 }}></img>
                <h5 className="card-title mt-3 mb-4">{props.character.name}</h5>
                {character ? (
                    <p className="card-text">
                        <p className='mt-0 mb-0'>Gender: {character.gender}</p>
                        <p className='mt-0 mb-0'>Hair Color: {character.hair_color}</p> 
                        <p className='mt-0 mb-0'>Eye Color: {character.eye_color}</p>
                    </p>
                ) : (
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                )}
                    <div className="row">
                        <div className="col-6">
                        <Link to={`/learnmore/${props.character.uid}`}>
                            <button type="button" className="btn btnL">
                                Learn More!
                            </button>
                        </Link>

                        </div>
                        <div className="col-6 mt-2 ms-1" style={{width:"20px"}}>
                            <button className="btn" onClick={()=> actions.addtoFavorites(props.character.name)}>
                                <i className="fa fa-heart"></i>
                            </button>
                        </div>
                    </div>
            </div>
        </div>
    )
    
}

export default Character