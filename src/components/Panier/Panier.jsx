import './Panier.css'
import moto from "../../assets/livraison.png"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { deletePizza, loadPizzaForEdit, incrementer, decrementer, clearCart } from '../../Slices/IngredientsSlice'
import { useState } from 'react'

export default function Panier({show}) {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const pizzas = useSelector(state => state.ingredients.cart)

    const livraison = 1.99
    const prixTotal = pizzas.reduce((sum, pizza) => sum + pizza.totalPrice, 0)
    const prixTotalLivraison = prixTotal + (prixTotal >= 15 ? livraison : 0)

    const [afficherPanier, setAfficherPanier] = useState(false)

    return(
        <>
            <div className={`responsiveBtnPanier ${prixTotalLivraison >= 15 ? "active" : ""}`} disabled={!(prixTotalLivraison >= 15)} onClick={()=> setAfficherPanier(true)}>
                <button>
                    <div style={{flexGrow: "0"}}>{pizzas.length}</div>
                    <div style={{flexGrow: "1"}}>Afficher le panier d'achat</div>
                    <div style={{flexGrow: "0"}}>€{prixTotalLivraison.toFixed(2).replace(".", ",")}</div>
                </button>
            </div>
            {afficherPanier && (
                <div className='Panier2'>
                    <div onClick={()=> setAfficherPanier(false)} className='btnFermerPanier'>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
                    </div>
                <div className='PanierAchat'>
                    <h3>Panier d'achat</h3>
                    {show && (
                        <span className='btnAdresse'>Modifier l'adresse</span>
                    )}
                    <div className='PanierArticles'>
                        {pizzas.length > 0 ? (
                            pizzas.map(element => (
                                <div key={element.id} className='panierArticle'>
                                    <div style={{marginBottom: "5px"}}>
                                        <span style={{fontSize: "14px", letterSpacing: "0.5px"}}>{element.name}</span>
                                        <span>€{element.totalPrice.toFixed(2).replace(".", ",")}</span>
                                    </div>

                                    <div style={{ fontSize: "0.9em", color: "#555", display:"flex", flexDirection: "column" }}>
                                      {element.added.length > 0 && (
                                        <p className='panierSupp'><span>Supp:</span> {element.added.map(i => `${i.name} x${i.quantity}`).join(", ")}</p>
                                      )}
                                      {element.removed.length > 0 && (
                                        <p className='panierSans'><span>Sans:</span> {element.removed.map(i => i.name).join(", ")}</p>
                                      )}
                                    </div>
                                    {show && (

                                        <div style={{marginTop: "5px"}}>
                                        <div className='divBtnArticle'>
                                            <span onClick={()=> dispatch(decrementer(element.id))} className='btnArticle moins'>-</span>
                                            <span>{element.quantity}</span>
                                            <span onClick={()=> dispatch(incrementer(element.id))} className='btnArticle'>+</span>
                                        </div>
                                        <div>
                                            <span onClick={() => {
                                                dispatch(loadPizzaForEdit({ pizza: element, index: pizzas.findIndex(p => p.id === element.id) }));navigate(`/details/${element.name.toLowerCase().replace(" ", "-")}`);
                                            }}>Modifier</span>
                                            <span onClick={()=> dispatch(deletePizza(element.id))} style={{color: "#c8102e"}}>Supprimer</span>
                                        </div>
                                    </div>
                                    )}
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
                    <button className={`btnCommander ${prixTotalLivraison >= 15 ? "active" : ""}`} disabled={!(prixTotalLivraison >= 15)} onClick={()=> {navigate("/recapitulatif")}}>
                        <div style={{flexGrow: "0"}}>{pizzas.length}</div>
                        <div style={{flexGrow: "1"}}>Commander</div>
                        <div style={{flexGrow: "0"}}>€{prixTotalLivraison.toFixed(2).replace(".", ",")}</div>
                    </button>
                )}
            </div>
            )}
            <div className='Panier'>
                <div className='PanierAchat'>
                    <h3>Panier d'achat</h3>
                    {show && (
                        <span className='btnAdresse'>Modifier l'adresse</span>
                    )}
                    <div className='PanierArticles'>
                        {pizzas.length > 0 ? (
                            pizzas.map(element => (
                                <div key={element.id} className='panierArticle'>
                                    <div style={{marginBottom: "5px"}}>
                                        <span style={{fontSize: "14px", letterSpacing: "0.5px"}}>{element.name}</span>
                                        <span>€{element.totalPrice.toFixed(2).replace(".", ",")}</span>
                                    </div>

                                    <div style={{ fontSize: "0.9em", color: "#555", display:"flex", flexDirection: "column" }}>
                                      {element.added.length > 0 && (
                                        <p className='panierSupp'><span>Supp:</span> {element.added.map(i => `${i.name} x${i.quantity}`).join(", ")}</p>
                                      )}
                                      {element.removed.length > 0 && (
                                        <p className='panierSans'><span>Sans:</span> {element.removed.map(i => i.name).join(", ")}</p>
                                      )}
                                    </div>
                                    {show && (

                                        <div style={{marginTop: "5px"}}>
                                        <div className='divBtnArticle'>
                                            <span onClick={()=> dispatch(decrementer(element.id))} className='btnArticle moins'>-</span>
                                            <span>{element.quantity}</span>
                                            <span onClick={()=> dispatch(incrementer(element.id))} className='btnArticle'>+</span>
                                        </div>
                                        <div>
                                            <span onClick={() => {
                                                dispatch(loadPizzaForEdit({ pizza: element, index: pizzas.findIndex(p => p.id === element.id) }));navigate(`/details/${element.name.toLowerCase().replace(" ", "-")}`);
                                            }}>Modifier</span>
                                            <span onClick={()=> dispatch(deletePizza(element.id))} style={{color: "#c8102e"}}>Supprimer</span>
                                        </div>
                                    </div>
                                    )}
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
                        <button className={`btnCommander ${prixTotalLivraison >= 15 ? "active" : ""}`} disabled={!(prixTotalLivraison >= 15)} onClick={()=> {navigate("/recapitulatif")}}>
                            <div style={{flexGrow: "0"}}>{pizzas.length}</div>
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
        </>
    )
}
