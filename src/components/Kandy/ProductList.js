import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Products.css"

export const ProductList = () => {
    const [products, setProducts] = useState([])
    const [filteredProducts, setFiltered] = useState([])
    const [HighPrice, setHighPriceCandy] = useState(false)
    const navigate = useNavigate()


    useEffect(
        () => {
            fetch(`http://localhost:8088/products?_sort=name&_order=asc&_expand=productType`)
            .then(res => res.json())
            .then((productArray) => {
                setProducts(productArray)
            })
        },
        []
    )

    //use & to join together multiple query string parameters (order is important!)
    //https://github.com/typicode/json-server#sort

    useEffect(
        () => {
            setFiltered(products)
        },
        [products]
    )

    useEffect(
        () => {
            if (HighPrice) {
                const highPriceCandyArray = products.filter(product => product.price > 2)
                setFiltered(highPriceCandyArray)
                } else {
                    setFiltered(products)
                }
            },
        [HighPrice]
    )

    return (
        <>
        <button type="button" onClick={ () => setHighPriceCandy(true) }>Top Priced</button>
        <button type="button" onClick={ () => setHighPriceCandy(false) }>Show All</button>
        <button type="button" onClick={ () => navigate("/KandyForm")}>Create Candy</button>
        <h2>Products</h2>
        <article className="products">
            {
                filteredProducts.map(
                    (product) => {
                        return <section key={product.id} className="product">
                            <header>{product.name}</header>
                            <div>Price: ${product.price}</div>
                            <div>Type: <u>{product.productType.category}</u></div>
                        </section>
                    }
                )
            }
        </article>
        </>
    )

}