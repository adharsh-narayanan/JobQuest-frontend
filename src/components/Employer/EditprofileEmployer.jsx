import React, { useContext, useEffect } from 'react'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { updateAdminProfileApi } from '../../services/Api';
import { baseUrl } from '../../services/baseUrl';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { editAdminContext } from '../../context/contextApi';
import { useSelector } from 'react-redux';

function EditprofileEmployer() {
  //context
  const { setEditResponse } = useContext(editAdminContext)
  const userData = useSelector((state) => state.adminProfileReducer)
  // console.log(userData);


  const [adminData, setAdmindata] = useState({
    id: "",
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

  const [companypicture, setcompanyPicture] = useState()
  const [preview, setpreview] = useState("")
  //console.log(adminData);

  useEffect(() => {
    setAdmindata({
      ...adminData,
      id: userData?._id,
      username: userData?.username,
      industry: userData?.industry,
      email: userData?.email,
      website: userData?.website,
      address: userData?.address,
      country: userData?.country,
      about: userData?.about,
      verification: userData?.verification
    })
    setcompanyPicture(userData?.companyImage)
  }, [userData])


  //modal controls
  const [show, setShow] = useState(false);


  useEffect(() => {
    adminData.companyImage ? setpreview(URL.createObjectURL(adminData.companyImage)) : setpreview("")
    // adminData.documents?setdocuments(URL.createObjectURL(adminData.documents)):setdocuments("")
  }, [adminData.companyImage])








  //function to update
  const handleUpdate = async (e) => {
    e.preventDefault()
    const { id, username, email, website, address, country, about, companyImage, documents, industry, verification } = adminData
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
    if (preview || documents) {
      const reqHeader = {
        'content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      }
      const result = await updateAdminProfileApi(id, reqBody, reqHeader)
      console.log(result);
      if (result.status == 200) {
        toast.success('Profile Updated Succesfully')
        setEditResponse(result.data)
        setTimeout(() => {
          handleClose()

        }, 3000)

      }
      else {
        //console.log(result.response.data)
        toast.error(result.response.data)


      }

    } else {
      const reqHeader = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
      const result = await updateAdminProfileApi(id, reqBody, reqHeader)
      console.log(result);
      if (result.status == 200) {
        toast.success('Profile Updated Succesfully')
        setEditResponse(result.data)
        setTimeout(() => {
          handleClose()

        }, 3000)


      } else {
        //console.log(result.response)
        toast.error(result.response.data)

      }

    }
  }

  //cancel edit
  const handlecancel = () => {

    setAdmindata({ ...adminData, username: userData.username, industry: userData.industry, email: userData.email, website: userData.website, address: userData.address, country: userData.country, about: userData.about })

    setpreview("")

    handleClose()
  }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);



  return (
    <>
      <div onClick={handleShow}>
        <FontAwesomeIcon className='' icon={faPenToSquare} size='xl' />
      </div>


      <Modal show={show} onHide={handleClose} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className=' w-100'>
            <div className='row d-flex justify-content-center align-items-center' >

              <div>
                <div className='d-flex justify-content-center align-items-center mb-3'>
                  <label htmlFor="profileImage">
                    <input style={{ display: "none" }} type="file" id='profileImage'
                      onChange={(e) => setAdmindata({ ...adminData, companyImage: e.target.files[0] })} />

                    {companypicture == "" ?
                      <img src={preview ? preview : "https://img.freepik.com/free-vector/colorful-letter-d-arrow-icon-logo-design_474888-2837.jpg?size=626&ext=jpg&ga=GA1.1.2038351387.1715060407&semt=ais_user"} alt="" width={'150px'} height={'150px'} style={{ borderRadius: "50%" }} /> :


                      <img src={preview ? preview : `${baseUrl}/uploads/${companypicture}`} alt="" width={'100px'} height={'100px'}
                       style={{ borderRadius: "50%" }} />}
                  </label>
                </div>

                <p className=' d-flex justify-content-center align-items-center mb-2'>
                  <span className='text-danger'>*</span>Profile image
                </p>

              </div>

              <div className='col-md-5 mb-2 mt-2'>
                <label className='w-100' htmlFor="name"><span className='text-danger'>*</span>Company Name
                  <input type="text" className='form-control' id='name' value={adminData.username}
                    onChange={(e) => setAdmindata({ ...adminData, username: e.target.value })} />
                </label>
              </div>


              <div className='col-md-5 mb-2 '>
                <label className='w-100' htmlFor="name"><span className='text-danger'>*</span>Industry
                  <input type="text" className='form-control' id='name' value={adminData.industry}
                    onChange={(e) => setAdmindata({ ...adminData, industry: e.target.value })} />
                </label>
              </div>


              <div className='col-md-5 mb-2 '>
                <label className='w-100' htmlFor="name"><span className='text-danger'>*</span>Website
                  <input type="text" className='form-control' id='name' value={adminData.website}
                    onChange={(e) => setAdmindata({ ...adminData, website: e.target.value })} />
                </label>
              </div>


              <div className='col-md-5 mb-2 '>
                <label className='w-100' htmlFor="name"><span className='text-danger'>*</span>E-mail
                  <input type="text" className='form-control' id='name' value={adminData.email}
                    onChange={(e) => setAdmindata({ ...adminData, email: e.target.value })} />
                </label>
              </div>
              <div className='col-md-5 mb-2 '>
                <label className='w-100' htmlFor="name"><span className='text-danger'>*</span>Address
                  <textarea type="text" className='form-control' id='name' value={adminData.address}
                    onChange={(e) => setAdmindata({ ...adminData, address: e.target.value })} />
                </label>
              </div>


              <div className='col-md-5 mb-2 '>
                <label className='w-100' htmlFor="name"><span className='text-danger'>*</span>Country
                  <input type="text" className='form-control' id='name' value={adminData.country}
                    onChange={(e) => setAdmindata({ ...adminData, country: e.target.value })} />
                </label>
              </div>


              <div className='col-md-10 mb-2 '>
                <label className='w-100' htmlFor="name"><span className='text-danger'>*</span>About
                  <textarea type="text" className='form-control' id='name' value={adminData.about}
                    onChange={(e) => setAdmindata({ ...adminData, about: e.target.value })} />
                </label>
              </div>


              <div className='col-md-10 mb-2 '>
                <label className='w-100' htmlFor="name">Upload documents for verification
                  <input type="file" className='ms-4'
                    onChange={(e) => setAdmindata({ ...adminData, documents: e.target.files[0] })} />
                </label>
              </div>

            </div>
          </div>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handlecancel}>
            Cancel
          </Button>
          <Button variant="primary" onClick={(e) => { handleUpdate(e) }}>
            submit
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer theme='colored' position='top-center' autoClose={2000} />

    </>

  )
}

export default EditprofileEmployer