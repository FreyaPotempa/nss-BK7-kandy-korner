import { useEffect, useState } from "react"


export const Purchases = () => {

    const [purchases, setPurchases] = useState([])
    const [purchaseQuantity, setQuantity] = useState([])
    
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
        //trying to create a new array that is a set of productIds but it won't add amount
        //I think that's because it's adding to the purchase but not the one that's in the new array
        useEffect( 
            () => {
                let newArray = []
                purchases.forEach(purchase => {
                    if (newArray.find(newArr => newArr.productId === purchase.productId)) {
                         purchase.amount ++
                    } else {
                        newArray.push(purchase)
                    }
                })
                console.log(newArray)
                setQuantity(newArray)
            },[purchases]
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