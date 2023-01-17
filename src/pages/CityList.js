import {Card} from 'react-bootstrap';
import cities from '../cities.json';
import { useNavigate } from 'react-router-dom';

export default function CityList() {

    const navigate = useNavigate()

    return (
        <div className='city-page'>
            <div className='city-page-header'>
                <h1>Şehir Listesi</h1>
            </div>
            <div className='city-wrapper'>
                {cities.map((city) => (
                    <Card 
                        key={city.plaka} 
                        onClick={()=>{
                            navigate('/havadurumu',
                            {state: {       //Bilgileri parametre olarak gönderiyoruz
                                lat: city.lat,
                                lon: city.lon,
                                name: city.il_adi,
                                id: city.plaka
                            }})}} 
                        className='city-card'
                    >
                        <div className='city-card-body'>
                            <span className='city-plate'>{city.plaka}</span>
                            <span>{city.il_adi}</span>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    )
}