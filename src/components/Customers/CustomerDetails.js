import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import "./Customers.css"



export const CustomerDetails = () => {
    const {customerId} = useParams()
    const[customer, updateCustomer] = useState({
        loyaltyNumber: 0
    })

    useEffect(
        () => {
            fetch(`http://localhost:8088/customers?_expand=user&userId=${customerId}`)
            .then(res => res.json())
            .then((custy) => {
                const singleCustomer = custy[0]
                updateCustomer(singleCustomer)
            })
        },
        [customerId]
    )
    
    const handleSaveButtonClick = () => {
        return fetch(`http://localhost:8088/customers/${customer.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(customer)
        })
        .then(res => res.json())
        .then(() => {
        })
    }


    return <section className="customer">
        <header className="customer__header">{customer?.user?.fullName}</header>
        <div>Email: {customer?.user?.email}</div>
        <label htmlFor="loyalty-number">Loyalty Number:</label>
        <input
            required autoFocus
            type="number"
            className="form-control"
            value={customer.loyaltyNumber}
            onChange={
                (evt) => {
                    const num = {...customer}
                    num.loyaltyNumber = evt.target.value
                    updateCustomer(num)
                }
            } />
            <button type="button"
            onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}>Update</button>
    </section>

}