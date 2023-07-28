import React,{useState, useEffect} from "react";
import { Link, useParams } from "react-router-dom";


const LearnMoreVehicles =()=>{

    const [vehicles,setVehicles] = useState({})
    const params = useParams();

    useEffect(() =>{
        getVehicles()
    },[])

   const getVehicles = () => {
        fetch('https://www.swapi.tech/api/vehicles/' + params.uid, {
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
            setVehicles(data.result.properties);
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
                        <img src={`https://wallpapercave.com/wp/wp6792288.jpg`}/>
                    </div>
                    <div className="col-6 ptag">
                        <p className=''><strong>Name:</strong> {vehicles && vehicles.name}</p>
                        <p className=''><strong> passengers:</strong>{vehicles.passengers}</p>
                        <p className=''><strong>model:</strong>{vehicles.model}</p> 
                    </div>
                </div>
                <h5 className="card-title">{vehicles && vehicles.name}</h5>
                <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed bibendum vehicula vehicula.
                    Praesent in commodo ligula. Curabitur eget suscipit nunc. In sit amet sollicitudin urna. Sed et ante vel tellus gravida lacinia. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Quisque nibh sapien, condimentum in finibus et, tristique nec odio. Donec eget lacus vel mauris feugiat ornare. Aenean condimentum varius semper.
                    Nullam vel tempus mauris. Vivamus aliquet est at magna fringilla, eu posuere mauris venenatis. Vestibulum lectus ex, ullamcorper vel imperdiet ac, imperdiet in felis.</p>
                    <Link to="/" className="btn btn-primary">Go back</Link>
            </div>
        </div>
    </div>
    )
}

export default LearnMoreVehicles