import { useEffect, useState } from "react"
import "./Locations.css"

export const LocationsList = () => {
    const [locations, setLocations] = useState([])


    useEffect(
        () => {
            fetch(`http://localhost:8088/locations`)
                .then(res => res.json())
                .then((locationArray) => {
                    setLocations(locationArray)
                })
        },
        []
    )

return (
    <>
    <h2>List of Locations</h2>
            <article className="locations">
                {
                    locations.map(
                        (location) => {
                            return <section key={location.id} className="location">
                                <header>{location.name}</header>
                                <div>Address: {location.address}</div>
                                <div>Size: {location.sqFootage} square feet</div>

                            </section>
                        }
                    )
                }
            </article>
            </>
)

}