import { useEffect, useState } from "react"
import "./Employee.css"

export const EmployeeList = () => {
    const [employees, setEmployees] = useState([])
    const [users, setUsers] = useState([])
    const [user, updateUser] = useState({})
    

    const getAllEmployees = () => {
        fetch(`http://localhost:8088/employees?_expand=user&_expand=location`)
        .then(res => res.json())
        .then((employeeArr) => {
            setEmployees(employeeArr)
        })
    }

    useEffect(
        () => {
            fetch(`http://localhost:8088/users`)
            .then(res => res.json())
            .then((userList) => {
                setUsers(userList)
            })
        }, []
    )

    useEffect(
        () => {
            fetch(`http://localhost:8088/employees?_expand=user&_expand=location`)
            .then(res => res.json())
            .then((staff) => {
                setEmployees(staff)
            })
        },
        []
    )


    const deleteButton = (employee) => {
        const staffUser = users.find(user => user.id === employee.userId)
        staffUser.isStaff = false
    
        return fetch(`http://localhost:8088/users/${staffUser.id}`, {
        method: "PATCH",
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify(staffUser)})
    .then(res => res.json())
    .then( fetch(`http://localhost:8088/employees/${employee.id}`, {
            method: "DELETE"
            }) )
            .then(() => {
                getAllEmployees()
            })
    }

    return (
        <article className="employees">
            {
                employees.map(employee => {
                    return <section key={employee.id} className="employee">
                    <header className="employee__header">{employee?.user?.fullName}</header>
                    <div>{employee?.user?.email}</div>
                    <div>works at: <i>{employee?.location?.name}</i></div>
                    <button type="button"
                    onClick={() => {
                        deleteButton(employee)
                        }}>Fire Employee</button>
                    </section>
                })
            }
        </article>
    
    )
}

