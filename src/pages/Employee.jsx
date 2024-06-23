
import React, { useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import DoneIcon from '@mui/icons-material/Done';
import EmployeeProfile from '../components/Employee/EmployeeProfile'
import YourApplications from '../components/Employee/YourApplications';
import Bookmark from '../components/Employee/Bookmark'
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import UserHeader from '../components/Employee/UserHeader';
import FooterFile from '../components/General/FooterFile';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';
import ChangePassword from '../components/General/ChangePassword';
import PasswordChange from '../components/Employee/PasswordChange';


function Employee() {
  const [currentPage, setCurrentPage] = useState("profile")

  //to make it responsive
  const screenSize = useMediaQuery({ minWidth: 1024 })
  //bottom navigation mui
  const [value, setValue] = React.useState(0);
  return (
    <>
      <UserHeader />
      {screenSize ? <div className='container-fluid ' style={{ background: '#E8F6F3', minHeight: '100dvh' }}>
        <div className='dashboard container-fluid pt-5'>
          <div className=' row'>

            <div className="col-lg-3 mt-2 " style={{ backgroundColor: 'white', color: 'black', height: "550px" }}>
              



              <div id='home ' className='p-3 rounded my-2' onClick={() => setCurrentPage("profile")} style={currentPage === 'profile' ? { backgroundColor: 'rgba(99, 76, 245, 0.923)', color: 'white' } : { backgroundColor: 'white', color: 'black' }}>
                <h5 style={{ fontSize: "20px", fontWeight: 500 }}>  <AccountCircleIcon className='me-2' />Profile</h5>
              </div>
              <div id='home' className='p-3 rounded mb-2' onClick={() => setCurrentPage("YourApplications")} style={currentPage === 'YourApplications' ? { backgroundColor: 'rgba(99, 76, 245, 0.923)', color: 'white' } : { backgroundColor: 'white', color: 'black' }}>
                <h5 style={{ fontSize: "20px", fontWeight: 500 }}><DoneIcon className='me-2' />Applied Jobs</h5>
              </div>
              <div id='home' className='p-3 rounded mb-2' onClick={() => setCurrentPage("SavedJobs")} style={currentPage === 'SavedJobs' ? { backgroundColor: 'rgba(99, 76, 245, 0.923)', color: 'white' } : { backgroundColor: 'white', color: 'black' }}>
                <h5 style={{ fontSize: "20px", fontWeight: 500 }}><BookmarkIcon className='me-2' />Saved Jobs</h5>
              </div>
              <div id='home' className='p-3 rounded mb-2' onClick={() => setCurrentPage("pswd")} style={currentPage === 'pswd' ? { backgroundColor: 'rgba(99, 76, 245, 0.923)', color: 'white' } : { backgroundColor: 'white', color: 'black' }}>
                <h5 style={{ fontSize: "20px", fontWeight: 500 }}><FontAwesomeIcon className='me-2' icon={faLock} />Change Password</h5>
              </div>



            </div>
            <div className='col-lg-9'>
              {currentPage === 'profile' ? <EmployeeProfile /> : null}
              {currentPage === 'YourApplications' ? <YourApplications /> : null}
              {currentPage === 'SavedJobs' ? <Bookmark /> : null}
              {currentPage === 'pswd' ? < PasswordChange/> : null}

            </div>


          </div>

        </div>
      </div>
        :
        <div style={{ minHeight: '90dvh' }}>
          <div className='container-fluid bg-white mb-4 mt-3'>
            <div className='p-3'>
              {currentPage === 'profile' ? <EmployeeProfile /> : null}
              {currentPage === 'YourApplications' ? <YourApplications /> : null}
              {currentPage === 'SavedJobs' ? <Bookmark /> : null}

            </div>

          </div>
          <div className=''>
            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} >
              <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}

              >
                <BottomNavigationAction label="Profile" style={{ background: 'transparent' }} icon={< AccountCircleIcon />} onClick={() => setCurrentPage("profile")} />
                <BottomNavigationAction label="Applied" style={{ background: 'transparent' }} icon={< DoneIcon />} onClick={() => setCurrentPage("YourApplications")} />
                <BottomNavigationAction label="Saved" style={{ background: 'transparent' }} icon={<BookmarkIcon />} onClick={() => setCurrentPage("SavedJobs")} />
              </BottomNavigation>
            </Paper>
          </div>
        </div>}

      <FooterFile />
    </>
  )
}

export default Employee