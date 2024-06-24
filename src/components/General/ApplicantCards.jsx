
import React, { useContext, useEffect, useState } from 'react'

import { faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import DeleteIcon from '@mui/icons-material/Delete';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { baseUrl } from '../../services/baseUrl';
import { deleteSavedCandidateApi, saveCandidateApi } from '../../services/Api';
import { ToastContainer, toast } from 'react-toastify';
import { saveCandidateContext } from '../../context/contextApi';
function ApplicantCards({ candidate }) {
    const [isSaved, setIsSaved] = useState(false)
    const [isRemove, setIsRemove] = useState(false)
    const [token, setToken] = useState("")
    const [profileData, setProfileData] = useState({
        profileid: "",
        userid: "",
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
        userImage: "",

    })
    const { setSavedCandidate } = useContext(saveCandidateContext)

    useEffect(() => {
        if (sessionStorage.getItem('token')) {
            setToken(sessionStorage.getItem('token'))
        }
    }, [token])

    useEffect(() => {
        if (candidate) {
            setProfileData({
                profileid: candidate._id,
                userid: candidate.userid,
                username: candidate.username,
                email: candidate.email,
                position: candidate.position,
                phone: candidate.phone,
                country: candidate.country,
                city: candidate.city,
                postCode: candidate.postCode,
                gender: candidate.gender,
                dateOfBirth: candidate.dateOfBirth,
                linkdin: candidate.linkdin,
                resume: candidate.resume,
                userImage: candidate.userImage,
            })
        }
        setIsRemove(false)


    }, [isRemove])

    //to save candidates
    const saveProfile = async () => {
        if (token) {
            const reqHeader = {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`

            }
            const { profileid } = profileData
            const result = await saveCandidateApi(profileid, reqHeader)


            if (result.status == 200) {
                toast.info('profile saved')
            }
            else {
                toast.error(result.response.data)
            }
        }
    }

    const deleteSavedProfile = async () => {
        if (window.confirm('remove saved candidate?')) {
            const reqHeader = {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
            const { profileid } = profileData

            const result = await deleteSavedCandidateApi(profileid, reqHeader)
            if (result.status = 200) {
                setIsRemove(true)



            } else {
                console.log(result.response.data);
            }
        }
    }

    const handleProfile = () => {
        if (isSaved) {
            deleteSavedProfile()
            setSavedCandidate(true)
        } else {
            saveProfile()
            setSavedCandidate(true)
        }
        setIsSaved(!isSaved)
    }

    const url = `https://${candidate.linkdin}`

    return (

        <>
            <div className='m-3 border p-3 shadow' style={{ backgroundColor: 'white', borderRadius: '10px', minHeightheight: "500px" }}>
                <div className='text-center mb-3'>
                    <img
                        src={candidate.userImage ? `${baseUrl}/uploads/user/${candidate.userImage}` : ""} alt='User Avatar'
                        width='80'
                        height='80'
                        style={{ borderRadius: '50%' }}
                    />
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '600' }} className='text-secondary'>{candidate.username}</h2>
                    <h5 style={{ fontSize: '1rem' }} className='text-secondary'>{candidate.position}</h5>
                </div>

                <div className='row p-2'>
                    <div className='col-6 mb-2'>
                        <h6 className=''>E-mail:</h6>
                        <p className='text-secondary' style={{ fontSize: '1rem', wordBreak: 'break-all' }}>{candidate.email}</p>
                    </div>
                    <div className='col-6 mb-2'>
                        <h6 className=''>Phone:</h6>
                        <p className='text-secondary' style={{ fontSize: '1rem' }}>{candidate.phone}</p>
                    </div>
                    <div className='col-6 mb-2'>
                        <h6 className=''>Location:</h6>
                        <p className='text-secondary' style={{ fontSize: '1rem' }}>{candidate.city}, {candidate.country}</p>
                    </div>
                    <div className='col-6 mb-2'>
                        <h6 className=''>Gender:</h6>
                        <p className='text-secondary' style={{ fontSize: '1rem' }}>{candidate.gender == 'M' ? 'Male' : candidate.gender == 'F' ? "Female" : "other"}</p>
                    </div>
                    <div className='col-6 mb-2'>
                        <h6 className=''>Date of Birth:</h6>
                        <p className='text-secondary' style={{ fontSize: '1rem' }}>{candidate.dateOfBirth}</p>
                    </div>
                    <div className='col-6 mb-2'>
                        <h6 className=''>LinkedIn:</h6>

                        <a href={url} target='_blank' style={{ fontSize: '1rem', color: 'blue', textDecoration: "none", wordBreak: 'break-all' }} className=''>  <FontAwesomeIcon style={{ cursor: "pointer" }} className='me-2' size='md' icon={faLinkedin} />{candidate.linkdin}</a>

                    </div>
                </div>

                <div className='d-flex justify-content-around mt-3'>
                    <div className='btn btn-success' onClick={() => window.open(`${baseUrl}/uploads/user/${candidate.resume}`, '_blank',)}>
                        <FileDownloadIcon /> Resume
                    </div>
                    {/* <div className='btn btn-danger'>
                        <DeleteIcon />
                    </div> */}
                    <div className='btn btn-dark' onClick={handleProfile}>
                        <BookmarkIcon />
                    </div>
                </div>
            </div>
            <ToastContainer theme='colored' position='top-center' autoClose={2000} />

        </>
    )
}

export default ApplicantCards