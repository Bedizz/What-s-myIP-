import React, { useEffect, useState,useParams } from 'react'
import { MapContainer, TileLayer, Marker} from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import './myIP.css'
import { latLng } from 'leaflet';


const myIP = () => {
    
    const [ipData, setIpData] = useState({})

    const getIPData = async () => {
        try {
            const res = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=${import.meta.env.VITE_APP_API_KEY}`)
            const data = await res.json()
            setIpData(data)
            console.log(data)
            
            
        } catch (error) {
            console.log(error)
            
        }
        
    }
    useEffect(() => {
        getIPData()

    }, [])
    const { ip, location: { country, region, lat, lng } } = ipData
  return (
    <div className='ip-card'>
        <h1>My IP Address</h1>
        <div className='ip-info'>
            <h2>IP ADDRESS</h2>
            <p>{ip}</p>
        </div>
        <div className='ip-info'>
            <h2>LOCATION</h2>
            {/* <p>{ipData.location?.city}, {ipData.location?.country}</p> */}
            {/* <p>{country}</p> */}
            {/* <p>{ipData.location?.region}</p> */}
            <p>{location.country}</p>
        </div>
        {/* <div className='ip-info'>
            <h2>TIMEZONE</h2>
            <p>{ipData.location?.timezone}</p>
        </div> */}
        <div className='ip-info'>
            {/* <h2>ISP</h2>
            <p>{ipData.isp}</p> */}
        </div>
        <div id="map" >
        <h2>MAP</h2>
        <MapContainer center={[1,1]} zoom={13} >
            <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
            url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
            
            
             />
            

        </MapContainer>
        </div>
        

    </div>
  )
}

export default myIP;