import {useState, useEffect} from 'react';
import axios from 'axios';
import Sidebar from './components/Sidebar';
import Surah from './components/Surah';
import NoMatch from './components/NoMatch';
import Loading from './components/Loading';
import Header from './components/Header';
import Welcome from './components/Welcome';
import PrayerTime from './components/PrayerTime';
import './App.css';
import {   
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

// base url 
const baseUrl = process.env.REACT_APP_QURAN_BASE_URL

function App() {

  // search 
  const [searchValue, setSearchValue] = useState();

  // surah name 
  const [surahs, setSurahs ] = useState([]);
  const [loading, setLoading ] = useState(true);
  const [language, setLangauge] = useState("bn.bengali")


  useEffect(()=>{
    setLoading(true)
    // get all surah name 
    axios
    .get(`${baseUrl}v1/surah`)
    .then(res=>{
      // set suran name to state 
      setSurahs(res.data.data)
      setLoading(false)
    })
    .catch(err =>{
        console.log("error:", err)
    })
  }, [])

  const changeLanguage = () =>{
    setLangauge(language === "bn.bengali" ? "en.asad" : "bn.bengali" )
  }

  // search function 
  const search = (search) => {
    axios
    .get(`${baseUrl}v1/search/${search}/all/${language}`)
    .then(res=>{
      setSearchValue(res.data.data)
    })
    .catch(err =>{
        console.log("error:", err)
    })
  }

  // set search result to null after click sidebar 
  const sidebarClickHandler = () => {
    setSearchValue(null)
  }

  // loading 
  if(loading) return <div><Loading /></div>

  return (
    <div className="app">
      <Router>
        <Header
          onclick={ changeLanguage }
          language={language}
          search={search}
        />
        <div className="app__container">
          <div className="app__sidebar">
            <Sidebar onclick={sidebarClickHandler} surahs={surahs} />
          </div>
            <div className="app__body">
            <Switch>
                <Route exact path="/" children={ <Welcome language={language} />} />
                <Route path="/prayer-time" children={ <PrayerTime />} />
                <Route path="/surah/:id" children={ <Surah 
                                                    searchResult={searchValue}
                                                    language={language}
                                                    surah={surahs}/>} />
                <Route path="*">
                    <NoMatch />
                </Route>
            </Switch>
            </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
