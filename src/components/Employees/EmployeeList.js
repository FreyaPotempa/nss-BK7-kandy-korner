import { useEffect, useState } from "react"


export const EmployeeList = () => {
    const [employees, setEmployees] = useState([])

    useEffect(
        () => {
            fetch(`http://localhost:8088/users?isStaff=true`)
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
                    <header>{employee.fullName}</header>
                    <div>{employee.email}</div>
                    </section>
                })
            }
        </article>
    
    )
}

//START HERE
//https://github.com/nashville-software-school/client-side-mastery/blob/master/book-7-honey-rae-repairs/chapters/KK_EMPLOYEES.md