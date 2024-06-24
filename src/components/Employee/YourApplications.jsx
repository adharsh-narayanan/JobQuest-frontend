import React, { useContext, useEffect, useState } from 'react'
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteApplicationApi, getAppliedJobsApi } from '../../services/Api';
import { useNavigate } from 'react-router-dom';
import { applyJobContext } from '../../context/contextApi';

function YourApplications() {
  const [jobs, setjobs] = useState([])
  const [token, setToken] = useState("")
  const navigate = useNavigate()
  const[isRemove,setIsRemove]=useState(false)
  const { appliedJob, setAppliedJob } = useContext(applyJobContext)





  useEffect(() => {
    if (sessionStorage.getItem('userToken')) {
      setToken(sessionStorage.getItem('userToken'))
    }
    else {
      toast.info('Please login to apply jobs')
    }
  }, [])

  useEffect(() => {
    if (token) {
      appliedJobs()
      setIsRemove(false)
      setAppliedJob(false)

    }
  }, [token,isRemove,appliedJob])


  //fetching applied jobs

  const appliedJobs = async () => {
    const reqHeader = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }

    if (token) {
      const result = await getAppliedJobsApi(reqHeader)
      if (result.status == 200) {
        setjobs(result.data)
       // console.log(result.data);
      } else {
        console.log(result.response.data);
      }
    }


  }
  //console.log(jobs);
  //to view job
  const ViewJob = (id) => {
    navigate(`/view-job/${id}`)

  }

  //to delete applicaton
  const deleteApplication=async(id)=>{
    if(token){
      const reqHeader = {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
      }
      const result=await deleteApplicationApi(id,reqHeader)
      if(result.status=200){
          setIsRemove(true)
          console.log(result);

      } else{
       console.log(result.response.data);
      }
     }

  }



  return (
    <>
      <div className='container-fluid w-100 rounded' style={{ height: '100dvh' }}>
        <div className='' style={{ backgroundColor: 'white', color: 'black', height: '' }}>
          <div className='mt-2 p-3'>
            <h2>Applied Jobs</h2>
          </div>

          <div className='p-4 border border-secondary'>
            {jobs?.length > 0 ? <table class="table table-striped">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Company Name</th>
                  <th scope="col">Designation</th>
                  <th scope="col">View</th>
                  <th scope="col">Actions</th>

                </tr>
              </thead>
              <tbody>
                {
                  jobs.map((job,index) => (
                    <tr>
                      <th scope="row">{index + 1}</th>
                      <td> {job.recruiterDetails.username}</td>
                      <td>{job.title}</td>
                      <td><div className='btn' onClick={() => ViewJob(job._id)}><OpenInNewIcon /></div></td>
                      <td><div className='btn me-2' onClick={(e)=>deleteApplication(job._id)}><DeleteIcon style={{ fill: 'red' }} /></div></td>
                    </tr>
                  ))
                }

              </tbody>
            </table> :
              <p className='text warning text-center p-5'>You haven't appplied any jobs</p>

            }
          </div>
        </div>





      </div>

    </>
  )
}

export default YourApplications