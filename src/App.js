import {useState, useEffect} from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import Surah from './components/Surah';
import axios from 'axios';
import NoMatch from './components/NoMatch';
import Loading from './components/Loading';
import Header from './components/Header';
import Welcome from './components/Welcome';

import {   
  BrowserRouter as Router,
  Switch,
  Route,
   } from 'react-router-dom'

function App() {

  const [surahs, setSurahs ] = useState([]);
  const [loading, setLoading ] = useState(true);
  const [language, setLangauge] = useState("bn.bengali")

  useEffect(()=>{
    setLoading(true)
    axios
    .get(`http://api.alquran.cloud/v1/surah`)
    .then(res=>{
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


  // loading 
  if(loading) return <div><Loading /></div>

  return (
    <div className="app">
      <Router>
        <Header
          onclick={ changeLanguage }
          language={language}
        />
        <div className="app__container">
          <div className="app__sidebar">
            <Sidebar surahs={surahs} />
          </div>
            <div className="app__body">
            <Switch>
                <Route exact path="/" children={ <Welcome />} />
                <Route path="/surah/:id" children={ <Surah language={language} />} />
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
