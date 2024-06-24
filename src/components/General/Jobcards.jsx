import { faBookmark, faCalendarCheck, faIndianRupee, faLocationDot, faSuitcase } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect, useState } from 'react'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import './styles.css'
import BookmarkRemoveIcon from '@mui/icons-material/BookmarkRemove';
import { Link, useNavigate } from 'react-router-dom';
import { applyJobApi, removeSavedJobApi, saveAjobApi } from '../../services/Api';
import 'react-toastify/dist/ReactToastify.css';
import { applyJobContext, savedJobContext } from '../../context/contextApi';
import { toast } from 'react-toastify';

function Jobcards({ jobs }) {

    const { setSavedJob } = useContext(savedJobContext)
    const { setAppliedJob } = useContext(applyJobContext)


    /*  redux
    const dispatch=useDispatch() */
    const [isRemove, setIsRemove] = useState(false)
    const [token, setToken] = useState("")
    const navigate = useNavigate()
    const [user, setUser] = useState({})
    const [jobsData, setJobData] = useState({
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

    useEffect(() => {
        if (jobs) {
            setJobData({
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
        }
        setIsRemove(false)

    }, [isRemove])

    useEffect(() => {
        if (sessionStorage.getItem('userToken')) {
            setToken(sessionStorage.getItem('userToken'))
        }
    }, [])
    useEffect(() => {
        if (sessionStorage.getItem('userData')) {
            const data = JSON.parse(sessionStorage.getItem('userData'))
            setUser(data)
        }
    }, [token])
   // console.log(user);


    //console.log(jobsData);

    const ViewJob = () => {
        navigate(`/view-job/${jobs._id}`)
    }

    //to save a job

    const saveJob = async () => {
        if (token) {
            const reqHeader = {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`

            }
            const result = await saveAjobApi(jobsData, reqHeader)
            console.log(result);

            if (result.status == 200) {
                toast.success('job saved')
                setSavedJob(true)

            }
            else {
                toast.error(result.response.data)
            }
        }else{
            toast.warning('please login to save job')
        }
    }

    //to remove a saved job

    const removeJob = async (id) => {
        if (token) {
            const reqHeader = {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
            const result = await removeSavedJobApi(id, reqHeader)
            if (result.status = 200) {
                setSavedJob(true)
                setIsRemove(true)

            } else {
                console.log(result.response.data);
            }
        }
    }


    //apply a job
    const applyJob = async () => {
        if (Object.keys(user).length > 0) {
            const { id } = jobsData
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
        }

    }
    return (
        <>
            <div className='card-container'>
                <div className='col-md-6 col-sm-12 col-lg-4 col-xl-3 p-4 border bg-light job-card' style={{ width: "90%",minHeight:'300px' }}   >

                    <div className=''>

                        <div onClick={ViewJob} >

                            <div>
                                <div className='d-flex  align-items-center  ' >
                                    <h4 className='mb-2 '>{jobs.title}</h4>
                                </div>

                                <div className='d-flex justify-content-between align-items-center row mb-2' >
                                    <h5 className='col-md-8' style={{wordBreak: 'break-all'}}>{jobs.recruiterDetails.username} </h5>
                                   {jobs.recruiterDetails.verification? <h6 className='p-1 col-md-4 bg-success text-center'>Verified</h6>:null}

                                </div>


                                <div className='d-flex justify-content-between align-items-center '>
                                    <h6 className='mb-2'> <FontAwesomeIcon className='me-2' icon={faSuitcase} />{jobs.experience}</h6>
                                    <h6 className='p-1 bg-info  rounded'>{jobs.jobType}</h6>
                                </div>
                                {jobs.salary?<h6 className='mb-2'> <FontAwesomeIcon className='me-2' icon={faIndianRupee} />{jobs.salary}</h6>:null}

                                <p className='mb-2'> <FontAwesomeIcon className='me-2' icon={faLocationDot} />{jobs.city}</p>
                                <p className='mb-2'> <FontAwesomeIcon className='me-2' icon={faCalendarCheck} />{jobs.lastDate}</p>

                            </div>

                        </div>

                        <div className='d-flex justify-content-between'>
                            <div className='btn btn-card bg-primary text-light' onClick={applyJob}>Apply Now</div>
                            {
                                jobs.id ? <div className='btn ' onClick={() => removeJob(jobs._id)} ><BookmarkRemoveIcon /></div>
                                    : <div className='btn' onClick={saveJob}> <BookmarkBorderIcon /></div>

                            }
                        </div>
                    </div>
                </div>





            </div>

        </>
    )
}

export default Jobcards