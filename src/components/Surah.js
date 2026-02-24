import {useState, useEffect, useCallback} from 'react';
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import axios from 'axios';
import Loading from './Loading';
import './Surah.css';
import SearchResult from './SearchResult';
import { translations } from '../utils/translations';
import { surahNamesBn } from '../utils/surahNamesBn';
import { toLocaleNumber } from '../utils/numberConverter';
import meccaIcon from '../assets/mecca.svg';
import madinahIcon from '../assets/madinah.jpg';
// import Button from '@material-ui/core/Button';

const baseUrl = process.env.REACT_APP_QURAN_BASE_URL;

const Surah = ({language, searchResult}) => {
    // get parameter id 
    let { id } = useParams();

    const [searchResultValue, setSearchResultValue] = useState([])

    const [surahName, setSurahName] = useState([]);

    const [loading, setLoading ] = useState(true);
    
    const [urahWithTranslate, setTestNewSurah] = useState([]);
    // const [favorite, setFavorite] = useState([]);
    
    const t = translations[language] || translations["en.asad"];
    const surahNumber = Number(surahName?.number || id);
    const surahDisplayName = language === "bn.bengali"
      ? (surahNamesBn[surahNumber] || surahName?.name || surahName?.englishName)
      : surahName?.englishName;

    const fetchData = useCallback((id) => {

        const arTranslateSurah = axios.get(`${baseUrl}v1/surah/${id}`);
        const bnTranslateSurah = axios.get(`${baseUrl}v1/surah/${id}/${language}`);

        axios.all([arTranslateSurah, bnTranslateSurah])
            .then(
                axios.spread((...datas)=> {
                    console.log(datas)
                    let arSurah = datas[0].data.data.ayahs;
                    let bnSurah = datas[1].data.data.ayahs;

                    const suraArr = [[...arSurah], [...bnSurah]]

                    setTestNewSurah(suraArr)
                    setLoading(false)
                })
            )
    }, [language])

    useEffect(()=>{
        
        setLoading(true)
        // get surah 
        fetchData(id)

        // get surah name 
        axios
        .get(`${baseUrl}v1/surah/${id}/${language}`)
        .then(res=>{
            setSurahName(res.data.data)
            localStorage.setItem('surah', JSON.stringify(res.data.data))
        })
        .catch(err =>{
            console.log("error:", err)
        })

    }, [id, language, fetchData])

    useEffect(()=>{
        setSearchResultValue(searchResult)
    },[searchResult])


    // loading 
    if(loading) return <div><Loading /></div>

    return (
        <div className="surah">
            <Helmet>
                <title>{surahName !== undefined && surahDisplayName}</title>
            </Helmet>
            {
            searchResultValue ? <SearchResult data={searchResultValue} language={language} /> :
            <div className="surah__container">
                <div className="surah__headerCard">
                    <img 
                        src={madinahIcon} 
                        alt={surahName.revelationType} 
                        className="surah__headerIcon" 
                    />
                    <div className="surah__headerTop">
                        <div className="surah__name">
                           {t.nameLabel} {surahDisplayName}
                        </div>
                        <div className="surah__numberOfAyat">
                           {t.ayahsLabel} {toLocaleNumber(surahName.numberOfAyahs, language)}
                        </div>
                    </div>
                    <div className="surah__bismillahWrapper">
                        <div className="surah__bismillahArabic">{t.auzubillah}</div>
                        <div className="surah__bismillahTranslate">{t.auzubillahMeaning}</div>
                        {surahNumber !== 9 && (
                            <>
                                <div className="surah__bismillahArabic">{t.bismillah}</div>
                                <div className="surah__bismillahTranslate">{t.bismillahMeaning}</div>
                            </>
                        )}
                    </div>
                </div>
                <div className="surah__body">
                    <div>
                        { urahWithTranslate[0] !== undefined &&
                            urahWithTranslate[0].map((ayah, i)=>{
                                // Skip rendering the first Ayah for Surah Fatiha because the Bismillah is already in the header
                                if (surahNumber === 1 && i === 0) return null;

                                let bangla = '';

                                if(urahWithTranslate[1] !== undefined || urahWithTranslate[1][i] !== undefined){
                                    bangla = urahWithTranslate[1][i].text
                                }

                                return (
                                    <div className="surah__ayah"  key={ayah.number} >
                                        <div className="surah__ayahNumber"> {toLocaleNumber(i + 1, language)} </div>
                                        <div className="surah__ayahText"> 
                                        {/* <Button variant="contained" color="primary" className="surah__favorite" onClick={()=> setFavorite([ayah.number, ...favorite])}>Love</Button> */}
                                            <p className="surah__arabicTranslate">
                                                {i === 0 && surahNumber !== 1 && surahNumber !== 9 
                                                  ? ayah.text
                                                      .replace('بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ', '')
                                                      .replace('بِسۡمِ ٱللَّهِ ٱلرَّحۡمَٰنِ ٱلرَّحِيمِ', '')
                                                      .replace('بِسۡمِ ٱللَّهِ ٱلرَّحۡمَـٰنِ ٱلرَّحِیمِ', '')
                                                      .replace('بِسۡمِ ٱللَّهِ ٱلرَّحۡمَـٰنِ ٱلرَّحِيمِ', '')
                                                      .replace('بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ', '')
                                                      .trim() 
                                                  : ayah.text
                                                }
                                            </p>
                                            <p>{bangla}</p>  
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            }
        </div>
    )
}

export default Surah
