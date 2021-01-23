import React, {useState} from 'react';
import './Header.css';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom'
  
const Header = ({onclick, language, search}) =>  {

  const [searchValue, setSearchValue] = useState('');

    //set value to state 
    const handleSearchValue = (e) =>{
        setSearchValue(e.target.value.trim());
    }
    
    // reset the state 
    const resetSearchValue = () =>{
        setSearchValue("")
    }

    // click handler 
    const callSearchFunction = (e) =>{
        e.preventDefault();
        search(searchValue);
        resetSearchValue();
    }

    return (
        <div className="header">
            <div className="header__container">
                <form className="header__search">
                    <input type="text" className="header__searchInput"  onChange={handleSearchValue} placeholder="Search by word" />
                    <Button type="submit" variant="contained" color="primary" disableElevation className="header__btn" onClick={callSearchFunction}>Search</Button>
                </form>
                <div className="header__langauge">
                    <Link to="/prayer-time" className="MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-disableElevation header__prayerTime">Prayer time</Link>
                    <Button variant="contained" color="primary" disableElevation onClick={()=> onclick()}>{ language === "bn.bengali" ? "English" : "Bengali" } </Button>
                </div>
            </div>
        </div>
    )
}

export default Header

