import "./Commande.css"
import confirmé from "../../assets/confirmé.png"


export default function Commande(){



    return(
        <>
        <section className="commande">
        <div className="confirmation">
            <div id="div-confi-1">
                <img src={confirmé} alt="" />
                <p>Commande confirmée</p>
                <h5>Votre repas est en route vers vous!</h5>
                <h5 id="blue">Voir la facture</h5>
            </div>
            <div>
                <button>Voir ma commande</button>
            </div>
        </div>
        </section>
        </>
    )
}