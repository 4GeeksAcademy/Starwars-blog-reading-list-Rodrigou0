import React,{useState, useEffect} from "react";
import { Link, useParams } from "react-router-dom";
import Character from "./character";

const LearnMore =()=>{

    const [character,setCharacter] = useState()
    const params = useParams();

    useEffect(() =>{
        getCharacter()
    },[])

   const getCharacter = () => {
        fetch('https://www.swapi.tech/api/people/' + params.uid, {
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
    <div className=" d-flex justify-content-center">
        <div className="cardlearnmore">
            <div className="card-body-lm">
                <div className="row">
                    <div className="col-6">
                        <img src={`https://starwars-visualguide.com/assets/img/characters/${parseInt(params.uid)}.jpg`}/>
                    </div>
                    <div className="col-6 ptag">
                        <p className=''><strong>Name:</strong> {character && character.name}</p>
                        <p className=''><strong>Gender:</strong> {character && character.gender}</p>
                        <p className=''><strong>Hair Color:</strong> {character && character.hair_color}</p> 
                        <p className=''><strong>Eye Color:</strong> {character && character.eye_color}</p>
                    </div>
                </div>
                <h5 className="card-title mt-4">{character && character.name}</h5>
                <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed bibendum vehicula vehicula.
                    Praesent in commodo ligula. Curabitur eget suscipit nunc. In sit amet sollicitudin urna. Sed et ante vel tellus gravida lacinia. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Quisque nibh sapien, condimentum in finibus et, tristique nec odio. Donec eget lacus vel mauris feugiat ornare. Aenean condimentum varius semper.
                    Nullam vel tempus mauris. Vivamus aliquet est at magna fringilla, eu posuere mauris venenatis. Vestibulum lectus ex, ullamcorper vel imperdiet ac, imperdiet in felis.</p>
                    <Link to="/" className="btn btn-primary">Go back</Link>
            </div>
        </div>
    </div>
    )
}

export default LearnMore