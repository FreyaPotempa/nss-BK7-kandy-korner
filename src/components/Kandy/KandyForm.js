import { click } from "@testing-library/user-event/dist/click";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const KandyForm = () => {

    const [prodTypes, setProdTypes] = useState([])

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
        .then(() => {
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
                            num.price = e.target.value
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
                </div>
            </fieldset>
            <button type="button"
                onClick={(clickEvent) => saveNewProduct(clickEvent)}
            className="btn btn-primary">Save New Candy</button>
           
        </form>
    )
}