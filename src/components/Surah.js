import {useState, useEffect} from 'react';
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import axios from 'axios';
import _ from 'lodash';
import './Surah.css'



const Surah = () => {
    // get parameter id 
    let { id } = useParams();

    const [surahName, setSurahName] = useState([]);
    
    const [testNewSurah, setTestNewSurah] = useState([]);

    const fetchData = (id) =>{

        const arTranslateSurah = axios.get(`http://api.alquran.cloud/v1/surah/${id}`);
        const bnTranslateSurah = axios.get(`http://api.alquran.cloud/v1/surah/${id}/bn.bengali`);

        axios.all([arTranslateSurah, bnTranslateSurah])
            .then(
                axios.spread((...datas)=> {
                    let arSurah = datas[0].data.data.ayahs;
                    let bnSurah = datas[1].data.data.ayahs;

                    const suraArr = [[...arSurah], [...bnSurah]]

                    setTestNewSurah(suraArr)
                })
            )
    }


    useEffect(()=>{
        // get surah 
        fetchData(id)

        // get surah name 
        axios
        .get(`http://api.alquran.cloud/v1/surah/${id}/bn.bengali`)
        .then(res=>{
            setSurahName(res.data.data)
        })
        .catch(err =>{
            console.log("error:", err)
        })

    }, [id])

    return (
        <div className="surah">
            <Helmet>
                <title>{surahName !== undefined && surahName.englishName}</title>
            </Helmet>
            <div className="surah__container">
                <div className="surah__header">
                    <div className="surah__name">
                       Name: {surahName.englishName}
                    </div>
                    <div className="surah__numberOfAyat">
                       Ayahs: {surahName.numberOfAyahs}
                    </div>
                </div>
                <div className="surah__body">
                    <div>
                        { testNewSurah[0] !== undefined &&
                            testNewSurah[0].map((ayah, i)=>{

                                let bangla = '';

                                if(testNewSurah[1] != undefined || testNewSurah[1][i] != undefined){
                                    bangla = testNewSurah[1][i].text
                                }

                                return (
                                    <div className="surah__ayah"  key={ayah.number} >
                                        <div className="surah__ayahNumber"> {i + 1}. </div>
                                        <div className="surah__ayahText"> 
                                            <p className="surah__arabicTranslate">{ayah.text}</p>
                                            <p>{bangla}</p>  
                                        </div>
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