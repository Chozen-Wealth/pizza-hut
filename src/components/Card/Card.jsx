import './Card.css'

export default function Card({pizza}) {
    return(
        <div className='Card'>
            <div className='CardDivImage'>
                <img src={pizza.image} alt="" />
            </div>
            <div className='CardInfos'>
                <h5>{pizza.name}</h5>
                <p>{pizza.description}</p>
                <div className='CardInfosBot'>
                    <div className='CardPrice'>
                        <div>à partir de</div>
                        <span>€{pizza.price.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    </div>
                    <button>+</button>
                </div>
            </div>
        </div>
    )
}
