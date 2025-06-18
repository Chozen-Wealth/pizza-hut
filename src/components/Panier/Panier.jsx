import './Panier.css'

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
                <button className='btnCommander'>
                    <div style={{flexGrow: "0"}}>0</div>
                    <div style={{flexGrow: "1"}}>Commander</div>
                    <div style={{flexGrow: "0"}}>€0,00</div>
                </button>

            </div>
        </div>
    )
}
