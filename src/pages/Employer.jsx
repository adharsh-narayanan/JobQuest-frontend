import React, { useContext, useEffect, useState } from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import EmployerProfile from '../components/Employer/EmployerProfile';
import UserHeader from '../components/Employee/UserHeader';
import PostJob from '../components/Employer/PostJob';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faPaperPlane, faSuitcase } from '@fortawesome/free-solid-svg-icons';
import OpenJobs from '../components/Employer/OpenJobs';
import SavedCandidates from '../components/Employer/SavedCandidates';
import ChangePassword from '../components/General/ChangePassword';
import { baseUrl } from '../services/baseUrl';
import { addjobContext, editAdminContext, passwordChangeContext } from '../context/contextApi';
import { getAdminProfile } from '../services/Api';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { adminprofile } from '../redux/slices/adminProfileSlice';
import { useNavigate } from 'react-router-dom';
import AdminHeader from '../components/Employer/AdminHeader';



function Employer() {
  //context api
  const { ischangePassword, setIsChangePassword } = useContext(passwordChangeContext)

  const { editResponse } = useContext(editAdminContext)
  const { addjobresponse,setaddjobresponse} = useContext(addjobContext)

  const [adminData, setAdmindata] = useState({})
  const [currentPage, setCurrentPage] = useState("profile")
  const [token, setToken] = useState("")
  const navigate = useNavigate()
  const dispatch = useDispatch()


  useEffect(() => {
    if (sessionStorage.getItem('token')) {
      setToken(sessionStorage.getItem('token'))
    }
  }, [])

  useEffect(() => {
    getAdminData()
  }, [token, editResponse])

  //sending admindata to editadmin profile component
  useEffect(() => {
    dispatch(adminprofile(adminData))
  }, [adminData])

  useEffect(() => {
    setIsChangePassword(false)
    setaddjobresponse(false)
    setCurrentPage("profile")
  }, [ischangePassword,addjobresponse])


  //getting profile
  const getAdminData = async () => {
    if (token) {
      const reqHeader = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
      const result = await getAdminProfile(reqHeader)
      if (result.status == 200) {
        // console.log(result);
        setAdmindata(result.data)
        sessionStorage.setItem("userProfile", JSON.stringify(result.data))
      } else {
        toast.warning(result.response.data)
        navigate('/admin/add-profile')
      }
    }
  }
  //console.log(adminData);
  return (
    <>
      <AdminHeader />
      <div className='container-fluid ' style={{ background: '#E8F6F3', minHeight: '100dvh' }}>
        <div className='dashboard container-fluid pt-5'>
          <div className=' row'>

            <div className="col-lg-3 mt-2  mb-5 " style={{ backgroundColor: 'white', color: 'black', height: "620px" }}>

              <div className='p-3 d-flex justify-content-center align-items-center flex-column'>
                <img src={adminData ? `${baseUrl}/uploads/${adminData.companyImage}` : "https://img.freepik.com/free-vector/colorful-letter-d-arrow-icon-logo-design_474888-2837.jpg?size=626&ext=jpg&ga=GA1.1.2038351387.1715060407&semt=ais_user"} alt="" width={'150px'} height={'150px'} style={{ borderRadius: "50%" }} />
                <h5 style={{ fontSize: '1.5rem', fontWeight: '600' }} className='text-secondary'>{adminData.username}</h5>
                <h5 style={{ fontSize: '1.1rem' }} className='text-secondary'>{adminData.industry}</h5>
              </div>


              <div id='home ' className='p-3 rounded mb-2' onClick={() => setCurrentPage("profile")} style={currentPage === 'profile' ? { backgroundColor: 'rgba(99, 76, 245, 0.923)', color: 'white' } : { backgroundColor: 'white', color: 'black' }}>
                <h5 style={{ fontSize: "20px", fontWeight: 500 }}>  <AccountCircleIcon className='me-2' />Company Profile</h5>
              </div>
              <div id='home' className='p-3 rounded mb-2' onClick={() => setCurrentPage("postjob")} style={currentPage === 'postjob' ? { backgroundColor: 'rgba(99, 76, 245, 0.923)', color: 'white' } : { backgroundColor: 'white', color: 'black' }}>
                <h5 style={{ fontSize: "20px", fontWeight: 500 }}><FontAwesomeIcon className='me-2' icon={faPaperPlane} />Post a Job</h5>
              </div>
              <div id='home' className='p-3 rounded mb-2' onClick={() => setCurrentPage("openjobs")} style={currentPage === 'openjobs' ? { backgroundColor: 'rgba(99, 76, 245, 0.923)', color: 'white' } : { backgroundColor: 'white', color: 'black' }}>
                <h5 style={{ fontSize: "20px", fontWeight: 500 }}><FontAwesomeIcon className='me-2' icon={faSuitcase} />Open Jobs</h5>
              </div>
              <div id='home' className='p-3 rounded mb-2' onClick={() => setCurrentPage("SavedJobs")} style={currentPage === 'SavedJobs' ? { backgroundColor: 'rgba(99, 76, 245, 0.923)', color: 'white' } : { backgroundColor: 'white', color: 'black' }}>
                <h5 style={{ fontSize: "20px", fontWeight: 500 }}><BookmarkIcon className='me-2' />Saved Candidates</h5>
              </div>
              <div id='home' className='p-3 rounded mb-2' onClick={() => setCurrentPage("pswd")} style={currentPage === 'pswd' ? { backgroundColor: 'rgba(99, 76, 245, 0.923)', color: 'white' } : { backgroundColor: 'white', color: 'black' }}>
                <h5 style={{ fontSize: "20px", fontWeight: 500 }}><FontAwesomeIcon className='me-2' icon={faLock} />Change Password</h5>
              </div>


            </div>
            <div className='col-lg-9'>
              {currentPage === 'profile' ? <EmployerProfile adminData={adminData} /> : null}
              {currentPage === 'postjob' ? <PostJob /> : null}
              {currentPage === 'openjobs' ? <OpenJobs /> : null}
              {currentPage === 'SavedJobs' ? <SavedCandidates /> : null}
              {currentPage === 'pswd' ? <ChangePassword adminData={adminData} /> : null}

            </div>


          </div>

        </div>
      </div>
    </>
  )
}

export default Employer