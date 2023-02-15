import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { LocationsList } from "../tickets/Locations"







export const KandySearchList = ({searchTermState}) => {

    const [candies, setProducts] = useState([])
    const [filteredProducts, setFiltered] = useState([])
    const [LocationsList, setLocations] = useState([])

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
            fetch(`http://localhost:8088/locations`)
            .then(res => res.json())
            .then((locationArr) => {
                setLocations(locationArr)
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

    const isAddressArray = (product) => {
        if (Array.isArray(product.productLocations)) {
            return product.productLocations.map((prodlocation) => {
                const locationMatch = LocationsList.find((location) => location.id === prodlocation.locationId)
             return `${locationMatch.name}`}).join(" & ")
        } else {
            const locationName = LocationsList.find((location) => location.id === product.productLocations.locationId)
            return `${locationName.name}`
        }
    }

    return <>
        <h2>Matched Candy</h2>
        {filteredProducts.map(
            (product) => {
                return <section key={product.id} className="product">
                     <header>{product.name}</header>
                            <div>Price: ${product.price}</div>
                            <Link to="" onClick={ () => window.alert(`Available at:\n${isAddressArray(product)}`)}>Show me Where</Link>
                </section>
            }
        )}
    </>
}


