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

    // get recent read surah data 
    const {number, englishName} = JSON.parse(localStorage.getItem("surah"));

    useEffect(()=>{
        axios
        .get(`${baseUrl}v1/ayah/6107/editions/${language}`)
        .then(res=>{
            console.log(res.data.data[0].text)
            setAyah(res.data.data[0].text)
            setLoading(false)
        })
        .catch(err =>{
            console.log("error:", err)
        })
    }, [language])

    if(loading) return <div><Loading /></div>

    return (
        <div className="welcome">
            <div className="welcome__wrapper">
                <h4 className="welcome__ayah">{ayah}</h4>
            </div>
            <Link to={`/surah/${number}`} className="welcome__recentRead"><HistoryIcon />Recent Read: {englishName.toLowerCase()}</Link>
        </div>
    )
}

export default Welcome
