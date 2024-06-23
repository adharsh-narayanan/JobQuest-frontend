import React, { useContext, useEffect, useState } from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import EmployerProfile from '../components/Employer/EmployerProfile';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faPaperPlane, faSuitcase } from '@fortawesome/free-solid-svg-icons';
import OpenJobs from '../components/Employer/OpenJobs';
import ChangePassword from '../components/General/ChangePassword';
import AllPostedJobs from '../components/Admin/AllPostedJobs';
import AllCandidates from '../components/Admin/AllCandidates';
import AlllRecruiters from '../components/Admin/AlllRecruiters';
import Statistics from '../components/Admin/Statistics';
import Header from '../components/Admin/Header';
import { logoutResponsecontext, verifyAdminContext } from '../context/contextApi';
import { getAdminProfile, getAllCandidatesApi, getAllJobsApi, getRecruitersApi} from '../services/Api';
import { toast } from 'react-toastify';


function SuperAdmin() {
    const [currentPage, setCurrentPage] = useState("stat")
    const [admintoken, setAdminToken] = useState("")
    const [recruiters, setRecruiters] = useState([])
    const [users, setUsers] = useState([])
    const [jobs, setjobs] = useState([])
    const [adminData, setAdmindata] = useState({})


    const { AuthoriseToken } = useContext(logoutResponsecontext)
    const{verificationstatus}=useContext(verifyAdminContext)


    useEffect(() => {
        if (sessionStorage.getItem('token')) {
            setAdminToken(sessionStorage.getItem('token'))
        }
    }, [admintoken, AuthoriseToken])
    // console.log(admintoken);

    useEffect(() => {
        allRecruiters()
        allUsers()
        getAlljobs()
    }, [admintoken,verificationstatus])

    //to get all recruiters
    const allRecruiters = async () => {
        if (admintoken) {
            const reqHeader = {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${admintoken}`
            }
            const result = await getRecruitersApi(reqHeader)
            //console.log(result);
            if (result.status == 200) {
                setRecruiters(result.data)
            }
            else {
                console.log(result.response.data);
            }
        }
    }

    //to get all users
    const allUsers = async () => {
        if (admintoken) {
            const reqHeader = {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${admintoken}`
            }
            const result = await getAllCandidatesApi(reqHeader)
           // console.log(result);
            if (result.status == 200) {
                setUsers(result.data)
            }
            else {
                console.log(result.response.data);
            }
        }
    }

    //to get all jobs

    const getAlljobs = async () => {

        const reqHeader = {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${admintoken}`
        }
    
        if (admintoken) {
            const search=""
          const result = await getAllJobsApi(search,reqHeader)
           //console.log(result.data);
          if (result.status == 200) {
            setjobs(result.data)
          } else {
            console.log(result.response);
          }
        } 
    
      }

 
 

   

    //console.log(recruiters);
    //console.log(users);


    return (
        <>
            <Header />
            <div className='container-fluid ' style={{ background: '#E8F6F3', minHeight: '100dvh' }}>
                <div className='dashboard container-fluid pt-5'>
                    <div className=' row'>

                        <div className="col-lg-3 mt-2  mb-5 " style={{ backgroundColor: 'white', color: 'black', height: "620px" }}>

                            <div className='p-3 d-flex justify-content-center align-items-center flex-column'>
                                <img src="https://img.freepik.com/free-vector/colorful-letter-d-arrow-icon-logo-design_474888-2837.jpg?size=626&ext=jpg&ga=GA1.1.2038351387.1715060407&semt=ais_user" alt="" width={'150px'} height={'150px'} style={{ borderRadius: "50%" }} />
                                <h5 style={{ fontSize: '1.5rem', fontWeight: '600' }} className='text-secondary'>Admin</h5>
                            </div>


                            <div id='home ' className='p-3 rounded mb-2' onClick={() => setCurrentPage("stat")} style={currentPage === 'stat' ? { backgroundColor: 'rgba(99, 76, 245, 0.923)', color: 'white' } : { backgroundColor: 'white', color: 'black' }}>
                                <h5 style={{ fontSize: "20px", fontWeight: 500 }}>  <AccountCircleIcon className='me-2' />Statistics</h5>
                            </div>
                            <div id='home' className='p-3 rounded mb-2' onClick={() => setCurrentPage("recruiters")} style={currentPage === 'recruiters' ? { backgroundColor: 'rgba(99, 76, 245, 0.923)', color: 'white' } : { backgroundColor: 'white', color: 'black' }}>
                                <h5 style={{ fontSize: "20px", fontWeight: 500 }}><FontAwesomeIcon className='me-2' icon={faPaperPlane} />Recruiters</h5>
                            </div>
                            <div id='home' className='p-3 rounded mb-2' onClick={() => setCurrentPage("candidates")} style={currentPage === 'candidates' ? { backgroundColor: 'rgba(99, 76, 245, 0.923)', color: 'white' } : { backgroundColor: 'white', color: 'black' }}>
                                <h5 style={{ fontSize: "20px", fontWeight: 500 }}><FontAwesomeIcon className='me-2' icon={faSuitcase} />Candidates</h5>
                            </div>
                            <div id='home' className='p-3 rounded mb-2' onClick={() => setCurrentPage("alljobs")} style={currentPage === 'alljobs' ? { backgroundColor: 'rgba(99, 76, 245, 0.923)', color: 'white' } : { backgroundColor: 'white', color: 'black' }}>
                                <h5 style={{ fontSize: "20px", fontWeight: 500 }}><BookmarkIcon className='me-2' />Jobs Posted</h5>
                            </div>
                            <div id='home' className='p-3 rounded mb-2' onClick={() => setCurrentPage("pswd")} style={currentPage === 'pswd' ? { backgroundColor: 'rgba(99, 76, 245, 0.923)', color: 'white' } : { backgroundColor: 'white', color: 'black' }}>
                                <h5 style={{ fontSize: "20px", fontWeight: 500 }}><FontAwesomeIcon className='me-2' icon={faLock} />Edit details</h5>
                            </div>


                        </div>
                        <div className='col-lg-9'>
                            {currentPage === 'stat' ? <Statistics recruiters={recruiters} users={users} jobs={jobs} /> : null}
                            {currentPage === 'recruiters' ? <AlllRecruiters recruiters={recruiters} /> : null}
                            {currentPage === 'candidates' ? <AllCandidates users={users} /> : null}
                            {currentPage === 'alljobs' ? <AllPostedJobs jobs={jobs} /> : null}
                            {currentPage === 'pswd' ? <ChangePassword adminData={adminData} /> : null}



                        </div>


                    </div>

                </div>
            </div>
        </>
    )
}

export default SuperAdmin