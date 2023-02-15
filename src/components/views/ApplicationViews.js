import { CustomerViews } from "./CustomerViews"
import { EmployeeViews } from "./EmployeeViews"


export const ApplicationViews = () => {
	
	const localKandyUser = localStorage.getItem("kandy_user")
    const kandyUserObject = JSON.parse(localKandyUser)

    if (kandyUserObject.staff) {
        return <EmployeeViews />
    } else {
        return <CustomerViews />
    }

}