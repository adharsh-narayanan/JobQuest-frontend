import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import { addAdminProfile, } from '../../services/Api';
import { baseUrl } from '../../services/baseUrl';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { editAdminContext } from '../../context/contextApi';
import { useNavigate } from 'react-router-dom';
import AdminHeader from './AdminHeader';

function AddUserProfile() {
    const { setEditResponse } = useContext(editAdminContext)

    const [adminData, setAdmindata] = useState({
        username: "",
        email: "",
        industry: "",
        website: "",
        address: "",
        country: "",
        about: "",
        documents: "",
        companyImage: "",
        verification: false
    })
    const [update, setupdate] = useState(false)
    // console.log(adminData);
    const navigate = useNavigate()

    const [companypicture, setcompanyPicture] = useState("")
    const [preview, setpreview] = useState("")

    //modal controls

    useEffect(() => {
        const userData = JSON.parse(sessionStorage.getItem('existingUser'))
        // console.log(userData);
        setAdmindata({
            ...adminData,
            username: userData.username,
            email: userData.email,
        })
    }, [update])

    useEffect(() => {
        adminData.companyImage ? setpreview(URL.createObjectURL(adminData.companyImage)) : setpreview("")
    }, [adminData.companyImage])



    //function to update
    const handleAddProfile = async (e) => {
        e.preventDefault()

        const { username, email, website, address, country, about, companyImage, documents, industry, verification } = adminData
        const reqBody = new FormData()

        //to add data to the body use append() method--it can add only one item at a time
        reqBody.append("username", username);
        reqBody.append("email", email);
        reqBody.append("industry", industry);
        reqBody.append("website", website);
        reqBody.append("address", address);
        reqBody.append("country", country);
        reqBody.append("about", about);
        preview ? reqBody.append("companyImage", companyImage) : reqBody.append("companyImage", companypicture)
        reqBody.append("documents", documents);
        reqBody.append("verification", verification)



        const token = sessionStorage.getItem('token')
        if (token) {
            const reqHeader = {
                'content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}` //Bearer - used to verify , when using Bearer no other credential/document is needed to verify the request
            }
            const result = await addAdminProfile(reqBody, reqHeader)
            console.log(result);
            if (result.status == 200) {
                toast.success('Profile Updated Succesfully')
                setupdate(true)
                setEditResponse(result.data)
                setTimeout(() => {
                    navigate('/admin-dashboard')

                }, 3000)

            }
            else {
                //console.log(result.response.data)
                toast.error(result.response.data)
            }

        }
    }
    return (
        <div className=' w-100'>
            <AdminHeader />
            <div className='row d-flex justify-content-center align-items-center' >

                <div>
                    <div className='d-flex justify-content-center align-items-center mb-3'>
                        <label htmlFor="profileImage">
                            <input style={{ display: "none" }} type="file" id='profileImage' onChange={(e) => setAdmindata({ ...adminData, companyImage: e.target.files[0] })} />
                            <img src={preview ? preview : "https://img.freepik.com/free-vector/colorful-letter-d-arrow-icon-logo-design_474888-2837.jpg?size=626&ext=jpg&ga=GA1.1.2038351387.1715060407&semt=ais_user"} alt="" width={'150px'} height={'150px'} style={{ borderRadius: "50%" }} />

                        </label>
                    </div>
                    <p className=' d-flex justify-content-center align-items-center mb-2'> <span className='text-danger'>*</span>Profile image </p>
                </div>

                <div className='col-md-5 mb-2 '>
                    <label className='w-100' htmlFor="name"><span className='text-danger'>*</span>Company Name
                        <input type="text" className='form-control' id='name' value={adminData.username} onChange={(e) => setAdmindata({ ...adminData, username: e.target.value })} />
                    </label>
                </div>
                <div className='col-md-5 mb-2 '>
                    <label className='w-100' htmlFor="name"><span className='text-danger'>*</span>Industry
                        <input type="text" className='form-control' id='name' value={adminData.industry} onChange={(e) => setAdmindata({ ...adminData, industry: e.target.value })} />
                    </label>
                </div>
                <div className='col-md-5 mb-2 '>
                    <label className='w-100' htmlFor="name"> <span className='text-danger'>*</span>Website
                        <input type="text" className='form-control' id='name' value={adminData.website} onChange={(e) => setAdmindata({ ...adminData, website: e.target.value })} />
                    </label>
                </div>
                <div className='col-md-5 mb-2 '>
                    <label className='w-100' htmlFor="name"><span className='text-danger'>*</span>E-mail
                        <input type="text" className='form-control' id='name' value={adminData.email} onChange={(e) => setAdmindata({ ...adminData, email: e.target.value })} />
                    </label>
                </div>
                <div className='col-md-5 mb-2 '>
                    <label className='w-100' htmlFor="name"><span className='text-danger'>*</span>Address
                        <textarea type="text" className='form-control' id='name' value={adminData.address} onChange={(e) => setAdmindata({ ...adminData, address: e.target.value })} />
                    </label>
                </div>
                <div className='col-md-5 mb-2 '>
                    <label className='w-100' htmlFor="name"><span className='text-danger'>*</span>Country
                        <input type="text" className='form-control' id='name' value={adminData.country} onChange={(e) => setAdmindata({ ...adminData, country: e.target.value })} />
                    </label>
                </div>
                <div className='col-md-10 mb-2 '>
                    <label className='w-100' htmlFor="name"><span className='text-danger'>*</span>About
                        <textarea type="text" className='form-control' id='name' value={adminData.about} onChange={(e) => setAdmindata({ ...adminData, about: e.target.value })} />
                    </label>
                </div>
                <div className='col-md-10 mb-2 '>
                    <label className='w-100' htmlFor="name">Upload documents for verification
                        <input type="file" className='ms-4' onChange={(e) => setAdmindata({ ...adminData, documents: e.target.files[0] })} />
                    </label>
                </div>

                <div className='py-5 text-center'>
                    <div className='btn btn-success' onClick={((e) => handleAddProfile(e))} >Submit </div>
                </div>


            </div>
        </div>
    )
}

export default AddUserProfile