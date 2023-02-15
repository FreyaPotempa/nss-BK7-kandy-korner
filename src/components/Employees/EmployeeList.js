import { useEffect, useState } from "react"


export const EmployeeList = () => {
    const [employees, setEmployees] = useState([])

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


    return (
        <article className="employees">
            {
                employees.map(employee => {
                    return <section key={employee.id}>
                    <header>{employee?.user?.fullName}</header>
                    <div>{employee?.user?.email}</div>
                    <div>{employee?.location?.name}</div>
                    </section>
                })
            }
        </article>
    
    )
}

