import './Nav.css'
import logo from "../../assets/logo.webp"
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function Nav() {

    const navigate = useNavigate()
    const [langue, setLangue] = useState(false)


    return(
        <nav>
            <div>
                <div onClick={()=> navigate("/")}>
                    <img src={logo} alt="" />
                </div>
                <ul>
                    <li>Menus</li>
                    <li>Entrées</li>
                    <li onClick={()=> navigate("/")} className='active'>Pizza</li>
                    <li>Spécialités</li>
                    <li>Boissons</li>
                    <li>Desserts</li>
                </ul>
                <div>
                    <button>Se connecter</button>
                    <span onClick={()=> setLangue(!langue)}>FR<svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m8 10 4 4 4-4"/></svg>
                    {langue && (
                        <span>NL</span>
                    )}</span>
                    
                </div>
            </div>
        </nav>
    )
}
