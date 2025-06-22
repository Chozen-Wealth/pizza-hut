import { useDispatch, useSelector } from "react-redux"
import "./Recap.css"
import { useNavigate } from "react-router-dom"
import { clearCart } from "../../Slices/IngredientsSlice"
import { useState } from "react"



export default function Recap(){

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const pizzas = useSelector(state => state.ingredients.cart)

    const livraison = 1.99
    const prixTotal = pizzas.reduce((sum, pizza) => sum + pizza.totalPrice, 0)
    const prixTotalLivraison = prixTotal + (prixTotal >= 15 ? livraison : 0)

    const [input, setInput] = useState("")
    const [promo, setPromo] = useState(false)

    const HandleClick = ()=> {
        if (input === "PIZZA50") {
            setPromo(true)
            setInput("")
        }
    }

    return(
        <section className="Recap">
            <div className="fiche">
            <div onClick={()=> navigate("/")} className="retour ficheDivRetour">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z"/></svg>
                Retour</div>
                <h1>Récapitulatif de la commande</h1>
                <div className="ficheDivPizzas">
                    {pizzas.map(element => (
                        <div key={element.id} className="ficheDivPizza">
                            <div>
                                <span>{element.name} x{element.quantity}</span>
                                <span>€ {element.totalPrice.toFixed(2).replace(".",",")}</span>
                            </div>
                            <div>
                                {element.added.length > 0 && (

                                    <p><span style={{color: "#70a401"}}>Supp :</span> {element.added.map(i => i.name + " x" + i.quantity)}</p>
                                )}
                                {element.removed.length > 0 && (

                                    <p><span style={{color: "#c8102e"}}>Sans :</span> {element.removed.map(i => i.name)}</p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="ficheDivPromo">
                    <span className="infosPromoDiv">Code à essayer : PIZZA50</span>
                    <i className="infosPromo">i</i>
                    <input value={input} onChange={(e)=> setInput(e.target.value)} type="text" placeholder="Entrez votre code promo" />
                    <button onClick={HandleClick} >Valider le code</button>
                </div>
                <div className="ficheDivTotal">
                    <div>
                        <span>Livraison : </span>
                        <span>€ {livraison.toFixed(2).replace(".",",")}</span>
                    </div>
                    {promo && (
                        <div>
                            <span style={{color: "#70a401"}}>- Promotion appliquée ! (PIZZA50)</span>
                            <span  style={{color: "#70a401"}}>(-50%)</span>
                        </div>
                    )}
                    <div>
                        <span>Total : </span>
                        <span>{promo ? (<span style={{fontSize: "18px"}}><span style={{fontSize: "16px", textDecoration: "line-through", color: "gray"}}>€ {prixTotalLivraison.toFixed(2).replace(".",",")}</span> € {(prixTotalLivraison / 2).toFixed(2).replace(".",",")}</span>) : prixTotalLivraison.toFixed(2).replace(".",",")}</span>
                    </div>
                </div>
                <div className="ficheDivBtns">
                    <button onClick={()=> {navigate("/confirmation");dispatch(clearCart())}}>Finaliser la commande</button>
                </div>
            </div>
        </section>
    )
}