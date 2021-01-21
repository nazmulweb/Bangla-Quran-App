import React from 'react';
import {Link} from "react-router-dom";
import './Welcome.css';

const Welcome =() => {

    const {number} = JSON.parse(localStorage.getItem("surah"))

    return (
        <div className="welcome">
            <Link to={`/surah/${number}`}>Recent read</Link>
        </div>
    )
}

export default Welcome
