import { KandySearch } from "./KandySearch"
import { useState } from "react"
import { KandySearchList } from "./KandySearchList"

export const KandyContainer = () => {
    const [searchTerms, setSearchTerms] = useState("")

    return (
        <>
            <KandySearch setterFunction={setSearchTerms} />
            <KandySearchList searchTermState={searchTerms.toLowerCase()} />
        </>
    )
}