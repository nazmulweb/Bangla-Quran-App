import React from 'react';
import './Sidebar.css';
import { Link, NavLink  } from 'react-router-dom'

const Sidebar = (props) => {

    if(props.length < 0) return <div>loading....</div>

    return (
        <div className="sidebar">
            <div className="sidebar__container">
                <div className="sidebar__logo">
                    <Link to={`/1`}>Quran App</Link>
                </div>
                <div className="sidebar__content">
                    <ul className="sidebar__list">
                        {props.surahs.map(surah =>{
                            return(
                                <li key={surah.number} className="sidebar__item">
                                    <NavLink to={`/surah/${surah.number}`} className="sidebar__link">{surah.number}. {surah.englishName}</NavLink>
                                </li>
                            )
                        })}

                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
