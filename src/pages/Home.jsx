import React, { useContext, useEffect, useState } from 'react'
import '../pages/Home.css'
import employee from '../assets/jd.png'
import employer from '../assets/employer.png'
import hire from '../assets/hire.png'
import { Link, useNavigate } from 'react-router-dom'
import AboutUs from '../components/General/AboutUs'
import Jobcards from '../components/General/Jobcards'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import FooterFile from '../components/General/FooterFile'
import UserHeader from '../components/Employee/UserHeader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { } from '@fortawesome/free-solid-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons/faArrowRight'
import { getAdminProfile, getHomeJobsApi, getUserProfileApi } from '../services/Api'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminHeader from '../components/Employer/AdminHeader'
import { logoutResponsecontext } from '../context/contextApi'




function Home() {

  const {AuthoriseToken}=useContext(logoutResponsecontext)


  const navigate = useNavigate()
  const [token, setToken] = useState("")
  const [admintoken, setAdminToken] = useState("")
  const [adminProfile, setAdminProfile] = useState({})
  const [userProfile, setUserProfile] = useState({})
  const [jobs, setJobs] = useState([])
  //for user
  useEffect(() => {
    if (sessionStorage.getItem('userToken')) {
      setToken(sessionStorage.getItem('userToken'))
    }
    getUserData()
  }, [token,AuthoriseToken])

  //console.log(userProfile);


  //for admin
  useEffect(() => {
    if (sessionStorage.getItem('token')) {
      setAdminToken(sessionStorage.getItem('token'))
    }
    getAdminData()
  }, [admintoken,AuthoriseToken])

  //homejobs
  useEffect(() => {
    getHomeJobs()
  }, [])

  //function to get home jobs

  const getHomeJobs = async () => {
    const result = await getHomeJobsApi()
    if (result.status == 200) {
      setJobs(result.data)
    } else {
      console.log(result.response.data);
    }
  }



  //get UserProfile

  const getUserData = async () => {
    if (token) {
      const reqHeader = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
      const result = await getUserProfileApi(reqHeader)
      if(result.status==200){
       // console.log(result.data);
        sessionStorage.setItem("userData",JSON.stringify(result.data))
      }else{
        toast.warning(result.response.data)
      }
    } 

  }

  //getting admin profile
  const getAdminData = async () => {
    if (admintoken) {
      const reqHeader = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${admintoken}`
      }
      const result = await getAdminProfile(reqHeader)
      //console.log(result);
      if (result.status == 200) {
        console.log(result);
        setAdminProfile(result.data)
      } else {
        setUser(null)

      }
    }

  }

  // console.log(jobs);
  //to move to all projects
  const allProjects = () => {
    if (token) {
      navigate('/all-jobs')

    } else {
      toast.info('Please login to view jobs')
    }
  }

  //handleDashboard
  const handleDashboard = () => {
    if (token) {
      navigate('/user/dashboard')
    } else if (admintoken) {
      navigate('/admin-dashboard')
    }
  }

  //get started
  const getStarted = () => {
    navigate('/user-login')
  }

  //home post job for admin
  function adminloginnavigate() {
    if (admintoken) {

      Object.keys(adminProfile).length > 0?navigate('/admin/post-job'):navigate('/admin/add-profile')
    } else {
      navigate('/admin-login')
    }

  }








  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  return (
    <>
      {token && <UserHeader/>}
      {admintoken && <AdminHeader />}
      <section className=''>
        <div className='banner'>

          <div className='banner-div  d-flex justify-content-center align-items-center'> <h1 className='banner-text p-5 '>Your dream Job <br />at your Fingertips</h1></div>

        </div>
      </section>

      <section>


        {!token && !admintoken &&

          <div className='w-100 selectuser'>
            <div className='row '>
              <div className="col-md-1"></div>

              <Link className='col-md-5' to={'/user-login'} style={{ textDecoration: 'none', color: "white" }}>
                <div className="text-center  find shadow">
                  <div className='text-center d-flex align-items-center justify-content-center flex-column find-text' >
                    <img src={employee} width={'50px'} alt="" />
                    <h2 className='mt-2' style={{ fontWeight: '600', overflowY: 'hidden' }} >Find a Job</h2>
                  </div>
                </div>
              </Link>

              <Link className="col-md-5 " to={'/admin-login'} style={{ textDecoration: 'none', color: "white" }}>

                <div className="post text-light shadow ">
                  <div className='text-center d-flex align-items-center justify-content-center flex-column post-text '>
                    <img src={employer} width={'50px'} alt="" />
                    <h2 style={{ fontWeight: '600', overflowY: 'hidden', }} className='mt-2 '>Post A Job</h2>
                  </div>
                </div>
              </Link>
              <div className="col-md-1"></div>
            </div>
          </div>
        }
      </section>


      <section className=''>
        {!admintoken &&
          <div className='home-card p-5'>
            <div className='container'>
              <h1 className='text-center fw-bold mb-5' style={{}}>Recent Jobs</h1>

              <div className=''>
                {jobs?.length > 0 ? <Slider {...settings}>
                  {jobs?.map((items) => (<Jobcards jobs={items} />))}
                </Slider> :
                  null
                }
              </div>

            </div>
            <div className='  container d-flex justify-content-end mt-4'>
              <button className='button1  rounded' onClick={allProjects}> View More</button>
            </div>

          </div>

        }


      </section>

      <section className='mb-5 p-5' style={{ background: "#fafafa" }}>
        <div className='banner-2'>
          <div className=' d-flex justify-content-center align-items-center flex-column container '>
            <img src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
          </div>
          <div className='banner2-text'>
            {admintoken ? <h1 className=''>
              Find the right person for your company
            </h1> :
              <h1 className=''>
                work with the world's leading companies
              </h1>}


          </div>
          {token || admintoken ? <button className='button2 rounded' onClick={handleDashboard}><FontAwesomeIcon className='me-2' icon={faArrowRight} /> Dashboard</button> :
            <button className='button2 rounded' onClick={getStarted}>Get Started</button>}
        </div>
      </section>

      <section className=' mb-5' >

        <div className='aboutus mt-5 mb-2 d-flex justify-content-center align-items-center flex-column container'>
          <h2>Why Us</h2>
          <div className='electricPage  row  d-flex justify-content-center align-items-center' style={{ backgroundColor: '#fafafa' }}>
            <div className="col-md-12 mt-5 col-lg-6 col-xl-6 d-flex justify-content-center align-items-center flex-column">
              <div className='p-2 aboutdata'>
                <h5 className='fw-bold'>Wide Range of Job Opportunities</h5>
                <p>
                  JobQuest connects job seekers with a diverse range of job opportunities across various industries and sectors, increasing their chances of finding the right job.
                </p>
              </div>
              <div className='p-2 aboutdata'>
                <h5 className='fw-bold'>Verified Employers</h5>
                <p>
                  We pay a lot of attention to the employers we cooperate with and vacancies they submit to our job board.
                </p>
              </div>
              <div className='p-2 '>
                <h5 className='fw-bold'>User-Friendly Interface</h5>
                <p>
                  JobQuest provides a user-friendly interface that makes it easy for both job seekers and employers to navigate and use the platform efficiently.
                </p>
              </div>
            </div>
            <div className="col-md-12 mt-5 col-lg-6 col-xl-6 d-flex justify-content-center align-items-center flex-column">

              <div className="row mb-3">
                <div className="col-md-6 mb-2 figure ">
                  <div className='fig-container'>
                    <img src="https://i.pinimg.com/236x/ca/10/22/ca1022742ca228b5019781fc1bea95d1.jpg" alt="" width={'100%'} height={'90%'} />
                  </div>
                </div>
                <div className="col-md-6 mb-2 figure">
                  <div className='fig-container'><img src="https://i.pinimg.com/236x/08/07/90/080790e094bd5b174cffe619b3cdc7f9.jpg" alt="" width={'100%'} height={'150px'} /></div>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6 figure mb-2 ">
                  <div className='fig-container'> <img src="https://i.pinimg.com/236x/02/03/e1/0203e11829cf7c47a96cfea75b63ccff.jpg" alt="" width={'100%'} height={'150px'} /></div>
                </div>
                <div className="col-md-6  mb-2 figure ">
                  <div className='fig-container'> <img src="https://i.pinimg.com/236x/95/2f/dd/952fdd5e825d368a080a6d294eac45a9.jpg" alt="" width={'100%'} height={'150px'} /></div>
                </div>
              </div>

            </div>
            <div>

            </div>
          </div>


        </div>
        <div className=' container d-flex justify-content-end'>
          <button className=' button1  '> Know More</button>
        </div>
      </section>



      {!token && <section className='banner3 p-5'>
        <div className=' container'>
          <div className='row  d-flex justify-content-center align-items-center'>
            <div className="col-md-8" >

              <div className='hire-text'>
                <h3 style={{ fontSize: "40px", fontWeight: "700" }}>Are You Hiring?</h3>
                <p style={{ fontSize: "25px", fontWeight: "400" }}>Post your job openings on JobQuest and find qualified candidates.</p>
              </div>

              <button className='button3' onClick={adminloginnavigate}>Post Job</button>

            </div>
            <div className="col-md-4 ">
              <img src={hire} width={'300px'} alt="" />
            </div>
          </div>

        </div>
      </section>}

      <section>
        <FooterFile />
      </section>

    </>
  )
}

export default Home