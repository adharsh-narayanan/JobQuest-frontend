import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { verify } from '../../redux/slices/verifySlice';
import { baseUrl } from '../../services/baseUrl';
import { verifyRecruiterApi } from '../../services/Api';
import { toast } from 'react-toastify';
import { verifyAdminContext } from '../../context/contextApi';

function ViewRecruiter() {
    const {id}=useParams()
    const [verification, setverification] = useState(false)
    const [recruiter, setRecruiter] = useState({})
    const [token,setToken]=useState("")
    const{setVerificationstatus}=useContext(verifyAdminContext)
    console.log(verification);

 
    //redux data from all recruiters
    const data = useSelector((state) => state.recruiterReducer);

    useEffect(()=>{
        setRecruiter(data)
        setverification(data.verification)
    },[])

    //console.log(recruiter);

    useEffect(() => {
        if (sessionStorage.getItem('token')) {
          setToken(sessionStorage.getItem('token'))
        }
      }, [token])
      

    const handleVerify =async()=>{
        setverification(!verification)
        console.log(verification);
        
        if(token){
            const reqHeader = {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`    
            }

            const reqBody = { verified: !verification }; 

            const result=await verifyRecruiterApi(id,reqBody,reqHeader)
            if(result.status==200){
                toast.success('profile verified succesfully')
                setVerificationstatus(true)
                }
                else{
                 console.log(result.response.data);
                }
        }
        
    }



   
    
    return (
        <div className='container'>

            <div className='container-fluid mb-5 pb-5 w-100 shadow rounded' style={{ backgroundColor: 'white', color: 'black' }}>
                <div className='mt-2 p-3 d-flex justify-content-between align-items-center'>
                    <div className='d-flex '>
                        <h2>Company Profile</h2>
                         <div className='p-2  fs-5 ms-3  text-white rounded btn'onClick={handleVerify }>  {verification ? <span className='bg-success p-2'>Un-verify</span> : <span className='bg-danger p-2'>verify</span>}</div> 
                    </div>
                </div>
                <div className='p-4 border shadow border-secondary'>  
                    <div className='mb-2'>
                        <div className='row mb-2'>

                            <div className="col-md-6">
                                <div className='mb-2 '>
                                    <h5 className=''>Company Name:</h5>
                                    <h5 style={{ fontSize: '1.1rem' }} className='text-secondary'>{recruiter.username}</h5>
                                </div>

                            </div>
                            <div className="col-md-6">
                                <div className='mb-2 '>
                                    <h5 className=''>Industry</h5>
                                    <h5 style={{ fontSize: '1.1rem' }} className='text-secondary'>{recruiter.industry}</h5>
                                </div>

                            </div>
                        </div>
                        <div className='row mb-2'>

                            <div className="col-md-6">
                                <div className='mb-2 '>
                                    <h5 className=''>Website</h5>
                                    <h5 style={{ fontSize: '1.1rem' }} className='text-secondary'><Link style={{ textDecoration: 'none' }}>{recruiter.website}</Link></h5>
                                </div>

                            </div>
                            <div className="col-md-6">
                                <div className='mb-2 '>
                                    <h5 className=''>Email:</h5>
                                    <h5 style={{ fontSize: '1.1rem' }} className='text-secondary'>
                                        {recruiter.email}
                                    </h5>
                                </div>

                            </div>
                        </div>
                        <div className='row mb-2'>

                            <div className="col-md-6">
                                <div className='mb-2 '>
                                    <h5 className=''>Address</h5>
                                    <h5 style={{ fontSize: '1.1rem' }} className='text-secondary'>{recruiter.address}</h5>
                                </div>

                            </div>
                            <div className="col-md-6">
                                <div className='mb-2 '>
                                    <h5 className=''>Country</h5>
                                    <h5 style={{ fontSize: '1.1rem' }} className='text-secondary'>{recruiter.country}</h5>
                                </div>

                            </div>

                            <div className="col-md-6">
                                <div className='mb-2 '>
                                    <h5 className=''>Download Documents for Verification</h5>
                                    <button className='btn btn-outline-danger'
                                        onClick={() => window.open(`${baseUrl}/uploads/${recruiter.documents}`, '_blank',)}
                                    >Download</button>
                                </div>

                            </div>
                        </div>


                    </div>

                </div>
                <div className='p-4 border shadow border-secondary'>
                    <h2>About Company</h2>
                    <p style={{ textAlign: 'justify' }}>{recruiter.about}</p>
                </div>



            </div>
        </div>
    )
}

export default ViewRecruiter