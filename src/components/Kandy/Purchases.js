import { useEffect, useState } from "react"


export const Purchases = () => {

    const [purchases, setPurchases] = useState([])
    
    const localKandyUser = localStorage.getItem("kandy_user")
    const localKandyUserObject = JSON.parse(localKandyUser)

    useEffect(
        () => {
            fetch(`http://localhost:8088/purchases?_expand=product&_expand=customer&userId=${localKandyUserObject.id}`)
            .then(res => res.json())
            .then((purchaselist) => {
                setPurchases(purchaselist)
            })
        }, []
    )
    
    return <>
    <article>
            {purchases.map((purchase) => {
                return <section key={purchase.id} className="product">
                <header>{purchase?.product?.name}</header>
                <div>Price: ${purchase?.product?.price}</div>
        </section>
            })}
    </article>
    </>
}