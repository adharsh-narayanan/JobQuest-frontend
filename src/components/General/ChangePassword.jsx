import React, { useEffect, useState } from 'react'
import { changeAdminPasswordApi } from '../../services/Api'
import { ToastContainer, toast } from 'react-toastify'

function ChangePassword({adminData}) {
    //console.log(adminData.userid);
    const [data, setData] = useState({
        id: "",
        oldPassword: "",
        newPassword: "",
        cNewPassword: ""
    })
    useEffect(()=>{
        setData({...data,id:adminData.userid})
    },[adminData])
    const [error, setError] = useState({})

    const validatedata = (e) => {
        e.preventDefault()
        const { oldPassword, newPassword, cNewPassword, } = data

        let validate = {}

        if (!oldPassword) {
            validate.username = ' *Old password is required'

        }

        if (!newPassword) {
            validate.password = '*newPassword is required'
        } else if (!newPassword.match(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/)) {
            validate.password = ' *password should contain atleast 6 charcters. Minimum 1 lowercase, 1 uppercase,1 special character,1 number'

        }



        if (!cNewPassword) {
            validate.cpassword = '*please confirm the password'
        }
        else if (cNewPassword !== newPassword) {
            validate.cpassword = '*passwords not matched'
        }

        setError(validate)
        return Object.keys(validate).length == 0 ? true : false
    }


    const updatePassword = async (e) => {
        e.preventDefault()

        const token = sessionStorage.getItem('token')


        if (validatedata(e)) {

            const reqHeader = {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`

            }
            try {
                let result = await changeAdminPasswordApi(data,reqHeader)
                console.log(result);
                if (result.status == 200) {
                    toast.success('Password Updated')

                    setData({
                        id: "",
                        oldPassword: "",
                        newPassword: "",
                        cNewPassword: ""
                    })
                   

                } else {

                    toast.error(result.response.data)
                }
            }
            catch (error) {
                toast.error('An error occurred ');
                console.log(error);
            }


        }
    }

    console.log(data);

    return (
        <>
            <div className='container-fluid mb-5 pb-5 w-100 shadow rounded' style={{ backgroundColor: 'white', color: 'black' }}>
                <div className='mt-2 p-3 d-flex justify-content-between align-items-center'>
                    <h2>Change Password</h2>
                </div>
                <div className='p-4 col-md-6 border shadow border-secondary'>
                    <div className='mb-3 '>
                        <label className='w-100' htmlFor="name">Old Password
                            <input type="password" placeholder='Enter old password' className='form-control mt-2' id='name' onChange={(e) => setData({ ...data, oldPassword: e.target.value })} />
                        </label>
                        {error.username && <p className='mt-2' style={{ color: 'red' }}>{error.username}</p>}

                    </div>
                    <div className=' mb-3 '>
                        <label className='w-100' htmlFor="name">New Password
                            <input type="password" placeholder='Enter new password' className='form-control mt-2' id='name' onChange={(e) => setData({ ...data, newPassword: e.target.value })} />
                        </label>
                        {error.password && <p className='mt-2' style={{ color: 'red' }}>{error.password}</p>}
                    </div>

                    <div className=' mb-3 '>
                        <label className='w-100' htmlFor="name">Retype New Password
                            <input type="password" placeholder='confirm new password' className='form-control mt-2' id='name' onChange={(e) => setData({ ...data, cNewPassword: e.target.value })} />
                        </label>
                        {error.cpassword && <p className='mt-2' style={{ color: 'red' }}>{error.cpassword}</p>}

                    </div>
                    <div>
                        <div className='btn btn-warning' onClick={(e) => updatePassword(e)}>Change Password</div>
                    </div>


                </div>
            </div>
            <ToastContainer theme='colored' position='top-center' autoClose={2000} />

        </>
    )
}

export default ChangePassword