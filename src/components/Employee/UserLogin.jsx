import React, { useContext, useState } from 'react'
import './Userlogin.css'
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
import { loginUserApi, registerUserApi } from '../../services/Api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { logoutResponsecontext } from '../../context/contextApi';

function UserLogin({ register }) {
    const [error, setError] = useState({})
    const navigate = useNavigate()
    const [userData, setUserData] = useState({
        username: "",
        email: "",
        password: "",
        cpassword: "",
    })
    const {setauthoriseToken}=useContext(logoutResponsecontext) //logout-login context


    const validatedata = (e) => {
        e.preventDefault()
        const { username, email, password, cpassword } = userData



        let validate = {}

        if (!username) {
            validate.username = ' *Username is required'

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
    //function to register user
    const handleRegister = async (e) => {
        e.preventDefault()

        if (validatedata(e)) {
            try {
                let result = await registerUserApi(userData)
                console.log(result);
                if (result.status == 200) {
                    toast.success('registration successfull')

                    setUserData({
                        username: "",
                        email: "",
                        password: "",
                        cpassword: ""
                    })
                    setTimeout(() => {
                        navigate('/user-login')
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

    const handleLogin = async (e) => {
        e.preventDefault()

        const { email, password } = userData
        if (!email || !password) {
            toast.warning('please fill the form completely')
        } else {
            const result = await loginUserApi(userData)

            if (result.status == 200) {
                const existingUser = {
                    username: result.data.existingUser.username,
                    email: result.data.existingUser.email
                };
                
                sessionStorage.setItem("existingUser", JSON.stringify(existingUser));
                sessionStorage.setItem("userToken", result.data.token)
                setauthoriseToken(true)
                toast.success('Login Successfull')
                setUserData({
                    email: "",
                    password: "",
                })
                setTimeout(() => {
                    navigate('/')
                }, 2000);
            }

            else {
                toast.error(result.response.data)
            }

        }


    }
    //to conditionally render between login and signup
    const SignUp = register ? true : false
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


                <div div className='p-4  col-md-8 col-lg-6 col-xl-4  rounded shadow' style={{ backgroundColor: 'rgba(255, 255, 255, 0.735)' }}>
                    <div id='head'>
                        <h2 className='text-center mb-5 fw-bold'>{SignUp ? 'Create Account' : 'User Sign In'}</h2>
                    </div>


                    <form>
                        {SignUp && <div className='mb-4 '>
                            <TextField
                                label="Username" name='username'
                                id="outlined-start-adornment"
                                sx={{ width: '100%' }}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start"><AccountCircleOutlinedIcon /></InputAdornment>,
                                }}
                                onChange={(e) => setUserData({ ...userData, username: e.target.value })}

                            />
                            {error.username && <p className='mt-2' style={{ color: 'red' }}>{error.username}</p>}

                        </div>}


                        <div className='mb-4 '>
                            <TextField
                                label="E-mail" name='email'
                                id="outlined-start-adornment"
                                sx={{ width: '100%' }}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start"><MailOutlineRoundedIcon /></InputAdornment>,
                                }}
                                onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                            />
                            {error.email && <p className='mt-2' style={{ color: 'red' }}>{error.email}</p>}

                        </div>

                        <div className='mb-4 '>
                            <TextField
                                type="password"
                                label="Password"
                                name='password'
                                id="outlined-start-adornment"
                                sx={{ width: '100%' }}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start"><HttpsOutlinedIcon /></InputAdornment>,
                                }}
                                onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                            />
                            {error.password && <p className='mt-2' style={{ color: 'red' }}>{error.password}</p>}


                        </div>

                        {SignUp && <div className='mb-4 '>
                            <TextField
                                type="password" label="Confirm password" name='confirmPassword'
                                id="outlined-start-adornment"
                                sx={{ width: '100%' }}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start"><HttpsOutlinedIcon /></InputAdornment>,
                                }}
                                onChange={(e) => setUserData({ ...userData, cpassword: e.target.value })}
                            />
                            {error.cpassword && <p className='mt-2' style={{ color: 'red' }}>{error.cpassword}</p>}

                        </div>}




                        <div className='mb-4 '>
                            {SignUp ?
                                <Button variant="contained" type='submit' className='w-100 p-2' style={{ height: `50px` }} onClick={(e) => { handleRegister(e) }}>REGISTER</Button> :

                                <Button variant="contained" type='submit' className='w-100 p-2' style={{ height: `50px` }} onClick={(e) => handleLogin(e)}>Sign In</Button>}
                        </div>
                    </form>
                    {SignUp ? <h5 className=' text-center'>Already a user ?  <Link style={{ textDecoration: 'none' }} to={"/user-login"}>Sign in</Link></h5> :
                        <h5 className=' text-center'> New user ?  <Link style={{ textDecoration: 'none' }} to={"/user-register "}>Register</Link></h5>
                    }
                </div>
            </div>
            <ToastContainer theme='colored' position='top-center' autoClose={2000} />
        </>
    )
}

export default UserLogin