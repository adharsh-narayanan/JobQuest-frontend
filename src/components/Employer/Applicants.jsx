import React, { useEffect, useState } from 'react'
import ApplicantCards from '../General/ApplicantCards'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useParams } from 'react-router-dom'
import { baseUrl } from '../../services/baseUrl'
import { toast } from 'react-toastify'
import AdminHeader from './AdminHeader'
import Pagination from 'react-bootstrap/Pagination';
import { getAJobApi, getCandidatesApi } from '../../services/Api'
import { faBookmark,  faClock,  faIndianRupee, faLocationDot, faSuitcase } from '@fortawesome/free-solid-svg-icons';
faClock

function Applicants() {
    const [jobData, setJobData] = useState([])
    const [candidates, setCandidates] = useState([])
    const [token, setToken] = useState("")
    const [currentPage, setCurrentPage] = useState(1)

    //console.log(jobData);

    const { id } = useParams()





    //to get a job

    useEffect(() => {
        getAJob(id)
    }, [id])

    useEffect(() => {
        if (sessionStorage.getItem('token')) {
            setToken(sessionStorage.getItem('token'))
        }
        getApplicants(id)
    }, [token])

    const getAJob = async (id) => {
        const result = await getAJobApi(id)
        // console.log(result);
        if (result.status == 200) {
            setJobData(result.data)
        } else {
            console.log(result.response.data);
        }
    }

    //to get applicant list
    const getApplicants = async (id) => {
        const reqHeader = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }

        if (token) {
            const result = await getCandidatesApi(id, reqHeader)
           // console.log(result);
           setCandidates(result.data.applicants)
        }

    }
        //console.log(candidates);
      //pagination
  const jobsPerPage = 6;
  const lastIndex = currentPage * jobsPerPage;
  const firstIndex = lastIndex - jobsPerPage;
  const data = candidates.slice(firstIndex, lastIndex);
  const page = Math.ceil(candidates.length / jobsPerPage)

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
               <AdminHeader/>

            <div style={{ background: '#E8F6F3', minHeight: '100dvh' }}>
                {jobData?.map((job) => (<div className='w-100 p-5 text-center' style={{ backgroundColor: '#D5F5E3' }}>
                    <img className='mb-2 ' src={job.recruiterDetails.companyImage ? `${baseUrl}/uploads/${job.recruiterDetails.companyImage}` : ""} width={'100px'} alt="" />
                    <h1 className='mb-2' style={{ fontWeight: '800', color: '' }}>{job.title}</h1>
                    <h4>{job.recruiterDetails.username}</h4>
    
                    <div className='px-5 d-flex justify-content-center align-items-center mt-3'>
                        {job.salary ? <h6 className='col-md-3  me-2'> <FontAwesomeIcon className='me-2' icon={faIndianRupee} />{job.salary}</h6> : ""}
                        <h6 className='col-md-2 me-2'> <FontAwesomeIcon className='me-2' icon={faSuitcase} />{job.experience}</h6>
                        <h6 className='col-md-2  me-2'><FontAwesomeIcon className='me-2' icon={faClock} />{job.jobType}</h6>
                        <p className='col-md-2  me-2'> <FontAwesomeIcon className='me-2' icon={faLocationDot} />{job.city}</p>
                    </div>
    
    
                </div>))}
    
                {candidates?.length > 0 ?
                    <div>
                        <h1 className='mb-2 text-center' style={{ fontWeight: '800', color: '' }}>Applicants</h1>
    
                        <div className='container-fluid'>
    
                            <div className='row'>
    
                                {data?.map((profile) => (
                                    <div className="col-md-4 ">
                                        <ApplicantCards candidate={profile} />
                                    </div>
                                ))
                                }
                            </div>
                        </div>
                    </div> :
                    <p className='text-center text-danger p-5'>No Applicants</p>
                }

                {/* pagination */}

                <div className='d-flex align-items-center justify-content-center mt-3'>
                    <Pagination>{items}</Pagination>
                </div>

            </div>
       </>
    )
}

export default Applicants