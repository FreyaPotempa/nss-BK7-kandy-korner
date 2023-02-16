import { Outlet, Route, Routes } from "react-router-dom"
import { LocationsList } from "../tickets/Locations"
import { KandySearch } from "../Kandy/KandySearch"
import { KandyContainer } from "../Kandy/KandyContainer"
import { Purchases } from "../Kandy/Purchases"


export const CustomerViews = () => {
	return <>
	<Routes>
	<Route path="/" element={
		<>
			<h1>Kandy Korner</h1>
			<div>Buy our candy. Consume!</div>
			<Outlet />
		</>
	}>
		<Route path="locations" element={ <LocationsList /> } />
		<Route path="kandySearch" element={ <KandyContainer /> } />
		<Route path="purchases" element={ <Purchases /> } />


	</Route>


	</Routes>
	</>
}