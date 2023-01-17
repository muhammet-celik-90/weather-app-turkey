import { Col, Row, Form, Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import cities from '../cities.json';
import Forecast from "../components/Forecast";

export default function WeatherDetail() {

    const { state } = useLocation()
    const id = state.id;
    const lat = cities[id-1].lat;
    const lon = cities[id-1].lon;
    const name = cities[id-1].il_adi;
    const navigate = useNavigate()
    const API = sessionStorage.getItem('APIKey')   

    const [sehir, setSehir] = useState({
        enlem: lat,
        boylam: lon,
        ilAdi: name
    })

    useEffect(() => {
        fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + sehir.enlem + '&lon=' + sehir.boylam + '&appid=' + API + '&units=metric')
            .then(response => response.json())
            //.then((result) => console.log(result.cod))
            .then((result) => {
                setWeather(result)
            })
            .catch(err => console.log(err))

        fetch('https://api.openweathermap.org/data/2.5/forecast?lat=' + sehir.enlem + '&lon=' + sehir.boylam + '&appid=' + API + '&units=metric')
            .then(response => response.json())
            //.then((result) => console.log(result))
            .then((result) => {
                setForecast(result)
            })
            .catch(err => console.log(err))
    }, [sehir])

    const [weather, setWeather] = useState(false) //güncel hava durumunu saklıyoruz
    const [forecast, setForecast] = useState(false) //hava tahminlerini saklıyoruz

    let icon = weather && weather.weather[0].icon
    let iconURL = 'http://openweathermap.org/img/wn/' + icon + '@2x.png'

    //Hava durumunun türkçe karşılıkları
    function durum(d) {
        switch (d) {
            case 'Clouds':
                var havaDurumu = 'Bulutlu'
                break;
            case 'Tornado':
                var havaDurumu = 'Kasırga'
                break;
            case 'Thunderstorm':
                var havaDurumu = 'Fırtına'
                break;
            case 'Drizzle':
                var havaDurumu = 'Çiseleme'
                break;
            case 'Rain':
                var havaDurumu = 'Yağmurlu'
                break;
            case 'Snow':
                var havaDurumu = 'Karlı'
                break;
            case 'Mist':
                var havaDurumu = 'Sisli'
                break;
            case 'Smoke':
                var havaDurumu = 'Dumanlı'
                break;
            case 'Haze':
                var havaDurumu = 'Puslu'
                break;
            case 'Dust':
                var havaDurumu = 'Tozlu'
                break;
            case 'Fog':
                var havaDurumu = 'Sisli'
                break;
            case 'Sand':
                var havaDurumu = 'Kumlu'
                break;
            case 'Ash':
                var havaDurumu = 'Kül Fırtınası'
                break;
            case 'Squall':
                var havaDurumu = 'Fırtına'
                break;
            default:
                var havaDurumu = 'Açık'
                break;
        }
        return havaDurumu
    }

    const handleChange = e => {
        let plaka = e.target.value;
        setSehir({
            enlem: cities[plaka - 1].lat,
            boylam: cities[plaka - 1].lon,
            ilAdi: cities[plaka - 1].il_adi
        })
    }

    return (
        <div className="city-page">
            <Row className="weather-page-header">
                <div className="weather-info">
                    <div className="left-side">
                        <h2>{sehir.ilAdi}</h2>
                        <div className="weather-sum">
                            <img src={iconURL} alt="weather-icon" />
                            <h4>{weather && weather.main.temp}°C</h4>
                        </div>
                    </div>
                    <div className="middle-side">
                        <Form.Select className="select-area" onChange={handleChange} >
                            <option>Şehir Seç</option>
                            {cities.map(city => (
                                <option key={city.plaka} value={city.plaka}>{city.il_adi}</option>
                            ))}
                        </Form.Select>
                        <Button className="btn-cities" onClick={() => { navigate("/iller") }}>Tüm İller</Button>
                        <Button className="btn-cities" onClick={() => { navigate("/harita") }}>Harita</Button>
                    </div>
                    <div className="right-side">
                        <div>
                            <span className="right-side-info-header">Nem:</span><span className="right-side-info">{weather && weather.main.humidity} %</span>
                        </div>
                        <div>
                            <span className="right-side-info-header">Rüzgar Hızı:</span><span className="right-side-info">{weather && weather.wind.speed}</span>
                        </div>
                        <div>
                            <span className="right-side-info-header">Hissedilen:</span><span className="right-side-info">{weather && weather.main.feels_like} °C</span>
                        </div>
                        <div>
                            <span className="right-side-info-header">Durum:</span><span className="right-side-info">{durum(weather && weather.weather[0].main)}</span>
                        </div>
                    </div>
                </div>
            </Row>
            <Row className="forecast-row">
                <Forecast forecast={forecast} />
            </Row>
        </div>
    )
}