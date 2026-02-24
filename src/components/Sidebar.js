import React from 'react';
import './Sidebar.css';
import { Link, NavLink  } from 'react-router-dom'
import { translations } from '../utils/translations';
import { surahNamesBn } from '../utils/surahNamesBn';
import { toLocaleNumber } from '../utils/numberConverter';

const Sidebar = (props) => {

    if(props.length < 0) return <div>loading....</div>
    
    const t = translations[props.language] || translations["en.asad"];

    return (
        <div className="sidebar">
            <div className="sidebar__container">
                <div className="sidebar__logo">
                    <Link to={`/`}>{t.quranApp}</Link>
                </div>
                <div className="sidebar__content">
                    <ul className="sidebar__list">
                        {props.surahs.map(surah =>{
                            const surahDisplayName = props.language === "bn.bengali"
                              ? (surahNamesBn[surah.number] || surah.name)
                              : surah.englishName;
                            return(
                                <li onClick={props.onclick} key={surah.number} className="sidebar__item">
                                    <NavLink to={`/surah/${surah.number}`} className="sidebar__link">{toLocaleNumber(surah.number, props.language)}. {surahDisplayName}</NavLink>
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
