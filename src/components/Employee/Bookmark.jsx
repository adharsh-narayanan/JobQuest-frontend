import React, { useContext, useEffect, useState } from 'react'
import Jobcards from '../General/Jobcards'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getSavedJobApi } from '../../services/Api';
import { savedJobContext } from '../../context/contextApi';


import Pagination from 'react-bootstrap/Pagination';

function Bookmark() {
  const {savedJob,setSavedJob} = useContext(savedJobContext)

  const [jobs, setjobs] = useState([])
  const [token, setToken] = useState("")
  const [currentPage, setCurrentPage] = useState(1)



  useEffect(() => {
    if (sessionStorage.getItem('userToken')) {
      setToken(sessionStorage.getItem('userToken'))
    }
    else {
      toast.info('Please login to view jobs')
    }
  }, [])

  useEffect(() => {
    if (token) {
      getSavedJobs()
    }
  }, [token, savedJob])




  const getSavedJobs = async () => {
    const reqHeader = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }

    if (token) {
      const result = await getSavedJobApi(reqHeader)
      if (result.status == 200) {
        setjobs(result.data)
        setSavedJob(false)
      } else {
        console.log(result.response.data);
      }
    }


  }



  //pagination
  const jobsPerPage=6;
  const lastIndex=currentPage*jobsPerPage;
  const firstIndex=lastIndex-jobsPerPage;
  const data=jobs.slice(firstIndex,lastIndex);
  const page=Math.ceil(jobs.length/jobsPerPage)

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
      <div className='container-fluid  rounded' style={{ height: '' }}>
        <div className='m-3' style={{ backgroundColor: 'white', color: 'black', height: '' }}>
          <div className='mt-2 p-3'>
            <h2>Saved Jobs</h2>
          </div>

          {data?.length > 0 ? <div className="row w-100 p-3">
            {data?.map((items) => (
              <div className="col-md-6 col-lg-4 mb-3">
                <Jobcards jobs={items} />
              </div>
            ))
            }
          </div> :
            <p className='text warning text-center p-5'>No Jobs to show</p>
          }

        </div>
      </div>



      {/* pagination */}

      <div className='d-flex align-items-center justify-content-center'> 
        <Pagination>{items}</Pagination>        
      </div>


      <ToastContainer theme='colored' position='top-center' autoClose={2000} />

    </>
  )
}

export default Bookmark