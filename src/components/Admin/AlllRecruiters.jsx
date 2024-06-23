import React, { useEffect, useState } from 'react'
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { useDispatch, useSelector } from 'react-redux';
import { eachRecruiter } from '../../redux/slices/recruiterSlice';
import ViewRecruiter from './ViewRecruiter';
import { useNavigate } from 'react-router-dom';

function AlllRecruiters({ recruiters }) {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const ViewRecruiter = (items) => {
        dispatch(eachRecruiter(items))
        navigate(`/SuperAdmin/view-recruiter/${items._id}`)
    }

    return (
        <>
            <div className='container-fluid w-100 rounded' style={{ height: '100dvh' }}>
                <div className='' style={{ backgroundColor: 'white', color: 'black', height: '' }}>
                    <div className='mt-2 p-3'>
                        <h2>Applied Jobs</h2>
                    </div>

                    <div className='p-4 border table-responsive border-secondary'>
                        {recruiters?.length > 0 ? <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Company Name</th>
                                    <th scope="col">Industry</th>
                                    <th scope="col">Website</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">View</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recruiters.map((items, index) => (<tr>
                                    <th scope="row">{index + 1}</th>
                                    <td>{items.username}</td>
                                    <td>{items.industry}</td>
                                    <td>{items.website}</td>
                                    <td className=''><p className='text-danger'>{items.verification ? <span className='text-success'>verified </span>: <span className='text-danger'>Un-verified</span>}</p></td>
                                    <td>
                                        <div className='btn' onClick={() => { ViewRecruiter(items) }}><OpenInNewIcon /></div>
                                    </td>
                                </tr>))}

                            </tbody>
                        </table> :
                            <p className='text-center text-warning'>No Recruiters</p>}
                    </div>
                </div>





            </div>
        </>
    )
}

export default AlllRecruiters