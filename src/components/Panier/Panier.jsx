import './Panier.css'
import moto from "../../assets/livraison.png"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { resetPanier } from '../../Slices/PanierSlice'

export default function Panier({show}) {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const panier = useSelector(state => state.panier)

    const livraison = 1.99
    const prixTotal = panier.reduce((sum, pizza) => sum + pizza.price, 0)
    const prixTotalLivraison = prixTotal+ ( prixTotal + livraison >= 15 ? livraison : 0)

    return(
        <div className='Panier'>
            <div className='PanierAchat'>
                <h3>Panier d'achat</h3>
                {show && (
                    <span className='btnAdresse'>Modifier l'adresse</span>
                )}
                <div className='PanierArticles'>
                    {panier.length > 0 ? (
                        panier.map(element => (
                            <div className='panierArticle'>
                                <div>
                                    <span>{element.name}</span>
                                    <span>€{element.price.toLocaleString("fr-FR", {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                                </div>
                                <div>
                                    <div>
                                        <span>-</span>
                                        <span>{element.quantity}</span>
                                        <span>+</span>
                                    </div>
                                    <div>
                                        <span>Modifier</span>
                                        <span style={{color: "#c8102e"}}>Supprimer</span>
                                    </div>
                                </div>
                            </div>
                        ))
                    ): (
                        <div className='PanierVide'>Panier vide</div>
                    )}
                </div>
                {prixTotalLivraison >= 15 ? (

                    <div style={{color: "gray", paddingBottom: "0px", marginBottom: "-10px"}} className='PanierTotal'>
                    <div style={{flexGrow: "1",}}>Livraison</div>
                    <div>€ {livraison}</div>
                </div>
                ): ""}
                <div className='PanierTotal'>
                    <div style={{flexGrow: "1",}}>Total</div>
                    <div>€ {prixTotalLivraison.toFixed(2).replace(".",",")}</div>
                </div>
            </div>
            {show && (
                <>
                    <button className={`btnCommander ${prixTotalLivraison >= 15 ? "active" : ""}`} disabled={!(prixTotalLivraison >= 15)} onClick={()=> {navigate("/confirmation");dispatch(resetPanier())}}>
                        <div style={{flexGrow: "0"}}>{panier.length}</div>
                        <div style={{flexGrow: "1"}}>Commander</div>
                        <div style={{flexGrow: "0"}}>€{prixTotalLivraison.toFixed(2).replace(".", ",")}</div>
                    </button>
                    {prixTotalLivraison >= 15 ? "" : (

                        <div className='infosCommander'>
                            <div>
                                <img src={moto} alt="" />
                                <h4>Commander</h4>
                            </div>
                            <p>
                                Livraison à partir d'un montant minimum de commande de 15.00€.
                            </p>
                        </div>
                    )}
                </>
            )}
        </div>
    )
}
