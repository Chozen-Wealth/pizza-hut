import { useNavigate, useParams } from "react-router-dom"
import "./Details.css"
import Panier from "../../components/Panier/Panier"
import data from "../../../catalogue.json"
import allIngredients from "../../../ingredients.json"
import { useContext, useState } from "react"



export default function Details(){

    const navigate = useNavigate()

    const {name} = useParams()

    const pizza = data.find(element => element.name.toLowerCase().replace(" ", "-") === name )
    const [close, setClose] = useState(false)
    const [closeSupp, setCloseSupp] = useState(false)

    const [ingredientsLength, setIngredientsLength] = useState(3)


    return(
        <section className="Details">
            <span onClick={()=> navigate("/")} className="retour">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z"/></svg>
                Retour
            </span>
            <div className="DetailsGeneral">
                <div className="DetailsPizza">
                    <div className="DetailsDivImage">
                        <img src={pizza.detail} alt="" />
                    </div>
                    <div className="DetailsDivInfos">
                        <h3 style={{margin: "0px"}}>{pizza.name}</h3>
                        <p style={{fontSize: "12px", color: "gray"}}>{pizza.description}</p>
                        <div className="DetailsDivIngredients">
                            <div className="divAjouts">
                                <div className={`divIngredients ${close ? "closed" : ""}`}>
                                    <h4 className={`divIngredientsTitre`}>Ingrédients <span onClick={()=> setClose(!close)}><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z"/></svg></span></h4>
                                    {pizza.ingredients.map(element => (
                                        <div key={element.name} className="ingredient">
                                            <div></div>
                                            {/* <img src={element.icon} alt="I" /> */}
                                            <span>{element.name}</span>
                                            <div>
                                                <span>-</span>
                                                <span>1</span>
                                                <span>+</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className={`divIngredientsSupp ${closeSupp ? "closed" : ""}`}>
                                    <h4 className={`divIngredientsTitre`}>Ingrédients supplémentaire <span onClick={()=> setCloseSupp(!closeSupp)}><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z"/></svg></span></h4>
                                    {allIngredients.slice(0, ingredientsLength).map(element => (
                                        <div key={element.id} className="ingredient">
                                            <div></div>
                                            <span>{element.name} <span>{element.price_display}</span></span>
                                            <div>
                                                <span>+</span>
                                            </div>
                                        </div>
                                    ))}
                                    {ingredientsLength === 3 && (
                                        <span onClick={()=> setIngredientsLength(allIngredients.length)} className="btnShowMore">Show 26 more <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z"/></svg></span>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="DetailsBtnCommander">
                            <button>Ajouter au panier €{pizza.price.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</button>
                        </div>
                    </div>
                </div>
                <Panier/>
            </div>
        </section>
    )
}