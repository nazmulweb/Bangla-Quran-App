import React from 'react';
import './SearchResult.css';
import { translations } from '../utils/translations';
import { toLocaleNumber } from '../utils/numberConverter';

const SearchResult = ({data, language}) => {
    const t = translations[language] || translations["en.asad"];
    
    return (
        <div className="searchResult">
            <div className="searchResult__container">
                <div className="searchResult__header">
                    <div className="searchResult__name">{t.totalAyahFound} {toLocaleNumber(data.matches.length, language)}</div>
                </div>
                <div className="searchResult__body">
                    <div>
                        {
                        data.matches !== undefined ? 
                        data.matches.map(matchAyah =>{
                            return(
                                <div className="searchResult__ayahRow" key={matchAyah.number}>
                                    <div className="MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-disableElevation searchResult__name">{language === "bn.bengali" ? matchAyah.surah.name : matchAyah.surah.englishName}</div>
                                    <div className="searchResult__ayah" >
                                        <div className="searchResult__ayahNumber">{toLocaleNumber(matchAyah.numberInSurah, language)}</div>
                                        <div className="searchResult__ayahText"> 
                                            <p>{matchAyah.text}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                        : t.noResultFound
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchResult
