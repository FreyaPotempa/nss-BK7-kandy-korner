import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"



export const KandyDetails = () => {
    const {candyId} = useParams()
    const [candy, updateCandy] = useState({})

    useEffect(
        () => {
            fetch(`http://localhost:8088/productLocations?_expand=location&productId=${candyId}`)
                .then(res => res.json())
                .then((data) => {
                    const singleCandy = data[0]
                    updateCandy(singleCandy)
                })
        },
        [candyId]
    )

return <div>{candy.id}</div>




}
