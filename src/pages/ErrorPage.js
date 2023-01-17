import { useRouteError } from "react-router-dom"

export default function ErrorPage() {

    const error = useRouteError();
    console.log(error)

    return (
        <>
            <h1>Oops!</h1>
            <p>Hata Oluştu</p>
            <i>{error.statusText || error.message}</i>
        </>
    )
}