import {useState, useEffect} from 'react';
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import axios from 'axios';
import './Surah.css'

const Surah = () => {
    // get parameter id 
    let { id } = useParams();

    const [surah, setSurah] = useState([]);

    useEffect(()=>{
        axios
        .get(`http://api.alquran.cloud/v1/surah/${id}/bn.bengali`)
        .then(res=>{
            setSurah(res.data.data)
        })
        .catch(err =>{
            console.log("error:", err)
        })
    }, [id])

    console.log()

    // if(surah.length < 0) return <div>loading....</div>

    return (
        <div className="surah">
            <Helmet>
                <title>{surah !== undefined && surah.englishName}</title>
            </Helmet>
            <div className="surah__container">
                <div className="surah__header">
                    <div className="surah__name">
                       Name: {surah.englishName}
                    </div>
                    <div className="surah__numberOfAyat">
                       Ayahs: {surah.numberOfAyahs}
                    </div>
                </div>
                <div className="surah__body">
                    <div>
                        { surah.ayahs !== undefined &&
                            surah.ayahs.map(ayah =>{
                                return (
                                    <div className="surah__ayah"  key={ayah.number} >
                                        <div className="surah__ayahNumber"> {ayah.number}. </div>
                                        <div className="surah__ayahText"> {ayah.text} </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Surah

// const Ayat = () => {
//     return (
//         <div className="surah">
//             <div className="surah__container">
//                 ayat
//             </div>
//         </div>
//     )
// }