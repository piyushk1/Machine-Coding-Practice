import React,{useState} from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';



export default function SearchBox() {

    const [location,setLocation] = useState("");
    const [weatherData,setWeatherData] = useState(null);
    const[isSearchInitiated,setIsSearchInitiated]= useState(false);


    const handleLocation = (event) =>{
        setLocation(event.target.value);
        console.log(event.target.value);
    }

    const handleSearch = async ()=>{
        setIsSearchInitiated(true);
       if(location.trim() ==="")
       {
        setWeatherData(null);
        return;
       }
       else
       {

        try{

            const response =await fetch(`https://api.weatherapi.com/v1/current.json?key=7dfd7a5762164f8b8ac34745233008&q=${location}&aqi=no`);
            if(response.ok)
            {
                const data = await response.json();
                setWeatherData(data);
                console.log(data);
            }
            else{
                console.log("Error in Response",response.statusText);
                setWeatherData(null);
            }
            
        }
        catch(e)
        {
            console.log("Error is ",e);
            setWeatherData(null);
        }
        
       }

    }
  return (
    <div>
        <Box  sx={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
        <TextField value={location} onChange={handleLocation} sx={{width:"450px",margin:"20px"}}  label="Search" id="search" />
        <Button variant="contained" onClick={handleSearch}sx ={{margin:"20px"}}className='searchButton'>Search</Button>

        </Box>

        <div>
            {isSearchInitiated? 
            (weatherData?
            ( 
            <div>
              <h1> City:{weatherData.location.name}</h1>
              <h2>Region:{weatherData.location.region}</h2>
              <h2>Temperature:{weatherData.current.temp_c}</h2>
              <h2>Humidity:{weatherData.current.humidity}</h2>
          </div>):( <div>
            <h1>Location not found</h1>

        </div>)):null}
            
        </div>

    </div>
  )
}
