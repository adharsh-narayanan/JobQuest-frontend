import React, { useContext, useEffect, useState } from 'react'
import UserHeader from './UserHeader'
import { faCalendar, faCalendarDay, faClock, faIndianRupee, faLocationDot, faSuitcase, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { baseUrl } from '../../services/baseUrl';
import { applyJobApi, getAJobApi, getOneSavedJobApi, saveAjobApi } from '../../services/Api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { applyJobContext, savedJobContext } from '../../context/contextApi';

function ViewJob() {
  const { setSavedJob } = useContext(savedJobContext)
  const { setAppliedJob } = useContext(applyJobContext)

  const [user, setUser] = useState({})
  const [jobData, setJobData] = useState([])
  const [token, setToken] = useState("")
  const [job, setJob] = useState({
    id: "",
    title: "",
    category: "",
    city: "",
    country: "",
    jobType: "",
    experience: "",
    education: "",
    location: "",
    salary: "",
    lastDate: "",
    description: "",
    skills: "",
    responsibilities: "",
    userid: ""
  })
//desconstructing id from url
const { id } = useParams()

  useEffect(() => {
    if (jobData) {
      jobData?.map((jobs) => {
        setJob({
          id: jobs._id,
          title: jobs.title,
          category: jobs.category,
          city: jobs.city,
          country: jobs.country,
          jobType: jobs.jobType,
          experience: jobs.experience,
          education: jobs.education,
          location: jobs.location,
          salary: jobs.salary,
          lastDate: jobs.lastDate,
          description: jobs.description,
          skills: jobs.skills,
          responsibilities: jobs.responsibilities,
          userid: jobs.userid
        })

      })

    }
  }, [jobData])
  
  useEffect(() => {
    if (sessionStorage.getItem('userToken')) {
      setToken(sessionStorage.getItem('userToken'))
    }
  }, [])


  useEffect(() => {
    getAJob(id)
  }, [id])

  useEffect(() => {
    getASavedJob(id)
  }, [id])




  //to get a job
  const getAJob = async (id) => {
    const result = await getAJobApi(id)
    // console.log(result);
    if (result.status == 200) {
      setJobData(result.data)
    } else {
      console.log(result.response.data);
    }
  }

  //to get a saved job
  const getASavedJob = async (id) => {
    const result = await getOneSavedJobApi(id)
    // console.log(result);
    if (result.status == 200) {
      setJobData(result.data)
    } else {
      console.log(result.response.data);
    }
  }


  
  // console.log(jobData);
 


  //to save job
  const saveJob = async () => {
    if (token) {
      const reqHeader = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`

      }
      const result = await saveAjobApi(job, reqHeader)
      console.log(result);

      if (result.status == 200) {
        toast.success('job saved')
        setSavedJob
      }
      else {
        toast.error(result.response.data)
        console.log(result.response.data);

      }
    }
    else {
      toast.warning("Please log in to save jobs")
    }




  }

  useEffect(() => {
    if (sessionStorage.getItem('userData')) {
        const data = JSON.parse(sessionStorage.getItem('userData'))
        setUser(data)
    }
}, [token])

  
    //apply a job
    const applyJob = async () => {
      if (Object.keys(user).length > 0) {
          const { id } = job
          console.log(id);
          if (token) {
              const reqHeader = {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${token}`
              }
              const result = await applyJobApi(id, reqHeader)
              console.log(result);

              if (result.status == 200) {
                  toast.success('Applied Successfully')
                  setAppliedJob(true)
              }
              else {
                  toast.error(result.response.data)

              }
          }else{
              toast.warning('please login to apply')
          }
      }
      else {
          toast.info('please complete your profile to apply job')
          setTimeout(() => {
              navigate('/user/add-profile')


          }, 2000);
      }

  }



  return (
    <>
      <UserHeader />
      {jobData?.map((job) => (
        <div style={{ background: '#E8F6F3', minHeight: '100dvh' }}>
          <div className="row ">

            <div className="col-md-4 col-sm-12 container-fluid mt-5  ">

              <div className='rounded bg-light shadow '>
                <div className='p-5 '>

                  <div className='  d-flex align-items-center justify-content-center flex-column '>
                    <img className='mb-2 ' src={job.recruiterDetails.companyImage ? `${baseUrl}/uploads/${job.recruiterDetails.companyImage}` : ""} width={'100px'} alt="" />
                    <h2 style={{ fontWeight: '500', color: '' }} className='text-center'>{job.recruiterDetails.username}</h2>
                  </div>

                  <div className='p-3 mb-2 '>
                    <h2>About</h2>
                    <p style={{ textAlign: 'justify' }}>{job.recruiterDetails.about}</p>
                  </div>



                </div>
              </div>
            </div>


            <div className="col-md-7  container-fluid mt-5  " style={{ textAlign: 'justify', backgroundColor: '#D5F5E3' }}>


              <div className='w-100  text-center' >
                <h1 className='py-4' style={{ fontWeight: '800', color: '' }}>{job.title}</h1>
                <div className='px-5 w-100 text-center row'>
                  {job.salary ? <h6 className='col-md-3'> <FontAwesomeIcon className='me-2' icon={faIndianRupee} />{job.salary}</h6> : ""}
                  <h6 className='col-md-2'> <FontAwesomeIcon className='me-2' icon={faSuitcase} />{job.experience}</h6>
                  <h6 className='col-md-2'><FontAwesomeIcon className='me-2' icon={faClock} />{job.jobType}</h6>
                  <p className='col-md-2'> <FontAwesomeIcon className='me-2' icon={faLocationDot} />{job.city}</p>
                  <p className='col-md-3'> <FontAwesomeIcon className='me-2' icon={faCalendarDay} />{job.lastDate}</p>

                </div>
                

              </div>

              <div className='p-5'>

                <div className='p-3 mb-2'>
                  <h2 className=''>Job Description</h2>
                  <p>{job.description}</p>
                </div>
                {job.responsibilities && <div className='ps-5 pe-3 mb-2'>
                  <h3 className=''>Key Responsibilities</h3>
                  <p>{job.responsibilities}</p>
                </div>}
                {job.skills && <div className='ps-5 pe-3 '>
                  <h3 className=''>Skills</h3>

                  <p>{job.skills}</p>
                </div>}

                <div className=' d-flex align-items-center justify-content-center w-100 mt-3'>
                   <div className='btn  mt-3  bg-primary text-light' onClick={applyJob} >Apply Now</div>
                  <div className='btn ms-3 mt-3  bg-warning text-light' onClick={saveJob}>Save Job</div>

                </div>
              </div>
            </div>

          </div>


        </div>
      ))}
      <ToastContainer theme='colored' position='top-center' autoClose={2000} />
    </>
  )
}

export default ViewJob