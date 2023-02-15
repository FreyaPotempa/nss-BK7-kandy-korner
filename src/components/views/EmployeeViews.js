import { Outlet, Route, Routes } from "react-router-dom"
import { LocationsList } from "../tickets/Locations"
import { ProductList } from "../Kandy/ProductList"
import { KandyForm } from "../Kandy/KandyForm"
import { EmployeeList } from "../Employees/EmployeeList"


export const EmployeeViews = () => {
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
		<Route path="products" element={ <ProductList /> } />
        <Route path="employees" element={ <EmployeeList /> } />
		<Route path="kandyform" element={ <KandyForm /> } />

	</Route>


	</Routes>
	</>
}