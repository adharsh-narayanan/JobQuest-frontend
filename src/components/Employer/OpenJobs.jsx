import React, { useContext, useEffect, useState } from 'react'
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
import EditPost from './EditPost';
import { deleteJobApi, getRecruiterJob } from '../../services/Api';
import { addjobContext, editJobContext } from '../../context/contextApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Pagination from 'react-bootstrap/Pagination';


function OpenJobs() {
    const { addjobresponse} = useContext(addjobContext)

    const { editJobResponse } = useContext(editJobContext)
    const [jobs, setJobs] = useState([])
    const [currentPage, setCurrentPage] = useState(1)


    //function to get jobs
    const getJobs = async () => {
        const token = sessionStorage.getItem('token')

        const reqHeader = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
        if (token) {
            const result = await getRecruiterJob(reqHeader)
            // console.log(result.data);
            if (result.status == 200) {
                setJobs(result.data)
            } else {
                console.log(result.response.data);
            }
        }


    }

    //function to delete job
    const deleteJob = async (id) => {
        const token = sessionStorage.getItem('token')
        const reqHeader = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
        const result = await deleteJobApi(id, reqHeader)
        if (result.status = 200) {
            getJobs()

        } else {
            console.log(result.response.data);
        }


    }

    //to get job in viewJob
    useEffect(() => {
        getJobs()
    }, [addjobresponse, editJobResponse])

    //pagination
    const jobsPerPage = 8;
    const lastIndex = currentPage * jobsPerPage;
    const firstIndex = lastIndex - jobsPerPage;
    const data = jobs.slice(firstIndex, lastIndex);
    const page = Math.ceil(jobs.length / jobsPerPage)

    const handlePageChange = (number) => {
        setCurrentPage(number);
    };

    let items = [];
    for (let number = 1; number <= page; number++) {
        items.push(
            <Pagination.Item key={number} active={number === currentPage} onClick={() => handlePageChange(number)}>
                {number}
            </Pagination.Item>,
        );
    }

    return (
        <>
            <div className='container-fluid w-100 rounded' style={{ height: '100dvh' }}>
                <div className='' style={{ backgroundColor: 'white', color: 'black', height: '' }}>
                    <div className='mt-2 p-3'>
                        <h2>Your Jobs</h2>
                    </div>

                    <div className='p-4 border border-secondary'>
                        {jobs?.length > 0 ? <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Job Title</th>
                                    <th scope="col">Job Type</th>
                                    <th scope="col">Job Location</th>
                                    <th scope="col">last date</th>
                                    <th scope="col">Applicants</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data?.map((items, index) => (
                                    <tr>
                                        <th scope="row">{index + 1}</th>
                                        <td>{items.title}</td>
                                        <td>{items.jobType}</td>
                                        <td>{items.location}</td>
                                        <td>{items.lastDate}</td>
                                        <td className=''><Link to={`/applicants/${items._id}`}><div className='btn'><OpenInNewIcon /></div></Link></td>
                                        <td>
                                            <div className='btn me-2'><EditPost job={items} /></div>
                                            <div className='btn me-2' onClick={() => deleteJob(items._id)}><DeleteIcon style={{ fill: 'red' }} /></div>
                                        </td>
                                    </tr>
                                ))

                                }

                            </tbody>
                        </table> :
                            <p className='text-center text-danger'>No Jobs to show</p>}
                    </div>
                </div>

                {/* pagination */}

                <div className='d-flex align-items-center justify-content-center mt-3'>
                    <Pagination>{items}</Pagination>
                </div>

            </div>
            <ToastContainer theme='colored' position='top-center' autoClose={2000} />
        </>
    )
}

export default OpenJobs