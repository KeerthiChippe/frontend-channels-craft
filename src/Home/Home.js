import React from "react";
import Example from "./Homecaurosal";
import Footer from "./navbar/footer";
import HomeCards from "./cards/homecard";
import HD from "./HD";
import Image from "../multer";
//import HomeCard from "./cards/homecard";
//import Header from "./navbar/header";
//import Footer from "./navbar/footer";

export default function Home() {
    return (
        <div>
            <br/>
            <Example />
            <br />
            <br />
            <h2 className="text-center" style={{ color: '#001f3f' }}>Trending packages</h2>
            <br/>
            <HomeCards/><br/>
            <HD />
            <br/>
            
            <br/>
            <Footer/>
        </div>
    )
}