import React, { useEffect, useState } from 'react'
import UserHeader from '../components/Employee/UserHeader'
import Jobcards from '../components/General/Jobcards'
import { getAllCandidatesApi, getAllJobsApi } from '../services/Api'
import {ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Pagination from 'react-bootstrap/Pagination';
import AdminHeader from '../components/Employer/AdminHeader'
import ApplicantCards from '../components/General/ApplicantCards';

function AllCandidates() {
    const [candidates, setCandidates] = useState([])
    // console.log(jobs);
    const [token, setToken] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
  
  
    
  
   
  

  
  
  
  
    useEffect(() => {
      if (sessionStorage.getItem("token")) {
        setToken(sessionStorage.getItem("token"))
      } else {
        toast.info('Please login to view jobs')
      }
  
    }, [])
  
    useEffect(() => {
      if (token) {
        getAllCandidates()
      }
    }, [token])

    const getAllCandidates=async()=>{
        const reqHeader = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
          if(token){
            const result=await getAllCandidatesApi(reqHeader)
            if(result.status==200){
                setCandidates(result.data)
                //console.log(result.data);
            }else{
                console.log(result.response.data);
                toast.error("couldn't fetch candidates")
            }
          }
          else {
            toast.info('Please login to view all candidates')
      
          }
    }
  
   
  
    

  
  
    //pagination
    const jobsPerPage = 8;
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
    <AdminHeader />
    <div style={{ background: '#E8F6F3', minHeight: '100dvh' }}>
      <div className='w-100 p-5 text-center' style={{ backgroundColor: '#D5F5E3' }}>
        <h1 className='mb-2' style={{ fontWeight: '800', color: '' }}>All Candidates</h1>

      </div>

     

      <div>
        {candidates?.length > 0 ? <div className="row container-fluid">
          {data?.map((items) => <div className="col-md-4 col-sm-12 col-lg-4 mb-3 ">
            <ApplicantCards candidate={items}/>
          </div>)}

        </div> :
          <p className='text warning text-center'>No Jobs to show</p>}
      </div>

    </div>


    {/* pagination */}

    <div className='d-flex align-items-center justify-content-center mt-3'>
      <Pagination>{items}</Pagination>
    </div>


    <ToastContainer theme='colored' position='top-center' autoClose={2000} />

  </>  )
}

export default AllCandidates