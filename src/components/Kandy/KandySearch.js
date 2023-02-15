import "./Products.css"

export const KandySearch = ({ setterFunction }) => {
    return (
        <div>
            <input
                onChange={
                    (changeEvent) => {
                        setterFunction(changeEvent.target.value)
                    }
                }
                type="text" className="candy_search" placeholder="What candy are you looking for?" />
        </div>
    )
}

