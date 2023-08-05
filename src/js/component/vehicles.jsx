import React,{useEffect,useState, useContext} from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

const Vehicles =(props)=>{

    const [vehicles,setVehicles] = useState()

    const {store, actions} = useContext(Context);


    const getVehicles = () => {
      fetch("https://www.swapi.tech/api/vehicles/" + props.vehicles.uid, {
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
    };

    useEffect(() =>{
      getVehicles()
  },[])
  

    return(
        <div className="mycard card card-body card-container">
        <div className=" mycard">
                    <img src={props.image} className="card-img-top" alt="..." style={{ borderRadius: 5 }}></img>
            <h5 className="card-title mt-3 mb-4">{props.vehicles.name}</h5>
            {vehicles ? (
                <p className="card-text">
                    <p className='mt-0 mb-0'>passengers: {vehicles && vehicles.passengers}</p>
                    <p className='mt-0 mb-0'>model: {vehicles && vehicles.model}</p> 
                </p>
            ) : (
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            )}
                <div className="row">
                    <div className="col-6">
                      <Link to={`/learnmorevehicles/${props.vehicles.uid}`}>
                          <button type="button" className="btn btnL">Learn More!</button>
                        </Link>
                    </div>
                    <div className="col-6 mt-2 ms-1" style={{width:"30px"}}>
                        <button className="btn" onClick={()=> actions.addtoFavorites(props.vehicles.name)}>
                            <i className="fa fa-heart" ></i>
                        </button>
                    </div>
                </div>
        </div>
    </div>
    )
}

export default Vehicles