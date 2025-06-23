import "./Commande.css"
import confirmé from "../../assets/confirmé.png"
import { useNavigate } from "react-router-dom"


export default function Commande(){

    const navigate = useNavigate()

    return(
        <section className="commande">
            <div className="confirmation">
                <div id="div-confi-1">
                    <img src={confirmé} alt="" />
                    <p>Commande confirmée</p>
                    <h5>Votre repas est en route vers vous!</h5>
                    <h5 id="blue">Voir la facture</h5>
                </div>
                <div>
                    <button onClick={()=> navigate("/")} className="btnretouraccueil">Retourner à l'accueil</button>
                </div>
            </div>
        </section>
    )
}