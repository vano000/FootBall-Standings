import React, {useState,useEffect} from "react";
import axios from "axios";
import {TailSpin} from "react-loader-spinner";



const Standings = () => {

    const [data,setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedLeague,setSelectedLeague] = useState('');
    const [selectedYear, setSelectedYear] = useState("");


    useEffect(()=> {
        setLoading(true);
        axios(
        `https://api-football-standings.azharimm.site/leagues/${selectedLeague}/standings?season=${selectedYear}`
        ).then(res=> {
        console.log(res.data.data.standings);
        setData(res.data.data.standings);
    } ).catch(err => console.log(err))
       .finally(() => setLoading(false));

    },[selectedLeague, selectedYear]);


    return (
        
    <div className="standings-container"> 

    <h2>Football Season Standings</h2>
    <h4>Select a league and a year of the season</h4>
    <div className="select-container">
        
    <select
          name="select-league"
          id="select-league"
          defaultValue={null}
          onChange={(e) => setSelectedLeague(e.target.value)}
        >
          <option value="">None</option>
          <option value="eng.1">English Premier League </option>
          <option value="fra.1">French Ligue 1</option>
          <option value="ger.1">German Bundesliga</option>
          <option value="ita.1">Italian Serie A </option>
          <option value="por.1">Portuguese Liga</option>
          <option value="esp.1">Spanish Primera División</option>
        </select>
        
        <select
          name="select-year"
          id="select-year"
          onChange={(e) => setSelectedYear(e.target.value)}
          defaultValue={null}
        >
            <option value="">None</option>
          <option value="2011">2011</option>
          <option value="2012">2012</option>
          <option value="2013">2013</option>
          <option value="2014">2014</option>
          <option value="2015">2015</option>
          <option value="2016">2016</option>
          <option value="2017">2017</option>
          <option value="2018">2018</option>
          <option value="2019">2019</option>
          <option value="2020">2020</option>
          <option value="2021">2021</option>
        </select>
    </div>
    <div className="standing-results">
        { loading ? <TailSpin color="#00BFFF" height={400} width={500}  /> :
        data.map((data, index) => (
            <div key={data.team.id} className="standing-info">
            <h1>
                <span>{`${index+1}`} </span>
                <p>{data.team.shortDisplayName}</p> 
                <p><img src={data.team.logos[0].href} alt="#"/></p>
               
               <p>Points: {JSON.stringify(data.stats[6].value)} 🏆</p> 
               <p>Goals: {JSON.stringify(data.stats[4].value)} ⚽</p> 
               
                
               
                
            </h1>
                 </div>

        ))
}
        
        
    </div>
    
    </div>
    );
};


export default Standings;
