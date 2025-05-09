import { useState , useEffect } from 'react'
import './App.css'
import Swal from 'sweetalert2'

function Weather(){
    const [city,setCity] = useState('bangkok')
    const country = 'th'
    const key = 'f65dd5dbca64eead86e87f1dec1160d3'
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=metric&appid=${key}`
    const [data,setData] = useState('')
    function getData(){
        fetch(url)
            .then(res=>res.json())
            .then(json=>{
                if (json.cod === 200) {
                    setData(json)
                } else {
                    setData(null)
                    Swal.fire({
                        icon: "error",
                        text: "ไม่พบชื่อเมือง กรุณากรอกใหม่!",
                      });
                }
            })
    }
    useEffect(()=>{
        getData()
    },[])
    function setInput(e){
        setCity(e.target.value)
    }
    return(
        <div className='weather-container'>
            <input type='text' onInput={setInput}></input>
            <i className="fa-solid fa-magnifying-glass fa-2xl" onClick={getData}></i>
            {data ? (   
                <>
                    <h2>{data.name}</h2>
                    <h4>{data.sys.country}</h4>
                    <div className="box">
                        <div className="row1">
                            <h1>{data.main.temp}</h1>
                            <h3>max {data.main.temp_max} , min {data.main.temp_min}</h3>
                        </div>
                        <div className="row2">
                            <h3>{data.weather[0].description}</h3>
                            <p></p>
                            <h3>{data.main.humidity}</h3>
                            <p></p>
                            <h3>{data.wind.speed}</h3>
                        </div>
                    </div>
                </>
            ):(<p>loading</p>)} 
            </div>
        )
}

export default Weather