import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"





export const EmployeeHire = () => {
    const [locations, setLocations] = useState([])

    useEffect(
        () => {
            fetch(`http://localhost:8088/locations`)
            .then(res => res.json())
            .then((locationArr) => {
                setLocations(locationArr)
            })
        }
    )

        const [employee, update] = useState({
            startDate: "",
            payRate: "",
            locationId: "",
            userId: ""

        })

        const navigate = useNavigate()
        const newEmployee = localStorage.getItem("kandy_user")
        const newEmployeeObject = JSON.parse(newEmployee)

        const saveNewEmployee = (event) => {

            const employeeToSendToAPI = {
                startDate: employee.startDate,
                payRate: employee.payRate,
                locationId: employee.locationId,
                userId: newEmployeeObject.id
            }

            return fetch(`http://localhost:8088/employees`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(employeeToSendToAPI)
            })
                .then(res => res.json())
                .then(() => {
                    navigate("/employees")
                })
        }


    return <>
    <header>Work for us until your teeth rot out</header>
    <div>Fill out the following:</div>

    <form className="employee_hire_form">
            <h2 className="hire_title">New Employee</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="start-date">Start Date:</label>
                    <input
                    required autoFocus
                    type="date"
                    className="form-date"
                    placeholder="start date"
                    value={employee.startDate}
                    onChange={
                        (e) => {
                            const copy = {...employee}
                            copy.startDate = e.target.value
                            update(copy)
                        }
                    } />
                    <label htmlFor="pay-rate">Pay Rate:</label>
                    <input
                    required autoFocus
                    type="number"
                    className="form-pay"
                    value={employee.payRate}
                    onChange={
                        (e) => {
                            const num = {...employee}
                            num.payRate = e.target.value
                            update(num)
                        }
                    } />
                    <label htmlFor="location">Location:</label>
                    <select
                    required autoFocus
                    type="location"
                    className="form-location"
                    value={employee.locationId}
                    onChange={
                        (e) => {
                            const num = {...employee}
                            num.locationId = parseInt(e.target.value)
                            update(num)
                        }
                    }
                    >
                        <option value="0">Choose</option>
                        {locations.map((location) => <option value={location.id}>{location.name}</option>)}
                    </select>
                </div>
            </fieldset>
            <button type="button"
                onClick={(clickEvent) => saveNewEmployee(clickEvent)}
            className="btn btn-primary">Save New Employee</button>
           
        </form>
</>
}