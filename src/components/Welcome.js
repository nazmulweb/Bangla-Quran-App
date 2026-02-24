import {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import './Welcome.css';
import HistoryIcon from '@material-ui/icons/History';
import axios from 'axios';
import Loading from './Loading';
import { translations } from '../utils/translations';
import { surahNamesBn } from '../utils/surahNamesBn';

const baseUrl = process.env.REACT_APP_QURAN_BASE_URL

const Welcome = ({language}) => {
    const [ayah, setAyah] = useState('');
    const [loading, setLoading ] = useState(true);
    const [resetnSurah, setResentSurah] = useState(null);
    // const [favorite, setFavorite] = useState();
    
    const t = translations[language] || translations["en.asad"];
    const recentSurahDisplayName = resetnSurah
      ? (
          language === "bn.bengali"
            ? (surahNamesBn[Number(resetnSurah.number)] || resetnSurah.name || resetnSurah.englishName)
            : resetnSurah.englishName
        )
      : "";

    useEffect(()=>{
        axios
        .get(`${baseUrl}v1/ayah/6107/editions/${language}`)
        .then(res=>{
            setAyah(res.data.data[0].text)
            setLoading(false)
        })
        .catch(err =>{
            console.log("error:", err)
        })
    }, [language])

    useEffect(()=> {
        // get recent read surah data 
        if(JSON.parse(localStorage.getItem("surah"))){
            var {number, englishName, name} = JSON.parse(localStorage.getItem("surah"));
            setResentSurah({
                number,
                englishName,
                name 
            })
        }
    },[])

    if(loading) return <div><Loading /></div>

    return (
        <div className="welcome">
            <div className="welcome__content">
                <div className="welcome__wrapper">
                    <h4 className="welcome__ayah">{ayah}</h4>
                </div>
                {
                 resetnSurah ? (
                    <Link to={`/surah/${resetnSurah.number}`} className="welcome__recentRead">
                        <HistoryIcon className="welcome__recentIcon" />
                        <span className="welcome__recentText">
                            {t.recentRead}: <span className="welcome__recentName">{recentSurahDisplayName}</span>
                        </span>
                    </Link>
                 ) : null 
                }
            </div>
        </div>
    )
}

export default Welcome
