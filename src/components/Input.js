import { useState, useEffect } from 'react';
import { Alert } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { BsArrowRightCircle } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';

export default function Input() {

    const [input, setInput] = useState('')
    const [tempAPI, setTempAPI] = useState('')
    const [cod, setCod] = useState(false)
    const [alert, setAlert] = useState(false)

    const navigate = useNavigate()

    const lat = 37
    const lon = 35.3213333

    const handleClick = e => {
        e.preventDefault()
        setTempAPI(input)
    }
    useEffect(() => {
        fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=' + tempAPI + '&units=metric')
            .then(response => response.json())
            .then((result) => {
                setCod(result.cod)
            })
            .catch(err => console.log(err))
    }, [tempAPI])

    useEffect(() => {
        if (cod === 200) {
            sessionStorage.setItem('APIKey',tempAPI)
            navigate("/iller")
        } else if(cod === 401){
            setAlert(true)
        }
    }, [handleClick])

    return (
        <>
            <Alert className='alert-box' variant='danger' style={alert ? {'display': 'block'} : {'display': 'none'}}>Geçersiz API Key</Alert>
            <InputGroup className='home-input'>
                <Form.Control
                    placeholder="API Key Giriniz"
                    aria-label="API Key Giriniz"
                    onChange={(e) => setInput(e.target.value)}
                />
                <Button
                    onClick={handleClick}
                    variant="dark">
                    <BsArrowRightCircle className='home-icon' />
                </Button>
            </InputGroup>
        </>
    )
}