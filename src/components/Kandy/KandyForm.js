import { click } from "@testing-library/user-event/dist/click";
import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const KandyForm = () => {

    const [prodTypes, setProdTypes] = useState([])
    const [products, setProducts] = useState([])
    const [locations, setLocations] = useState([])
    const [newLocationIds, setNewLocationsIds] = useState([])

    useEffect(
        () => {
            fetch('')
            .then(res => res.json())
            .then((data) => {
                setProducts(data)
            })
        }, []
    )

    useEffect(
        () => {
            fetch(`http://localhost:8088/locations`)
                .then(res => res.json())
                .then((data) => {
                    setLocations(data)
                })
        }, []
    )

    useEffect(
        () => {
            fetch(`http://localhost:8088/productTypes`)
            .then(res => res.json())
            .then((data) => {
                setProdTypes(data)
            })
        },
        []
    )
    
 
    const [product, update] = useState({
        name: "",
        price: "",
        productTypeId: ""
    })

    const navigate = useNavigate()

    const saveNewProduct = (event) => {

        const productToSendToAPI = {
            name: product.name,
            price: product.price,
            productTypeId: product.productTypeId
        }

    return fetch(`http://localhost:8088/products`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(productToSendToAPI)
    })
        .then(res => res.json())
        .then((res) => {
            const productId = res.id
            const prodLocations = newLocationIds

            for (const newProdLocation of prodLocations) {
                const newProductLocationToAPI = {
                    productId: productId,
                    locationId: newProdLocation
                }
                fetch(`http://localhost:8088/productLocations`,{
                    method: 'POST', 
                    headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newProductLocationToAPI)})
                .then(res => res.json())
                .then(() => {

                })
            }

            navigate("/products")
        })
    }


    return (
        <form className="kandyform">
            <h2 className="kandyForm_title">New Kandy</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                    required autoFocus
                    type="text"
                    className="form-name"
                    placeholder="new candy name"
                    value={product.name}
                    onChange={
                        (e) => {
                            const copy = {...product}
                            copy.name = e.target.value
                            update(copy)
                        }
                    } />
                    <label htmlFor="price">Price:</label>
                    <input
                    required autoFocus
                    type="number"
                    className="form-price"
                    value={product.price}
                    onChange={
                        (e) => {
                            const num = {...product}
                            num.price = parseInt(e.target.value)
                            update(num)
                        }
                    } />
                    <label htmlFor="type">Type:</label>
                    <select
                    required autoFocus
                    type="type"
                    className="form-type"
                    value={product.productTypeId}
                    onChange={
                        (e) => {
                            const num = {...product}
                            num.productTypeId = parseInt(e.target.value)
                            update(num)
                        }
                    }
                    >
                        <option value="0">Choose</option>
                        {prodTypes.map((prodType) => <option key={prodType.id} value={prodType.id}>{prodType.category}</option>)}
                    </select>
                    <div className="locations">
                        <label htmlFor="location">Available at:</label>
                        {locations.map((location) => <Fragment key={location.id}><input 
                        type="checkbox" 
                        value={location.id}
                        onChange={
                        (e) => {
                            const copy = [...newLocationIds]
                            if ( !copy.includes(parseInt(e.target.value))) {
                            copy.push(parseInt(e.target.value)) 
                            setNewLocationsIds(copy)
                            } else {
                                const copyLocations = copy.filter(copyLocation => copyLocation !== parseInt(e.target.value))
                                setNewLocationsIds(copyLocations) 
                            }

                            // if (copy.includes(parseInt(e.target.value))) {
                                
                            // }
                        }
        
                        } />{location.name}</Fragment>)}
                    </div>
                </div>
            </fieldset>
            <button type="button"
                onClick={(clickEvent) => saveNewProduct(clickEvent)}
            className="btn btn-primary">Save New Candy</button>
           
        </form>
    )
}