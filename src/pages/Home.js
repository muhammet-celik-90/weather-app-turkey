import Container from "react-bootstrap/container"
import Input from "../components/Input"

export default function Home() {
    return (
        <Container fluid>
            <h1 className='home-header'>Türkiye İlleri Hava Durumu</h1>
            <Input/>
        </Container>
    )
}