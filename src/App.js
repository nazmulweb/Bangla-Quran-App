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
const ARABIC_FONT_SIZE_KEY = "arabic_font_size";
const DEFAULT_ARABIC_FONT_SIZE = 38;

const getStoredNumber = (key, fallback, min, max, step = 1) => {
  if (typeof window === "undefined") return fallback;
  const raw = Number(localStorage.getItem(key));
  if (Number.isNaN(raw)) return fallback;
  const clamped = Math.min(max, Math.max(min, raw));
  return Math.round(clamped / step) * step;
};

function App() {

  // search 
  const [searchValue, setSearchValue] = useState();

  // surah name 
  const [surahs, setSurahs ] = useState([]);
  const [loading, setLoading ] = useState(true);
  const [language, setLangauge] = useState("bn.bengali")
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [arabicFontSize, setArabicFontSize] = useState(() =>
    getStoredNumber(ARABIC_FONT_SIZE_KEY, DEFAULT_ARABIC_FONT_SIZE, 24, 52, 1)
  );


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

  const updateArabicFontSize = (nextSize) => {
    setArabicFontSize(Math.min(52, Math.max(24, nextSize)));
  };

  const resetArabicFontSettings = () => {
    setArabicFontSize(DEFAULT_ARABIC_FONT_SIZE);
  };

  // search function 
  const search = (searchText) => {
    if (!searchText) {
      setSearchValue(null);
      return;
    }
    axios
    .get(`${baseUrl}v1/search/${searchText}/all/${language}`)
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
    setIsSidebarOpen(false)
  }

  useEffect(() => {
    document.documentElement.style.setProperty("--arabic-font-size", `${arabicFontSize}px`);
    localStorage.setItem(ARABIC_FONT_SIZE_KEY, String(arabicFontSize));
  }, [arabicFontSize]);

  // loading 
  if(loading) return <div><Loading /></div>

  return (
    <div className="app">
      <Router>
        <Header
          onclick={ changeLanguage }
          language={language}
          search={search}
          onMenuClick={() => setIsSidebarOpen((prev) => !prev)}
          arabicFontSize={arabicFontSize}
          onIncreaseFontSize={() => updateArabicFontSize(arabicFontSize + 1)}
          onDecreaseFontSize={() => updateArabicFontSize(arabicFontSize - 1)}
          onResetFont={resetArabicFontSettings}
        />
        <div className="app__container">
          <div className={`app__sidebar ${isSidebarOpen ? "app__sidebar--open" : ""}`}>
            <Sidebar onclick={sidebarClickHandler} surahs={surahs} language={language} />
          </div>
            <div
              className={`app__overlay ${isSidebarOpen ? "app__overlay--visible" : ""}`}
              onClick={() => setIsSidebarOpen(false)}
            />
            <div className="app__body">
            <Switch>
                <Route exact path="/" children={ <Welcome language={language} />} />
                <Route path="/prayer-time" children={ <PrayerTime language={language} />} />
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
