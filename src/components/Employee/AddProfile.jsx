import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addUserProfileApi, } from '../../services/Api';
import { useNavigate } from 'react-router-dom';
import UserHeader from './UserHeader';
import { userProfileContext } from '../../context/contextApi';

function AddProfile() {
    const navigate = useNavigate()
    const{seteditUserProfile}=useContext(userProfileContext)


    const [userData, setUserData] = useState({
        username: "",
        email: "",
        position: "",
        phone: "",
        country: "",
        city: "",
        postCode: "",
        gender: "",
        dateOfBirth: "",
        linkdin: "",
        resume: "",
        userImage: ""
    })
    // console.log(userData);

    const [preview, setpreview] = useState("")

    //to get data when page loads or changes
    useEffect(() => {
        const data = JSON.parse(sessionStorage.getItem("existingUser"))
        setUserData({
            ...userData,
            username: data.username,
            email: data.email,
        })
    }, [])

    //to display profile image
    useEffect(() => {
        userData.userImage ? setpreview(URL.createObjectURL(userData.userImage)) : setpreview("")
    }, [userData.userImage])


    //function to add profile

    const addUserProfile = async (e) => {
        e.preventDefault()
        const { username, email, position, phone, country, city, postCode, gender, dateOfBirth, linkdin, resume, userImage } = userData

        if (!username || !email || !position || !phone || !country || !city || !postCode || !gender || !dateOfBirth || !resume || !userImage) {
            toast.warning("completely fill profile")

        }
        else {
            const reqBody = new FormData()

            reqBody.append("username", username)
            reqBody.append("email", email)
            reqBody.append("position", position)
            reqBody.append("phone", phone)
            reqBody.append("country", country)
            reqBody.append("city", city)
            reqBody.append("postCode", postCode)
            reqBody.append("gender", gender)
            reqBody.append("dateOfBirth", dateOfBirth)
            reqBody.append("linkdin", linkdin)
            reqBody.append("userImage", userImage)
            reqBody.append("resume", resume)


            const token = sessionStorage.getItem('userToken')

            const reqHeader = {
                'content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            }
            const result = await addUserProfileApi(reqBody, reqHeader)
            console.log(result);
            if (result.status == 200) {
                toast.success('Profile Updated Succesfully')
                
                setTimeout(()=>{
                    seteditUserProfile(true)
                    navigate('/user/dashboard')
                },2000)

            }
            else {
                //console.log(result.response)
                toast.error(result.response.data)

            }

        }

    }





    return (
        <div className=' w-100'>
            <UserHeader />
            <div className='row d-flex justify-content-center align-items-center' >
                <div><span className='text-danger justify-content-end d-flex p-2'>* required fields</span></div>


                <div>
                    <div className='d-flex justify-content-center align-items-center mb-3'>
                        <label htmlFor="profileImage">
                            <input style={{ display: "none" }} type="file" id='profileImage' onChange={(e) => setUserData({ ...userData, userImage: e.target.files[0] })} />
                            {
                                <img src={preview ? preview : "https://www.translitescaffolding.com/wp-content/uploads/2013/06/user-avatar.png"} alt="" width={'150px'} height={'150px'} style={{ borderRadius: "50%" }} />


                            }

                        </label>
                    </div>
                    <p className=' d-flex justify-content-center align-items-center mb-2'> <span className='text-danger'>*</span>Profile image </p>

                </div>

                <div className='col-md-5 mb-2 '>
                    <label className='w-100' htmlFor="name"> <span className='text-danger'>*</span>Full Name
                        <input type="text" className='form-control' id='name' value={userData.username} onChange={(e) => setUserData({ ...userData, username: e.target.value })} />
                    </label>
                </div>
                <div className='col-md-5 mb-2 '>
                    <label className='w-100' htmlFor="name"><span className='text-danger'>*</span>Position
                        <input type="text" className='form-control' id='name' value={userData.position} onChange={(e) => setUserData({ ...userData, position: e.target.value })} />
                    </label>
                </div>
                <div className='col-md-5 mb-2 '>
                    <label className='w-100' htmlFor="name"><span className='text-danger'>*</span>email
                        <input type="text" className='form-control' id='name' value={userData.email} onChange={(e) => setUserData({ ...userData, email: e.target.value })} />
                    </label>
                </div>
                <div className='col-md-5 mb-2 '>
                    <label className='w-100' htmlFor="name"><span className='text-danger'>*</span>Phone
                        <input type="text" className='form-control' id='name' value={userData.phone} onChange={(e) => setUserData({ ...userData, phone: e.target.value })} />
                    </label>
                </div>
                <div className='col-md-5 mb-2 '>
                    <label className='w-100' htmlFor="name"><span className='text-danger'>*</span>Country
                        <input id="country" name="country" class="form-control" value={userData.country} onChange={(e) => setUserData({ ...userData, country: e.target.value })} />

                    </label>
                </div>
                <div className='col-md-5 mb-2 '>
                    <label className='w-100' htmlFor="name"><span className='text-danger'>*</span>City
                        <input type="text" className='form-control' id='name' value={userData.city} onChange={(e) => setUserData({ ...userData, city: e.target.value })} />
                    </label>
                </div>
                <div className='col-md-5 mb-2 '>
                    <label className='w-100' htmlFor="name"><span className='text-danger'>*</span>post code
                        <input type="text" className='form-control' id='name' value={userData.postCode} onChange={(e) => setUserData({ ...userData, postCode: e.target.value })} />
                    </label>
                </div>
                <div className='col-md-5 mb-2 '>
                    <label className='w-100' htmlFor="name"><span className='text-danger'>*</span>Gender
                        <select id="gender" name="gender" className='form-control' value={userData.gender} onChange={(e) => setUserData({ ...userData, gender: e.target.value })}>
                            <option value="">--</option>
                            <option value="F">Female</option>
                            <option value="M">Male</option>
                            <option value="O">Other</option>
                        </select>
                    </label>
                </div>
                <div className='col-md-5 mb-2 '>
                    <label className='w-100' htmlFor="name"><span className='text-danger'>*</span>Date of Birth
                        <input type="date" className='form-control' id='name' value={userData.dateOfBirth} onChange={(e) => setUserData({ ...userData, dateOfBirth: e.target.value })} />
                    </label>
                </div>
                <div className='col-md-5 mb-2 '>
                    <label className='w-100' htmlFor="name">Linkdin Profile
                        <input type="text" className='form-control' id='name' value={userData.linkdin} onChange={(e) => setUserData({ ...userData, linkdin: e.target.value })} />
                    </label>
                </div>
                <div className='col-md-5 mb-2 '>
                    <label className='w-100' htmlFor="name"><span className='text-danger'>*</span>Resume
                        <input type="file" className='form-control' id='name' onChange={(e) => setUserData({ ...userData, resume: e.target.files[0] })} />
                        <span>upload resume <span className='text-danger'>in pdf format</span></span>
                    </label>
                </div>
                <div className='py-5 text-center'>
                    <div className='btn btn-success' onClick={(e) => addUserProfile(e)}>Submit </div>
                </div>
            </div>
        </div>)
}

export default AddProfile