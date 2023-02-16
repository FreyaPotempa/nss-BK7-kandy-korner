import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const CustomerNav = () => {
    const navigate = useNavigate()

    return (
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/kandySearch">Find Candy</Link>
            </li> 
            <li className="navbar__item active">
                <Link className="navbar__link" to="/locations">Locations</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/purchases">Purchases</Link>
            </li>
            <li className="navbar__item navbar__logout">
                <Link className="navbar__link" to="" onClick={() => {
                    localStorage.removeItem("kandy_user")
                    navigate("/", {replace: true})
                }}>Logout</Link>
            </li>
        </ul>
    )
}

//MAKE CANDYSEARCH SO LINK WORKS