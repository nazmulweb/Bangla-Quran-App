import {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import './Welcome.css';
import HistoryIcon from '@material-ui/icons/History';
import axios from 'axios';
import Loading from './Loading';

const baseUrl = process.env.REACT_APP_QURAN_BASE_URL

const Welcome = ({language}) => {
    const [ayah, setAyah] = useState('');
    const [loading, setLoading ] = useState(true);
    const [resetnSurah, setResentSurah] = useState(null);
    // const [favorite, setFavorite] = useState();

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
            var {number, englishName} = JSON.parse(localStorage.getItem("surah"));
            setResentSurah({
                number,
                englishName  
            })
        }
    },[])

    if(loading) return <div><Loading /></div>

    return (
        <div className="welcome">
            <div className="welcome__wrapper">
                <h4 className="welcome__ayah">{ayah}</h4>
            </div>
            {
             resetnSurah ? <Link to={`/surah/${resetnSurah.number}`} className="welcome__recentRead"><HistoryIcon />Recent Read: {resetnSurah.englishName.toLowerCase()}</Link> : "" 
            }
        </div>
    )
}

export default Welcome
