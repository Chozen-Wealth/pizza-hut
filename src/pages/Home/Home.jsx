import Panier from "../../components/Panier/Panier"
import "./Home.css"



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

                </div>

            </div>
            <Panier/>

        </section>
    )
}