import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Home } from "./views/home";
import  LearnMore  from "./component/learnmore.jsx";
import LearnMorePlanets from "./views/learnmoreplanets.jsx";
import LearnMoreVehicles from "./views/learnmorevehicles.jsx";
import { Demo } from "./views/demo";
import { Single } from "./views/single";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";

//create your first component
const Layout = () => {
	//the basename is used when your project is published in a subdirectory and not in the root of the domain
	// you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
	const basename = process.env.BASENAME || "";

	return (
		<div>
			<BrowserRouter basename={basename}>
				<ScrollToTop>
					<Navbar/>
					<Routes>  		
						<Route path="/" element={<Home />} />
						<Route path="/demo" element={<Demo />} />
						<Route exact path="/learnmore/:uid" element={<LearnMore />} />
						<Route exact path="/learnmoreplanets/:uid" element={<LearnMorePlanets />} />
						<Route exact path="/learnmorevehicles/:uid" element={<LearnMoreVehicles />} />												
						<Route path="/single/:uid" element= {<Single />} />
						<Route path="*" element={<h1 style={{color:"yellow"}}>Sorry the page you are trying to reach was not found!</h1>} />
					</Routes>
					<Footer />
				</ScrollToTop>
			</BrowserRouter>
		</div>
	);
};

export default injectContext(Layout);
