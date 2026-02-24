import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Loading from './Loading';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import "./PrayerTime.css";
import Moon from '../assets/moon.svg';
import Sun from '../assets/sun.svg';
import sunSet from '../assets/sunset.svg';
import sunRise from '../assets/sunrise.svg';
import Clock from '../assets/clock.svg';
import { translations } from '../utils/translations';

const useStyles = makeStyles({
    table: {
      minWidth: 0,
    },
  });

const baseUrl = process.env.REACT_APP_PRAYER_TIME_URL;
const prayerCity = process.env.REACT_APP_PRAYER_CITY || "dhaka";
const prayerCountry = process.env.REACT_APP_PRAYER_COUNTRY || "bangladesh";


const PrayerTime = ({ language }) => {
    const classes = useStyles();
    const [prayerTime, setPrayerTime] = useState([]);
    const [loading, setLoading ] = useState(true);
    const [time, setTime] = useState(null)
    const [locationDisplay, setLocationDisplay] = useState("Loading...");
    
    const t = translations[language] || translations["en.asad"];
    const defaultLocationName = `${prayerCity}, ${prayerCountry}`
      .split(",")
      .map((part) =>
        part
          .trim()
          .split(/[\s_-]+/)
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")
      )
      .join(", ");

    useEffect(()=>{
        let mounted = true;
        setLoading(true);

        const fetchPrayerTimes = (latitude, longitude, method = 1) => {
            const url = latitude && longitude 
                ? `${baseUrl}v1/timings?latitude=${latitude}&longitude=${longitude}&method=${method}`
                : `${baseUrl}v1/timingsByCity?city=${encodeURIComponent(prayerCity)}&country=${encodeURIComponent(prayerCountry)}&method=${method}`;

            axios
            .get(url)
            .then(res=>{
                if (mounted) {
                    setPrayerTime(res.data.data);
                    setLoading(false);
                }
            })
            .catch(err =>{
                if (mounted) {
                    console.log("error:", err);
                    setLoading(false);
                }
            });
        };

        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    if (mounted) {
                        setLocationDisplay(language === "bn.bengali" ? "আপনার অবস্থান" : "Your Location");
                        fetchPrayerTimes(position.coords.latitude, position.coords.longitude, 1);
                    }
                },
                (error) => {
                    if (mounted) {
                        console.log("Geolocation error:", error);
                        setLocationDisplay(defaultLocationName);
                        fetchPrayerTimes(null, null, 1);
                    }
                },
                { timeout: 10000 }
            );
        } else {
            setLocationDisplay(defaultLocationName);
            fetchPrayerTimes(null, null, 1);
        }

        return () => {
            mounted = false;
        };
    },[language, defaultLocationName])

    useEffect(()=>{
        // time interval
        const interval = setInterval(()=>{
            setTime(new Date().toLocaleTimeString())
        }, 1000)
        return ()=> clearInterval(interval)
    }, [])

    // time format function 
    const timeFormater = (time) =>{
        return moment(time + "AM", 'hh:mm a').format('LT')
    }


    if(loading) return <div><Loading /></div>

    return (
        <div className="prayertime">
            <h2 className="prayertime__location">
                <span className="prayertime__locationLabel">{t.prayerLocation}</span>
                <span className="prayertime__locationValue">{locationDisplay}</span>
            </h2>
            <TableContainer component={Paper} className="prayertime__tableContainer">
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell className="prayertime__sunrise">
                                <div className="prayertime__headerWrapper">
                                    <div><img src={sunRise} alt="Sun"/></div>
                                    <div>{timeFormater(prayerTime.timings.Sunrise)}</div>
                                    <small>({t.sunrise})</small>
                                </div>
                            </TableCell>
                            <TableCell  className="prayertime__clock" align="left">
                                <div className="prayertime__headerWrapper">
                                    <div><img src={Clock} alt="Sun"/></div>
                                    <div>{time}</div>
                                </div>
                            </TableCell>
                            <TableCell  className="prayertime__sunset" align="right">
                                <div className="prayertime__headerWrapper">
                                    <div><img src={sunSet} alt="Sun"/></div>
                                    <div>{timeFormater(prayerTime.timings.Sunset)}</div>
                                    <small>({t.sunset})</small>
                                </div>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow className="prayertime__tableRow">
                            <TableCell colSpan={3} className="prayertime__prayerName"><img src={Sun} alt="Sun"/>{t.fajr}</TableCell>
                            <TableCell colSpan={3} className="prayertime__prayerTime" align="right">{timeFormater(prayerTime.timings.Fajr)}</TableCell>
                        </TableRow>
                        <TableRow className="prayertime__tableRow">
                            <TableCell className="prayertime__prayerName"><img src={Sun} alt="Sun"/>{t.dhuhr}</TableCell>
                            <TableCell colSpan={3} className="prayertime__prayerTime" align="right">{timeFormater(prayerTime.timings.Dhuhr)}</TableCell>
                        </TableRow>
                        <TableRow className="prayertime__tableRow">
                            <TableCell className="prayertime__prayerName"><img src={Sun} alt="Sun"/>{t.asr}</TableCell>
                            <TableCell colSpan={3} className="prayertime__prayerTime" align="right">{timeFormater(prayerTime.timings.Asr)}</TableCell>
                        </TableRow>
                        <TableRow className="prayertime__tableRow">
                            <TableCell className="prayertime__prayerName"><img src={Moon} alt="Moon"/>{t.maghrib}</TableCell>
                            <TableCell colSpan={3} className="prayertime__prayerTime" align="right">{timeFormater(prayerTime.timings.Maghrib)}</TableCell>
                        </TableRow>
                        <TableRow className="prayertime__tableRow">
                            <TableCell className="prayertime__prayerName"><img src={Moon} alt="Moon"/>{t.isha}</TableCell>
                            <TableCell colSpan={3} className="prayertime__prayerTime" align="right">{timeFormater(prayerTime.timings.Isha)}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default PrayerTime
