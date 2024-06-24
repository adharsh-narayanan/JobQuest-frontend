import React, { useContext, useState } from 'react'
import './Login.css'
import { Button } from '@mui/material'
import { TextField } from '@mui/material'
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import MailOutlineRoundedIcon from '@mui/icons-material/MailOutlineRounded';
import HttpsOutlinedIcon from '@mui/icons-material/HttpsOutlined';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import logo from '../images/logo.svg'
import { Link, useNavigate } from 'react-router-dom';
import { loginAdminApi, registerAdminApi } from '../../services/Api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { logoutResponsecontext } from '../../context/contextApi';

function EmployerLogin({ signup }) {
    const [admindata, setAdmindata] = useState({
        username: "",
        email: "",
        password: "",
        cpassword: "",
    })
    const [error, setError] = useState({})
    const navigate = useNavigate()
    const { setauthoriseToken } = useContext(logoutResponsecontext) //logout-login context

    // console.log(admindata);

    const validatedata = (e) => {
        e.preventDefault()
        const { username, email, password, cpassword } = admindata



        let validate = {}

        if (!username) {
            validate.username = ' *company name is required'

        }


        if (!email) {
            validate.email = '*Email is required'
        }
        else if (!email.match(/^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/)) {
            validate.email = '*invalid email'
        }

        if (!password) {
            validate.password = '*password is required'
        } else if (!password.match(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/)) {
            validate.password = ' *password should contain atleast 6 charcters. Minimum 1 lowercase, 1 uppercase,1 special character,1 number'

        }



        if (!cpassword) {
            validate.cpassword = '*please confirm the password'
        }
        else if (cpassword !== password) {
            validate.cpassword = '*passwords not matched'
        }

        setError(validate)
        return Object.keys(validate).length == 0 ? true : false

    }

    //function to register a new admin
    const adminregister = async (e) => {
        e.preventDefault()

        if (validatedata(e)) {
            //alert('success')
            try {
                let result = await registerAdminApi(admindata)
                console.log(result);
                if (result.status == 200) {
                    toast.success('registration successfull')

                    setAdmindata({
                        username: "",
                        email: "",
                        password: "",
                        cpassword: ""
                    })
                    setTimeout(() => {
                        navigate('/admin-login')
                    }, 2000)

                } else {

                    toast.error(result.response.data)
                }
            }
            catch (error) {
                toast.error('An error occurred during registration');
                console.log(error);
            }


        }
    }

    //function to login admin

    const adminlogin = async (e) => {
        e.preventDefault()
        const { email, password } = admindata
        if (!email || !password) {
            toast.info('please fill the form completely')
        }
        else {
            let result = await loginAdminApi(admindata)
            console.log(result);
            if (result.status == 200) {
                const existingUser = {
                    userid: result.data.existingUser._id,
                    username: result.data.existingUser.username,
                    email: result.data.existingUser.email,
                };
                sessionStorage.setItem("existingUser", JSON.stringify(existingUser));
                sessionStorage.setItem("token", result.data.token)

                toast.success('Login Successfull')
                setAdmindata({
                    email: "",
                    password: "",
                })
                setauthoriseToken(true)
                setTimeout(() => {
                    navigate('/')
                }, 2000);
            } else if (result.status == 202) {
                const existingUser = {
                    username: result.data.existingUser.username,
                    email: result.data.existingUser.email
                };
                sessionStorage.setItem("existingUser", JSON.stringify(existingUser));
                sessionStorage.setItem("token", result.data.token)
                setauthoriseToken(true)

                toast.success('Login Successfull')
                setAdmindata({
                    email: "",
                    password: "",
                })
                setTimeout(() => {
                    navigate('/SuperAdmin')
                }, 2000);

            }
            else {
                toast.error(result.response.data)
            }
        }
    }

    const SignUp = signup ? true : false
    return (

        <>
            <div>
                <div className="body">
                    <Container>
                        <Navbar.Brand href="/">
                            <img
                                alt=""
                                src={logo}
                                width="180"
                                height="130"
                                className="d-inline-block align-top"
                            />{' '}

                        </Navbar.Brand>
                    </Container>
                </div>
            </div>


            <div style={{ height: '100vh', width: '100%' }} className='d-flex justify-content-center align-items-center flex-column body '>


                <div div className='p-4  col-md-8 col-lg-6 col-xl-4  rounded shadow' style={{ backgroundColor: ` rgba(255, 255, 255, 0.735)` }}>
                    <div id='head'>
                        <h2 className='text-center mb-5 fw-bold'>{SignUp ? 'Create Account' : ' Admin Sign In'}</h2>
                    </div>


                    <form>
                        {SignUp && <div className='mb-4 '>
                            <TextField
                                label="Company Name" name='companyName'
                                value={admindata.username || ""}
                                id="outlined-start-adornment"
                                sx={{ width: '100%' }}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start"><AccountCircleOutlinedIcon /></InputAdornment>,
                                }}
                                onChange={(e) => setAdmindata({ ...admindata, username: e.target.value })} />
                            {error.username && <p className='mt-2' style={{ color: 'red' }}>{error.username}</p>}
                        </div>}


                        <div className='mb-4 '>
                            <TextField
                                value={admindata.email || ""}
                                label="E-mail" name='email'
                                id="outlined-start-adornment"
                                sx={{ width: '100%' }}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start"><MailOutlineRoundedIcon /></InputAdornment>,
                                }}
                                onChange={(e) => setAdmindata({ ...admindata, email: e.target.value })} />
                            {error.email && <p className='mt-2' style={{ color: 'red' }}>{error.email}</p>}

                        </div>

                        <div className='mb-4 '>
                            <TextField
                                value={admindata.password || ""}

                                type="password"
                                label="Password"
                                name='password'
                                id="outlined-start-adornment"
                                sx={{ width: '100%' }}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start"><HttpsOutlinedIcon /></InputAdornment>,
                                }}
                                onChange={(e) => setAdmindata({ ...admindata, password: e.target.value })} />
                            {error.password && <p className='mt-2' style={{ color: 'red' }}>{error.password}</p>}


                        </div>

                        {SignUp && <div className='mb-4 '>
                            <TextField
                                type="password" label="Confirm password" name='confirmPassword'
                                value={admindata.cpassword || ""}

                                id="outlined-start-adornment"
                                sx={{ width: '100%' }}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start"><HttpsOutlinedIcon /></InputAdornment>,
                                }}
                                onChange={(e) => setAdmindata({ ...admindata, cpassword: e.target.value })} />
                            {error.cpassword && <p className='mt-2' style={{ color: 'red' }}>{error.cpassword}</p>}

                        </div>}




                        <div className='mb-4 '>
                            {SignUp ?
                                <Button variant="contained" type='submit' className='w-100 p-2' style={{ height: `50px` }} onClick={(e) => { adminregister(e) }}>REGISTER</Button> :

                                <Button variant="contained" type='submit' className='w-100 p-2' style={{ height: `50px` }} onClick={(e) => { adminlogin(e) }}>Sign In</Button>}
                        </div>
                    </form>
                    {SignUp ? <h5 className=' text-center'>Already have an account ?  <Link style={{ textDecoration: 'none' }} to={"/admin-login"}> Sign in</Link></h5> :
                        <h5 className=' text-center'> New   Recruiter ?  <Link style={{ textDecoration: 'none' }} to={"/admin-register "}> Register</Link></h5>
                    }
                </div>
            </div>
            <ToastContainer theme='colored' position='top-center' autoClose={2000} />


        </>
    )
}

export default EmployerLogin