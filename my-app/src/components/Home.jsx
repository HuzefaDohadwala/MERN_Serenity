import React from 'react';
import Home1 from './Home1';
import Home2 from './Home2';
import Home3 from './Home3';
import Home4 from './Home4';
import Footer from './Footer';
import './Home.css'; 

function Home() {
    return (
        <>
        <div className="scroll-container_5">
        <div className="scroll-area_5"><Home1/></div>
        <div className="scroll-area_5"><Home2/></div>
        <div className="scroll-area_5"><Home3/></div>
        <div className="scroll-area_5"><Home4/></div>
        <div className="scroll-area_5"><Footer/></div>
        </div>
    </>
    );
}

export default Home;
