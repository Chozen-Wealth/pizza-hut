import { useNavigate } from "react-router-dom"
import "./Details.css"
import Panier from "../../components/Panier/Panier"



export default function Details(){

    const navigate = useNavigate()

    return(
        <section className="Details">
            <span onClick={()=> navigate("/")} className="retour">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z"/></svg>
                Retour
            </span>
            <div className="DetailsGeneral">
                <div className="DetailsPizza">

                </div>
                <Panier/>
            </div>
        </section>
    )
}