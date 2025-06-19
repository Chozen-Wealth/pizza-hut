import { useNavigate, useParams } from "react-router-dom"
import "./Details.css"
import Panier from "../../components/Panier/Panier"
import data from "../../../catalogue.json"



export default function Details(){

    const navigate = useNavigate()

    const {name} = useParams()

    const pizza = data.find(element => element.name.toLowerCase().replace(" ", "-") === name )

    return(
        <section className="Details">
            <span onClick={()=> navigate("/")} className="retour">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z"/></svg>
                Retour
            </span>
            <div className="DetailsGeneral">
                <div className="DetailsPizza">
                    <div className="DetailsDivImage">
                        <img src={pizza.image} alt="" />
                    </div>
                    <div className="DetailsDivInfos">
                        <h3 style={{margin: "0px"}}>{pizza.name}</h3>
                        <p style={{fontSize: "12px", color: "gray"}}>{pizza.description}</p>
                        <div className="divIngredients">
                            <h4 style={{margin: "0px", marginBottom: "10px"}}>Ingrédients</h4>
                            {pizza.ingredients.map(element => (
                                <div className="ingredient">
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
                        <div className="divIngredientsSupp">
                            <h4 style={{margin: "0px"}}>Ingrédients supplémentaire</h4>

                        </div>
                    </div>
                </div>
                <Panier/>
            </div>
        </section>
    )
}