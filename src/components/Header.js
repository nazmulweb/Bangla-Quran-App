import React from 'react';
import './Header.css'

const Header = ({onclick, language}) =>  {
    return (
        <div className="header">
            <div className="header__container">
                <div className="header__search"></div>
                <div className="header__langauge">
                    <button onClick={()=> onclick()}>{ language === "bn.bengali" ? "English" : "Bengali" } </button>
                </div>
            </div>
        </div>
    )
}

export default Header
