import Panier from "../../components/Panier/Panier"
import "./Home.css"
import data from "../../../catalogue.json"
import Card from "../../components/Card/Card"


export default function Home(){



    return(
        <section className="Home">
            <div className="divPizzas">
                <div className="PizzasTitre">
                    <div></div>
                    <span>Pizza</span>
                    <div></div>
                </div>
                <div className="Pizzas">
                    {data.map(element => (
                        <Card key={element.name} pizza={element} />
                    ))}
                </div>

            </div>
            <Panier show={true}/>

        </section>
    )
}