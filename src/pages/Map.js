import { useNavigate } from 'react-router-dom';
import TurkeyMap from 'turkey-map-react';

export default function Map() {

    const navigate = useNavigate()

    return (
        <>
            <TurkeyMap 
                onClick={ ({ plateNumber }) => navigate("/havadurumu",{state:{id:plateNumber}})}
                customStyle={{ idleColor: "#444", hoverColor: "gray" }}  
                showTooltip 
            />
        </>
    )
}