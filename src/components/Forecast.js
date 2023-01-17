import { Card, Row } from "react-bootstrap";
import {BsClock, BsFillCalendarEventFill} from "react-icons/bs"

export default function Forecast({ forecast }) {

    //console.log('Forecast', forecast.list)

    function date(date) {
        let d = date.split("-")
        let dateYear = d[0]
        let dateMonth = d[1]
        let dateDay = d[2]
        let time = new Date()
        let today = time.getDate()
        if(dateDay == today) {
            var gün = "Bugün"
        }else if(dateDay == today+1) {
            var gün = "Yarın"
        }
        return gün
    }

    return (
        <Card className="forecast-card">
            <Card.Title className="forecast-title">24 Saatlik Hava Tahmini</Card.Title>
            <Card.Body>
                <div className="forecast-div">
                    {forecast && forecast.list.slice(0, 8).map((item, index) => (
                        <div className="forecast-inner" key={index}>
                            <img src={'http://openweathermap.org/img/wn/' + item.weather[0].icon + '@2x.png'}/>
                            <h3>{item.main.temp} °C</h3>
                            <h6><span className="clock">{date((item.dt_txt.split(" "))[0])}</span></h6>
                            <h6><BsClock/> <span className="clock">{(item.dt_txt.split(" "))[1]}</span></h6>
                        </div>    
                    ))}
                </div>
            </Card.Body>
        </Card>
    )
}