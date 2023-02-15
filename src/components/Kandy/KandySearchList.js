import { useEffect, useState } from "react"
import { Link } from "react-router-dom"







export const KandySearchList = ({searchTermState}) => {

    const [candies, setProducts] = useState([])
    const [filteredProducts, setFiltered] = useState([])


    useEffect(
        () => {
            fetch(`http://localhost:8088/products?_embed=productLocations`)
            .then(res => res.json())
            .then((productArray) => {
                setProducts(productArray)
            })
        },
        []
    )


    useEffect(
        () => {
            const searchedCandy = candies.filter(candy => { 
            return  candy.name.toLowerCase().includes(searchTermState) && searchTermState.length > 0
            })
            setFiltered(searchedCandy)
        },
        [searchTermState]
    )

    // const isAddressArray = (product) => {
    //     if (Array.isArray(product.productLocations)) {
    //         return product.productLocations.map(
    //             (location) => {
    //                 return `${location.locationId}`
    //             }
    //         )
    //     } else {
    //         console.log(product.productLocation)
    //         return `${product.productLocation.locationId}`
    //     }
    // }

    return <>
        <h2>Matched Candy</h2>
        {filteredProducts.map(
            (product) => {
                return <section key={product.id} className="product">
                     <header>{product.name}</header>
                            <div>Price: ${product.price}</div>
                            <button type="button" onClick={ () => window.alert(`My Location is a stretch goal`)}>SugarRush</button>
                            <Link to={`/locations/`}>Show me Where</Link>
                </section>
            }
        )}
    </>
}


//TRY TO FIGURE OUT STRETCH GOAL HERE. I feel like I need to filter and map again but that seems counterintuitive