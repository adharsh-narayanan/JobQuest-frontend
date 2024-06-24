
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import EditUserProfile from './EditUserProfile';

import { faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { baseUrl } from '../../services/baseUrl';
import { userProfileContext } from '../../context/contextApi';
import { getUserProfileApi } from '../../services/Api';
import { toast } from 'react-toastify';


function EmployeeProfile() {
  const {editUserProfile}=useContext(userProfileContext)
  const [user, setUser] = useState({})
  const [token, setToken] = useState("")
  const navigate =useNavigate()

  useEffect(() => {
    if (sessionStorage.getItem('userToken')) {
      setToken(sessionStorage.getItem('userToken'))
    }
    getUserData()
    
  }, [token,editUserProfile])
  //console.log(user);

  
  //get UserProfile
  const getUserData = async () => {
    if (token) {
      const reqHeader = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
      const result = await getUserProfileApi(reqHeader)
      if(result.status==200){
       // console.log(result);
      setUser(result.data)
      sessionStorage.setItem("userData",JSON.stringify(result.data))

      }else{
        toast.warning(result.response.data)
        navigate('/user/add-profile')
      }
    } 

  }



const url= `https://${user.linkdin}`

  return (
  <>
  
      <div className='container-fluid mb-5 pb-5 w-100 rounded' style={{ backgroundColor: 'white', color: 'black' }}>
        <div className='mt-2 p-3 d-flex justify-content-between align-items-center'>
          <h2>Profile</h2>
          <div className='p-1 btn'><EditUserProfile data={user}/></div>
        </div>
        <div className='p-4 border border-secondary'>
          <div className='p-3 '>
          </div>
  
  
          <div className='mb-2'>
            <div className='row mb-2'>
  
              <div className=' mb-5  d-flex justify-content-start align-items-center'>
  
                <img src={user.userImage ? `${baseUrl}/uploads/user/${user.userImage}` : "https://www.translitescaffolding.com/wp-content/uploads/2013/06/user-avatar.png"} alt="" width={'100px'} height={'100px'} style={{ borderRadius: "50%" }} />
  
                <h1 style={{ fontSize: '3rem', fontWeight: '600' }} className='text-secondary ms-3'>{user.username}</h1>
  
              </div>
  
  
  
              <div className="col-md-6 mb-3">
                <div className='mb-2 '>
                  <h5 className=''>Position:</h5>
                  <h5 style={{ fontSize: '1.1rem' }} className='text-secondary'>{user.position}</h5>
                </div>
  
              </div>
              <div className="col-md-6 mb-3">
                <div className='mb-2 '>
                  <h5 className=''>E-mail:</h5>
                  <h5 style={{ fontSize: '1.1rem' }} className='text-secondary'>{user.email}</h5>
                </div>
  
              </div>
              <div className="col-md-6 mb-3">
                <div className='mb-2 '>
                  <h5 className=''>Phone:</h5>
                  <h5 style={{ fontSize: '1.1rem' }} className='text-secondary'>{user.phone}</h5>
                </div>
  
              </div>
              <div className="col-md-6 mb-3">
                <div className='mb-2 '>
                  <h5 className=''>Country:</h5>
                  <h5 style={{ fontSize: '1.1rem' }} className='text-secondary'>{user.country}</h5>
                </div>
  
              </div>
  
              <div className="col-md-6 mb-3">
                <div className='mb-2 '>
                  <h5 className=''>City:</h5>
                  <h5 style={{ fontSize: '1.1rem' }} className='text-secondary'>{user.city}</h5>
                </div>
  
              </div>
              <div className="col-md-6 mb-3">
                <div className='mb-2 '>
                  <h5 className=''>Post code</h5>
                  <h5 style={{ fontSize: '1.1rem' }} className='text-secondary'>{user.postCode}</h5>
                </div>
  
              </div>
  
              <div className="col-md-6 mb-3">
                <div className='mb-2 '>
                  <h5 className=''>Gender:</h5>
                  <h5 style={{ fontSize: '1.1rem' }} className='text-secondary'>{user.gender == 'M' ? 'Male' : user.gender == 'F' ? "Female" : "other"}</h5>
                </div>
  
              </div>
              <div className="col-md-6 mb-3">
                <div className='mb-2 '>
                  <h5 className=''>Date of Birth:</h5>
                  <h5 style={{ fontSize: '1.1rem' }} className='text-secondary'>{user.dateOfBirth}</h5>
                </div>
              </div>
  
  
              <div className="col-md-6 mb-3">
                <div className='mb-2 '>
                  <h5 className=''>LinkdIn:</h5>
                  <a href={url} target='_blank' style={{ fontSize: '1rem', color: 'blue', textDecoration: "none" }} className=''>  <FontAwesomeIcon style={{ cursor: "pointer" }} size='md' icon={faLinkedin} />{user.linkdin}</a>
                </div>
  
              </div>
              <div className="col-md-6 mb-3">
                <div className='mb-2 '>
                  <h5 className=''>Resume:</h5>
                  <div style={{ fontSize: '1rem' }} className='btn btn-card bg-danger text-light' onClick={() => window.open(`${baseUrl}/uploads/user/${user.resume}`, '_blank',)}>Download</div>
                </div>
  
              </div>
  
  
  
            </div>
          </div>
  
        </div>
  
      </div>
  </>
  )
}

export default EmployeeProfile