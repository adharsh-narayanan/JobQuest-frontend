import React, { useEffect, useState } from 'react'
import UserHeader from '../components/Employee/UserHeader'
import Jobcards from '../components/General/Jobcards'
import { getAllJobsApi } from '../services/Api'
import {ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Pagination from 'react-bootstrap/Pagination';


function AllJobs() {


  const [jobs, setjobs] = useState([])
  // console.log(jobs);
  const [token, setToken] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const[reset,setReset]=useState(false)


  //search key
  const [searchKey, setSearchKey] = useState({
    search: "",
    category: "",
    jobType: "",
    location: "",
    experience: ""
  })

  // console.log(searchKey);
  //const search = Object.values(searchKey).join('');

  const search = new URLSearchParams(searchKey).toString();
  //console.log(search);




  useEffect(() => {
    if (sessionStorage.getItem("userToken")) {
      setToken(sessionStorage.getItem("userToken"))
    } else {
      toast.info('Please login to view jobs')
    }

  }, [])

  useEffect(() => {
    if (token) {
      getAlljobs()
    }
    setReset(false)

  }, [token,reset])

  const getAlljobs = async () => {

    const reqHeader = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }

    if (token) {
      const result = await getAllJobsApi(search, reqHeader)
      // console.log(result.data);
      if (result.status == 200) {
        setjobs(result.data)
      } else {
        console.log(result.response);
      }
    } else {
      toast.info('Please login to view jobs')

    }

  }

  //to search

  const handleSearch = async (e) => {
    e.preventDefault()

    const reqHeader = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }

    if (token) {
      const result = await getAllJobsApi(search, reqHeader)
      // console.log(result.data);
      if (result.status == 200) {
        setjobs(result.data)
      } else {
        console.log(result.response);
      }
    } else {
    }


  }

  //to reset
  const handleReset=()=>{
    setSearchKey({
      search: "",
      category: "",
      jobType: "",
      location: "",
      experience: ""
    })
    setReset(true)
    
  }


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
      <UserHeader />
      <div style={{ background: '#E8F6F3', minHeight: '100dvh' }}>
        <div className='w-100 p-5 text-center' style={{ backgroundColor: '#D5F5E3' }}>
          <h1 className='mb-2' style={{ fontWeight: '800', color: '' }}>All Jobs</h1>

        </div>

        <div className='container-fluid d-flex align-items-center justify-content-center flex-column'>
          {/* ----------------------------------------------------------------------------------------------------------------------------------------- */}

          <div className='p-4 row mb-2'>
            <div className="col-md-3 mb-2">
              <input className='form-control outline-info' type="text" placeholder='job,company name, city name' onChange={(e) => setSearchKey({ ...searchKey, search: e.target.value })} />
            </div>

            {/* ----------------------------------------------------------------------------------------------------------------------------------------- */}
            <div className="col-md-2 mb-2">
              <select className='form-control outline-info' type="text" placeholder='Location' onChange={(e) => setSearchKey({ ...searchKey, location: e.target.value })}>
                <option disabled selected value="">Job Site</option>
                <option value="onsite">onsite</option>
                <option value="remote">remote</option>
                <option value="hybrid">hybrid</option>
              </select>
            </div>
            {/* ----------------------------------------------------------------------------------------------------------------------------------------- */}
            <div className="col-md-2 mb-2">
              <select className='form-control outline-info' type="text" placeholder='type' onChange={(e) => setSearchKey({ ...searchKey, jobType: e.target.value })}>
                <option disabled selected value="">Job Type</option>
                <option value="Full-time">Full time</option>
                <option value="Part-time">Part time</option>
                <option value="Internship">Internship</option>
                <option value="Freelance">Freelance</option>
                <option value="Temporary">Temporary</option>
              </select>
            </div>
            {/* ----------------------------------------------------------------------------------------------------------------------------------------- */}
            <div className="col-md-2 mb-2">
              <select className='form-control outline-info' type="text" placeholder='experince' onChange={(e) => setSearchKey({ ...searchKey, experience: e.target.value })}>
                <option disabled selected value="">Experience</option>
                <option value="fresher">Fresher</option>
                <option value="1-year">1 year</option>
                <option value="2-year">2 year</option>
                <option value="3-year or more">3 year or more  </option>
              </select>
            </div>
            {/* ----------------------------------------------------------------------------------------------------------------------------------------- */}
            <div className="col-md-2 mb-2">
              <select className='form-control outline-info' type="text" placeholder='category' onChange={(e) => setSearchKey({ ...searchKey, category: e.target.value })}>
                <option value="" disabled selected>Category</option>
                <option value="information-technology">Information Technology</option>
                <option value="healthcare">Healthcare</option>
                <option value="finance-accounting">Finance and Accounting</option>
                <option value="engineering">Engineering</option>
                <option value="sales-marketing">Sales and Marketing</option>
                <option value="education-training">Education and Training</option>
                <option value="human-resources">Human Resources</option>
                <option value="customer-service">Customer Service</option>
                <option value="creative-design">Creative and Design</option>
                <option value="administration-office-support">Administration and Office Support</option>
                <option value="manufacturing-production">Manufacturing and Production</option>
                <option value="logistics-transportation">Logistics and Transportation</option>
                <option value="hospitality-tourism">Hospitality and Tourism</option>
                <option value="legal">Legal</option>
                <option value="real-estate">Real Estate</option>
                <option value="science-research">Science and Research</option>
                <option value="arts-entertainment">Arts and Entertainment</option>
                <option value="public-relations">Public Relations</option>
                <option value="non-profit-social-services">Non-Profit and Social Services</option>
                <option value="skilled-trades">Skilled Trades</option>
              </select>
            </div>
            {/* ----------------------------------------------------------------------------------------------------------------------------------------- */}
            <div className="">
              <div className='btn btn-dark' onClick={(e) => handleSearch(e)}>  Find Jobs</div>
              <div className='btn btn-warning ms-2' onClick={ handleReset}>  Reset</div>

            </div>

          </div>
          {/* ----------------------------------------------------------------------------------------------------------------------------------------- */}
          <div className='d-flex row container mb-2'>
            <div className='col-md-1'></div>
            <div className=' col-md-4 mb-2'>
              <h2 className='fw-bold fs-3'>{jobs.length} jobs</h2>
            </div >

            {/*   <div className=' col-md-4 mb-2  d-flex '>

              <select className='form-control' name="" id="">
                <option selected value="">Most Recent</option>
              </select>
              <div className='btn ms-2 bg-info'>Sort</div>

            </div> */}

            <div className='col-md-2'></div>
            <div>

            </div>

          </div>



        </div>
        {/* ----------------------------------------------------------------------------------------------------------------------------------------- */}

        <div>
          {jobs?.length > 0 ? <div className="row container-fluid">
            {data?.map((items) => <div className="col-md-4 col-sm-12 col-lg-3 mb-3 ">
              <Jobcards jobs={items} />
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

    </>
  )
}

export default AllJobs