import {useState, useEffect} from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import Surah from './components/Surah';
import axios from 'axios';
import NoMatch from './components/NoMatch';

import {   
  BrowserRouter as Router,
  Switch,
  Route,
   } from 'react-router-dom'

function App() {

  const [surahs, setSurahs ] = useState([]);

  useEffect(()=>{
    axios
    .get(`http://api.alquran.cloud/v1/surah`)
    .then(res=>{
      console.log(res.data.data)
      setSurahs(res.data.data)
    })
    .catch(err =>{
        console.log("error:", err)
    })

  }, [])

  return (
    <div className="app">
      <Router>
        <div className="app__container">
          <div className="app__sidebar">
            <Sidebar surahs={surahs} />
          </div>
            <div className="app__body">
            <Switch>
                <Route exact path="/:id" children={ <Surah />} />
                <Route path="/surah/:id" children={ <Surah />} />
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
