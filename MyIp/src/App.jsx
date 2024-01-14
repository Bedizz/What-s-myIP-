import { useState, useEffect } from 'react'
import './App.css'
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker} from 'react-leaflet';
import { DateTime } from "luxon";

function App() {
  const [ipData, setIpData] = useState({})
  const [isTake,setIsTake] = useState(false)
  const [country,setCountry] = useState({})
  const [localDate,setLocalDate] = useState('')
  const [localTime,setLocalTime] = useState('')
  

  const getIPData = async () => {
      try {
          const res = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=${import.meta.env.VITE_APP_API_KEY}`)
          const data = await res.json()
          setIpData(data)
          setIsTake(true)
          
          // setPosition(data.location)

          // console.log(data)
          // console.log(data.location)
          try {
            const CountryRes = await fetch(`https://restcountries.com/v3.1/alpha/${data.location.country}`) 
            const countryData = await CountryRes.json()
            setCountry(countryData[0])
            // console.log(countryData)
            console.log(country)
            //Date data
            const localDateTime = DateTime.now().setZone(country.timezones);
            setLocalDate(localDateTime.toLocaleString(DateTime.DATE_SHORT));
            setLocalTime(localDateTime.toLocaleString(DateTime.TIME_SIMPLE));
            
            
          } catch (error) {
            console.log("The country information isn't found",error)
            
          }
          
          
      } catch (error) {
          console.log("Location Apı failed",error)
          
      }
      
      
  }
  useEffect(() => {
      getIPData()

  }, [])
  
return (
  <>
  {isTake ? 
  
  <div className='ip-card'>
    
      <h1>My IP Address</h1>
      <div className='ip-info'>
          <h2>IP ADDRESS</h2>
          <p>{ipData.ip}</p>
      </div>
      {Object.keys(country).length > 0 ? (
      <>
      <div className='ip-info'>
          <h2>LOCATION</h2>
          <p>{country.name.common}, {ipData.location.country}</p>
          <p>{ipData.location.region}</p>
          <p>{country.capital}</p>
          <img src={country.flags.png} alt={country.flags.alt} />
          

      </div>
      <div className='ip-info'>
          <h2>TIMEZONE</h2>
          <p>Local Date: {localDate}</p>
            <p>Local Time: {localTime}</p>
      </div>
      <div className='ip-info'>
          <h2>ISP</h2>
          <p>{ipData.isp}</p>
      </div>
      </>
        ) : (
            <h1>Loading...</h1>
        )}
      <div id="map" >
        
      <h2>MAP</h2>
       
      <MapContainer center={[ipData.location.lat,ipData.location.lng]} zoom={13} >
          <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          
          
           />
          <Marker position={[ipData.location.lat,ipData.location.lng]}></Marker>
          

      </MapContainer>
      </div>
      

  </div>
   : <h1>Loading...</h1>}
  </>
)
}

export default App
