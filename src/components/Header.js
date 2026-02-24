import React, {useState} from 'react';
import './Header.css';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom'
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
import { translations } from '../utils/translations';
  
const Header = ({onclick, language, search, onMenuClick}) =>  {

  const [searchValue, setSearchValue] = useState('');
  
  const t = translations[language] || translations["en.asad"];

    //set value to state 
    const handleSearchValue = (e) =>{
        setSearchValue(e.target.value);
    }
    
    // reset the state 
    const resetSearchValue = () =>{
        setSearchValue("")
    }

    // click handler 
    const callSearchFunction = (e) =>{
        e.preventDefault();
        search(searchValue);
    }

    const clearSearch = () => {
        resetSearchValue();
        search("");
    }

    return (
        <div className="header">
            <div className="header__container">
                <button className="header__menuBtn" type="button" onClick={onMenuClick} aria-label="Open navigation menu">
                    <MenuIcon />
                </button>
                <form className="header__search" onSubmit={callSearchFunction}>
                    <div className="header__searchInputWrap">
                        <input type="text" className="header__searchInput" value={searchValue} onChange={handleSearchValue} placeholder={t.searchPlaceholder} />
                        {searchValue ? (
                            <button type="button" className="header__clearBtn" aria-label="Clear search" onClick={clearSearch}>
                                <CloseIcon />
                            </button>
                        ) : null}
                    </div>
                    <Button type="submit" variant="contained" color="primary" disableElevation className="header__btn" aria-label={t.searchBtn}>
                        <SearchIcon />
                    </Button>
                </form>
                <div className="header__langauge">
                    <Link to="/prayer-time" className="MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-disableElevation header__prayerTime">{t.prayerTimeBtn}</Link>
                    <Button variant="contained" color="primary" disableElevation onClick={()=> onclick()}>{ language === "bn.bengali" ? "English" : "Bengali" } </Button>
                </div>
            </div>
        </div>
    )
}

export default Header
