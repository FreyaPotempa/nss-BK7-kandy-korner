import { useEffect, useState } from "react"
import { Customer } from "./Customer"
import "./Customers.css"


export const CustomerList = () => {
    const [customers, setCustomers] = useState([])
    const [purchases, setPurchases] = useState([])
    const [customersByPurchase, updateCustomersByPurchase] = useState([])


    useEffect(
        () => {
            fetch(`http://localhost:8088/customers?_expand=user`)
            .then(res => res.json())
            .then((custies) => {
                setCustomers(custies)
            })
        },
        []
    )

    useEffect(
        () => {
            fetch(`http://localhost:8088/purchases`)
                .then(res => res.json())
                .then((purchaseArr) => {
                    setPurchases(purchaseArr)
                })
        }, []
    )

    //implementing Neil's .reduce() method
    useEffect(
        () => {
            fetch(`http://localhost:8088/customers?_embed=purchases&_expand=user`)
                .then(res => res.json())    
                .then(data => {
                    data.map(customer => {
                   const totalQuantities = customer.purchases.reduce((acc, purchase) => acc + purchase.amount, 0)
                   customer.totalQuantities = totalQuantities
                })
                updateCustomersByPurchase(data)
            })
        }, []
    )

    return (
        <article className="customers">
            {customersByPurchase
            .sort((a, b) => a.totalQuantities < b.totalQuantities ? 1 : -1)
            .map(customer => <Customer key={`customer--${customer.id}`}
            id={customer?.user?.id}
            fullName={customer?.user?.fullName}
            email={customer?.user?.email}
            totalQuantities={customer.totalQuantities}

            />)}
        </article>
    )
}


//got sort to work on .id but not on this purchase history...
