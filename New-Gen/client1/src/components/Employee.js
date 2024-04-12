import React from 'react'
import { useNavigate } from 'react-router-dom'

function Employee({employee}){
    const navigate = useNavigate();
return(
<div className='card p-2 cursor-pointer' onClick={()=>navigate(`/book-appointment/${employee._id}`)}>
    <h1 className='card-title'>{employee.firstName +" "+employee.lastName}</h1><hr></hr>
    <p className='card-text'><b>Phone Number : </b>{employee.phone}</p>
    <p className='card-text'><b>Email : </b>{employee.email}</p>
    <p className='card-text'><b>Job Role : </b>{employee.jobRole}</p>

</div>

)
}

export default Employee