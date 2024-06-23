import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import EditprofileEmployer from './EditprofileEmployer'

function EmployerProfile({adminData}) {
    
    const [data,setData]=useState({})
    useEffect(()=>{
        setData(adminData)
       // console.log(data);

    },[adminData])
     //console.log(adminData);
     
    return (
        <>
             <div className='container-fluid mb-5 pb-5 w-100 shadow rounded' style={{ backgroundColor: 'white', color: 'black' }}>
                <div className='mt-2 p-3 d-flex justify-content-between align-items-center'>
                    <div className='d-flex '>
                        <h2>Company Profile</h2>
                        <div className='p-2 fs-5 ms-3 bg-success text-white rounded'>Verified</div>
                    </div>
                    <div className='p-1 btn'><EditprofileEmployer userData={data} /></div>
                </div>
                <div className='p-4 border shadow border-secondary'>
                    <div className='mb-2'>
                        <div className='row mb-2'>
                            <div className="col-md-6">
                                <div className='mb-2 '>
                                    <h5 className=''>Company Name:</h5>
                                    <h5 style={{ fontSize: '1.1rem' }} className='text-secondary'>{data.username || ''}</h5>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className='mb-2 '>
                                    <h5 className=''>Industry</h5>
                                    <h5 style={{ fontSize: '1.1rem' }} className='text-secondary'>{data.industry || ''}</h5>
                                </div>
                            </div>
                        </div>
                        <div className='row mb-2'>
                            <div className="col-md-6">
                                <div className='mb-2 '>
                                    <h5 className=''>Website</h5>
                                    <h5 style={{ fontSize: '1.1rem' }} className='text-secondary'>
                                        <Link to={data.website || '#'} style={{ textDecoration: 'none' }}>{data.website || ''}</Link>
                                    </h5>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className='mb-2 '>
                                    <h5 className=''>Email:</h5>
                                    <h5 style={{ fontSize: '1.1rem' }} className='text-secondary'>{data.email || ''}</h5>
                                </div>
                            </div>
                        </div>
                        <div className='row mb-2'>
                            <div className="col-md-6">
                                <div className='mb-2 '>
                                    <h5 className=''>Address</h5>
                                    <h5 style={{ fontSize: '1.1rem' }} className='text-secondary'>{data.address || ''}</h5>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className='mb-2 '>
                                    <h5 className=''>Country</h5>
                                    <h5 style={{ fontSize: '1.1rem' }} className='text-secondary'>{data.country || ''}</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='p-4 border shadow border-secondary'>
                    <h2>About Company</h2>
                    <p style={{ textAlign: 'justify' }}>{data.about || ''}</p>
                </div>
            </div>
        
        </>
    )
}

export default EmployerProfile