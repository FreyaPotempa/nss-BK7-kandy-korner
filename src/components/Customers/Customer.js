import { Link } from "react-router-dom"
import "./Customers.css"


export const Customer = ({ id, fullName, email, totalQuantities }) => {
    return <section className="customer">
        <div>
            <Link to={`/customers/${id}`}>Name: {fullName}</Link>
            <div>Email: {email}</div>
            <div>Total Purchases: {totalQuantities}</div>
        </div>
    </section>
}
