import { useNavigate, useParams } from "react-router-dom"
import "./Details.css"
import Panier from "../../components/Panier/Panier"
import data from "../../../catalogue.json"
import allIngredients from "../../../ingredients.json"
import { useContext, useEffect, useState } from "react"
import { selectPizza, setSuppIngredients, addIngredient, removeIngredient, confirmPizza, cancelEdit } from "../../Slices/IngredientsSlice"
import { useDispatch, useSelector } from "react-redux"

export default function Details(){

    const ingredientsPizza = useSelector(state => state.ingredients)


    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {name} = useParams()
    const pizza = data.find(element => element.name.toLowerCase().replace(" ", "-") === name )

    const [close, setClose] = useState(false)
    const [closeSupp, setCloseSupp] = useState(false)
    const [ingredientsLength, setIngredientsLength] = useState(3)

    const [prix, setPrix] = useState(pizza.price)

    const [cacherDetail, setCacherDetail] = useState(true)

    // const autreIngredients = allIngredients.filter(ingredient => !pizza.ingredients.some(pIngredient => pIngredient.name === ingredient.name))
    
    useEffect(()=>{
        if (!ingredientsPizza.editingPizzaIndex && pizza) {
            dispatch(selectPizza(pizza))
            dispatch(setSuppIngredients(allIngredients.filter(ing => !pizza.ingredients.some(pizzaIng => pizzaIng.name === ing.name))))
        }
    },[pizza])


    return(
        <section className="Details">
            <span onClick={()=> {navigate("/");dispatch(cancelEdit())}} className="retour">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z"/></svg>
                Retour
            </span>
            <div className="DetailsGeneral">
                <div className="DetailsPizza">
                    <div className="DetailsDivImage">
                        <img src={pizza.detail} alt="" />
                    </div>
                    <div className="DetailsDivInfos">
                        <div className="DetailsDivInfosTop">
                            <h3 style={{margin: "0px"}}>{pizza.name}</h3>
                            <p style={{fontSize: "12px", color: "gray"}}>{pizza.description}</p>
                            {ingredientsPizza.addedIngredients.length > 0 && (

                                <p style={{fontSize: "12px", color: "gray", margin: "0px"}}><span style={{color: "#70a401"}} >Supp:</span> {ingredientsPizza.addedIngredients.map(element => (element.name + " x"+ element.quantity)).join(", ")}</p>
                            )}
                            {ingredientsPizza.removedIngredients.length > 0 && (

                                <p style={{fontSize: "12px", color: "gray", margin: "0px"}}><span style={{color: "#c8102e"}} >Sans:</span> {ingredientsPizza.removedIngredients.map(element => (element.name)).join(", ")}</p>
                            )}
                        </div>
                        <div className="DetailsDivIngredients">
                            <div className="divAjouts">
                                <div className={`divIngredients ${close ? "closed" : ""}`}>
                                    <h4 className={`divIngredientsTitre`}>Ingrédients <span onClick={()=> setClose(!close)}><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z"/></svg></span></h4>
                                    {ingredientsPizza.baseIngredients.map(element => (
                                        <div key={element.name} className="ingredient">
                                            <div></div>
                                            {/* <img src={element.icon} alt="I" /> */}
                                            <span>{element.name}</span>
                                            <div>
                                                <span className={` ${element.quantity <= 0 ? "btnDisabled": ""}`} onClick={()=> dispatch(removeIngredient(element))}>-</span>
                                                <span>{element.quantity}</span>
                                                <span className={` ${element.quantity >= 2 ? "btnDisabled": ""}`} onClick={()=> dispatch(addIngredient(element))}>+</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className={`divIngredientsSupp ${closeSupp ? "closed" : ""}`}>
                                    <h4 className={`divIngredientsTitre`}>Ingrédients supplémentaire <span onClick={()=> setCloseSupp(!closeSupp)}><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z"/></svg></span></h4>
                                    {ingredientsPizza.allSuppIngredients.slice(0, ingredientsLength).map(element => (
                                        <div key={element.id} className="ingredient">
                                            <div></div>
                                            <span>{element.name} <span>{element.price_display}</span></span>
                                            <div>
                                                <span onClick={()=> dispatch(addIngredient(element))} >+</span>
                                            </div>
                                        </div>
                                    ))}
                                    {ingredientsLength === 3 && (
                                        <span onClick={()=> setIngredientsLength(ingredientsPizza.allSuppIngredients.length)} className="btnShowMore">Show {ingredientsPizza.allSuppIngredients.length} more <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z"/></svg></span>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="DetailsBtnCommander">
                            <button onClick={()=> {dispatch(confirmPizza());navigate("/")}}>{ingredientsPizza.editingPizzaIndex !== null ? "Modifier la pizza" : "Ajouter au panier"} €{ingredientsPizza.totalPrice.toFixed(2).replace(".", ",")}</button>
                        </div>
                    </div>
                </div>
                {!cacherDetail && (
                    <Panier show={false} />
                )}
            </div>
        </section>
    )
}