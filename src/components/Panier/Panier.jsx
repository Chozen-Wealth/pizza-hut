import './Panier.css'
import moto from "../../assets/livraison.png"

export default function Panier() {
    return(
        <div className='Panier'>
            <div className='PanierAchat'>
                <h3>Panier d'achat</h3>
                <span className='btnAdresse'>Modifier l'adresse</span>
                <div className='PanierArticles'>
                    <div className='PanierVide'>Panier vide</div>
                </div>
                <div className='PanierTotal'>
                    <div style={{flexGrow: "1",}}>Total</div>
                    <div>€ 0,00</div>
                </div>
            </div>
            <button className='btnCommander'>
                <div style={{flexGrow: "0"}}>0</div>
                <div style={{flexGrow: "1"}}>Commander</div>
                <div style={{flexGrow: "0"}}>€0,00</div>
            </button>
            <div className='infosCommander'>
                <div>
                    <img src={moto} alt="" />
                    <h4>Commander</h4>
                </div>
                <p>
                    Livraison à partir d'un montant minimum de commande de 15.00€.
                </p>

            </div>
        </div>
    )
}
