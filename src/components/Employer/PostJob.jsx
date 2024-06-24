import React, { useContext, useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { postJobApi } from '../../services/Api';
import { addjobContext } from '../../context/contextApi';
import { useNavigate } from 'react-router-dom';

function PostJob() {
    const { setaddjobresponse } = useContext(addjobContext)
    const [token, setToken] = useState("")
    const[isjob,setIsJob] =useState(false)
    const navigate=useNavigate()
    //console.log(token);

    const [jobData, setJobData] = useState({
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
        responsibilities: ""
    })
   //  console.log(jobData);
    useEffect(() => {
        if (sessionStorage.getItem('token')) {
            setToken(sessionStorage.getItem('token'))
        }
        setIsJob(false)
    }, [isjob])

    //function to post  a job
    const handleAdd = async (e) => {
        e.preventDefault()
        const { title, category, city, country, jobType, experience, education, location, salary, lastDate, description, skills, responsibilities } = jobData
        //console.log(title, category, city, country, jobType, experience, education, location, salary, lastDate, description, skills, responsibilities);

        if (!title || !category || !city || !jobType || !experience || !location || !lastDate || !description) {
            toast.warning("please fill the form completely")

        } else {
            const reqBody = new FormData()

            reqBody.append("title", title);
            reqBody.append("category", category);
            reqBody.append("city", city);
            reqBody.append("country", country);
            reqBody.append("jobType", jobType);
            reqBody.append("experience", experience);
            reqBody.append("education", education);
            reqBody.append("location", location);
            reqBody.append("salary", salary);
            reqBody.append("lastDate", lastDate);
            reqBody.append("description", description);
            reqBody.append("skills", skills);
            reqBody.append("responsibilities", responsibilities);
            if (token) {
                const reqHeader = {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`

                }
                const result = await postJobApi(reqBody, reqHeader)
                if (result.status == 200) {
                    toast.success('successfully Posted new Job Vacancy')
                    setTimeout(()=>{
                        setaddjobresponse(true)

                    },2000)
                    setIsJob(true)
                    setJobData({
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
                        responsibilities: ""
                    })
                    navigate('/admin-dashboard')

                }
                else {
                    toast.error(result.response.data)
                }
            }
        }


    }


    return (
        <div className='container-fluid mb-5 pb-5 w-100 rounded' style={{ backgroundColor: 'white', color: 'black' }}>
            <div className='mt-2 p-3 border-bottom'>
                <h2>Post a Job</h2>

            </div>

            <div className='p-4 border shadow border-secondary'>
            <div className='mb-3'><span className='text-danger '>*Required</span></div>

                <div className='row d-flex justify-content-center align-items-center' >


                    <div className='col-md-6 mb-3 '>
                        <label className='w-100' htmlFor="name"><span className='text-danger'>*</span>Job Title
                            <input type="text" placeholder='Enter title' className='form-control mt-2' id='name' onChange={(e) => { setJobData({ ...jobData, title: e.target.value }) }} />
                        </label>
                    </div>
                    <div className='col-md-6 mb-3 '>
                        <label className='w-100' htmlFor="name"><span className='text-danger'>*</span>Job category
                            <select className='form-control outline-info' type="text" placeholder='category' onChange={(e) => { setJobData({ ...jobData, category: e.target.value }) }}>
                                <option value="" disabled selected>select</option>
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
                        </label>
                    </div>
                    <div className='col-md-6 mb-3 '>
                        <label className='w-100' htmlFor="name"><span className='text-danger'>*</span>City
                            <input type="text" placeholder='Enter City' className='form-control mt-2' id='name' onChange={(e) => { setJobData({ ...jobData, city: e.target.value }) }} />
                        </label>
                    </div>
                    <div className='col-md-6 mb-3 '>
                        <label className='w-100' htmlFor="name">Country
                            <input type="text" placeholder='Enter Country' className='form-control mt-2' id='name' onChange={(e) => { setJobData({ ...jobData, country: e.target.value }) }} />
                        </label>
                    </div>
                    <div className='col-md-6 mb-3 '>
                        <label className='w-100' htmlFor="name"><span className='text-danger'>*</span>Job type
                            <select className='form-control outline-info mt-2' type="text" placeholder='type' onChange={(e) => { setJobData({ ...jobData, jobType: e.target.value }) }}>
                                <option disabled selected value="select type">select value</option>
                                <option value="Full-time">Full time</option>
                                <option value="Part-time">Part time</option>
                                <option value="Internship">Internship</option>
                                <option value="Freelance">Freelance</option>
                                <option value="Temporary">Temporary</option>
                            </select>
                        </label>
                    </div>
                    <div className='col-md-6 mb-3 '>
                        <label className='w-100' htmlFor="name"><span className='text-danger'>*</span>Experience
                            <select className='form-control outline-info' type="text" placeholder='Location' onChange={(e) => { setJobData({ ...jobData, experience: e.target.value }) }}>
                                <option disabled selected value=" ">Experience</option>
                                <option value="fresher">Fresher</option>
                                <option value="1-year">1 year</option>
                                <option value="2-year">2 year</option>
                                <option value="3-year or more">3 year or more  </option>
                            </select>
                        </label>
                    </div>
                    <div className='col-md-6 mb-3 '>
                        <label className='w-100' htmlFor="name">Educational Qualification
                            <input type="text" placeholder='Enter required qualification' className='form-control mt-2' id='name' onChange={(e) => { setJobData({ ...jobData, education: e.target.value }) }} />
                        </label>
                    </div>
                    <div className='col-md-6 mb-3 '>
                        <label className='w-100' htmlFor="name"><span className='text-danger'>*</span>job site
                            <select className='form-control outline-info' type="text" placeholder='Location' onChange={(e) => { setJobData({ ...jobData, location: e.target.value }) }}>
                                <option disabled selected value=" ">Job Site</option>
                                <option value="onsite">onsite</option>
                                <option value="remote">remote</option>
                                <option value="hybrid">hybrid</option>
                            </select>
                        </label>
                    </div>
                    <div className='col-md-6 mb-3 '>
                        <label className='w-100' htmlFor="name">Salary (lpa)
                            <input placeholder='Enter Salary' type="text" className='form-control mt-2' id='name' onChange={(e) => { setJobData({ ...jobData, salary: e.target.value }) }} />
                        </label>
                    </div>
                    <div className='col-md-6 mb-3 '>
                        <label className='w-100' htmlFor="name"><span className='text-danger'>*</span>Last Date
                            <input type="date" className='form-control mt-2' id='name' onChange={(e) => { setJobData({ ...jobData, lastDate: e.target.value }) }} />
                        </label>
                    </div>
                    <div className='col-md-12 mb-2 '>
                        <label className='w-100' htmlFor="name"><span className='text-danger'>*</span>Job Description
                            <textarea placeholder='Describe....' type="text" className='form-control mt-2' id='name' onChange={(e) => { setJobData({ ...jobData, description: e.target.value }) }} />
                        </label>
                    </div>
                    <div className='col-md-12 mb-2 '>
                        <label className='w-100' htmlFor="name">Skills (seperated by commas)
                            <input type="text" placeholder='enter skills ' className='form-control mt-2' id='name' onChange={(e) => { setJobData({ ...jobData, skills: e.target.value }) }} />
                        </label>
                    </div>
                    <div className='col-md-12 mb-2 '>
                        <label className='w-100' htmlFor="name">Key responsibilities(seperated by commas)
                            <textarea type="text" placeholder='enter responsibilities' className='form-control mt-2' id='name' onChange={(e) => { setJobData({ ...jobData, responsibilities: e.target.value }) }} />
                        </label>
                    </div>
                    <div>
                        <div className='btn btn-success' onClick={(e) => { handleAdd(e) }}>Post Job</div>
                    </div>

                </div>

            </div>

            <ToastContainer theme='colored' position='top-center' autoClose={2000} />
        </div>
    )
}

export default PostJob