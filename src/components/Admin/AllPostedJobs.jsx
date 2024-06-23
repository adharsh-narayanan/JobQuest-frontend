import React from 'react'
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';


function AllPostedJobs({ jobs }) {
    return (
        <>
            <div className='container-fluid w-100 rounded' style={{ height: '100dvh' }}>
                <div className='' style={{ backgroundColor: 'white', color: 'black', height: '' }}>
                    <div className='mt-2 p-3'>
                        <h2>Applied Jobs</h2>
                    </div>

                    <div className='p-4 border table-responsive border-secondary'>
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Job Title</th>
                                    <th scope="col">Company</th>
                                    <th scope="col">Place</th>
                                    <th scope="col">last date</th>
                                    <th scope="col">View</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                               { jobs?.map((job,index)=>(
                                <tr>
                                <th scope="row">{index+1}</th>
                                <td>{job.title}</td>
                                <td>{job.recruiterDetails.username}</td>
                                <td>{job.city}</td>
                                <td>{job.lastDate}</td>

                              <Link to={`/view-job/${job._id}`}>  <td className=''><div className='btn'><OpenInNewIcon /></div></td></Link>
                                <td>
                                    <div className='btn me-2'><DeleteIcon style={{ fill: 'red' }} /></div>
                                </td>
                            </tr>
                               ))
                                }

                            </tbody>
                        </table>
                    </div>
                </div>





            </div>
        </>
    )
}

export default AllPostedJobs