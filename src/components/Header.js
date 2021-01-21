import React, {useState, useEffect} from 'react';
import './Header.css';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { Link } from 'react-router-dom'
  

const Header = ({onclick, language}) =>  {

  const [searchValue, setSearchValue] = useState(undefined);
  const [loading, setLoading ] = useState(true);

    useEffect(()=>{
        setLoading(true)
        axios
        .get(`http://api.alquran.cloud/v1/search/${searchValue}/37/${language}`)
        .then(res=>{
          setSearchValue(res.data.data)
          setLoading(false)
        })
        .catch(err =>{
            console.log("error:", err)
        })
    }, [searchValue])

    return (
        <div className="header">
            <div className="header__container">
                <div className="header__search">
                    {/* <input type="text"  onChange={e => e.target.value ? setSearchValue(e.target.value) : setSearchValue(undefined)} /> */}
                </div>
                <div className="header__langauge">
                    <Link to="/prayer-time" className="MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-disableElevation header__prayerTime">Prayer time</Link>
                    <Button variant="contained" color="primary" disableElevation onClick={()=> onclick()}>{ language === "bn.bengali" ? "English" : "Bengali" } </Button>
                </div>
            </div>
        </div>
    )
}

export default Header

