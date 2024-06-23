
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Employee from './pages/Employee'
import Employer from './pages/Employer'
import UserLogin from './components/Employee/UserLogin'
import EmployerLogin from './components/Employer/EmployerLogin'
import ViewJob from './components/Employee/ViewJob'
import AllJobs from './pages/AllJobs'
import Applicants from './components/Employer/Applicants'
import SuperAdmin from './pages/SuperAdmin'
import ViewRecruiter from './components/Admin/ViewRecruiter'
import { useContext } from 'react'
import { logoutResponsecontext } from './context/contextApi'
import PostJob from './components/Employer/PostJob'
import AddUserProfile from './components/Employer/AddUserProfile'
import OpenJobs from './components/Employer/OpenJobs'
import AddProfile from './components/Employee/AddProfile'
import EmployeeProfile from './components/Employee/EmployeeProfile'
import AllCandidates from './pages/AllCandidates'

function App() {
  const { AuthoriseToken } = useContext(logoutResponsecontext)

  return (


    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/user/dashboard' element={AuthoriseToken ? <Employee /> : <Home />} />
        <Route path='/admin-dashboard' element={AuthoriseToken ? <Employer /> : <Home />} />
        <Route path='/user-login' element={<UserLogin />} />
        <Route path='/user-register' element={<UserLogin register />} />
        <Route path='/admin-login' element={<EmployerLogin />} />
        <Route path='/admin-register' element={<EmployerLogin signup />} />
        <Route path='/view-job/:id' element={<ViewJob />} />
        <Route path='/all-jobs' element={<AllJobs />} />
        <Route path='/applicants/:id' element={<Applicants />} />
        <Route path='/SuperAdmin' element={AuthoriseToken ? <SuperAdmin /> : <EmployerLogin />} />
        <Route path='/SuperAdmin/view-recruiter/:id' element={<ViewRecruiter />} />
        <Route path='/admin/post-job' element={<PostJob />} />
        <Route path='/admin/add-profile' element={<AddUserProfile />} />
        <Route path='/admin/jobs' element={<OpenJobs />} />
        <Route path='/user/add-profile' element={<AddProfile />} />
        <Route path='/user/profile' element={<EmployeeProfile />} />
        <Route path='/all-candidates' element={<AllCandidates />} />








      </Routes>


    </>
  )
}

export default App
