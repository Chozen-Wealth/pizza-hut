import { Outlet } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Nav from "../../components/Nav/Nav";




export default function Layout(){



    return(
        <>
            <Nav/>
            <Outlet/>
            <Footer/>
        </>
    )
}