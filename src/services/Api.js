

import { commonApi } from "./Axios"
import { baseUrl } from "./baseUrl"

//registering admin

export const registerAdminApi = async (reqBody) => {
    return await commonApi('post', `${baseUrl}/admin/register`, reqBody, "")
}

//login admin

export const loginAdminApi = async (reqBody) => {
    return await commonApi('post', `${baseUrl}/admin/login`, reqBody, "")
}


//to change admin password
export const changeAdminPasswordApi = async (reqBody, reqHeader) => {
    return await commonApi('put', `${baseUrl}/admin/update-password`, reqBody, reqHeader)
}


//to add admin profile

export const addAdminProfile = async (reqBody, reqHeader) => {
    return await commonApi('post', `${baseUrl}/admin/profile`, reqBody, reqHeader)

}

//to get admin profile

export const getAdminProfile = async (reqHeader) => {
    return await commonApi('get', `${baseUrl}/profile`, "", reqHeader)
}
//to update   admin

export const updateAdminProfileApi = async (id, reqBody, reqHeader) => {
    return await commonApi('put', `${baseUrl}/admin/edit/${id}`, reqBody, reqHeader)
}



//to post a job

export const postJobApi = async (reqBody, reqHeader) => {
    return await commonApi('post', `${baseUrl}/admin/postjob`, reqBody, reqHeader)
}

//to get recruiter job

export const getRecruiterJob = async (reqHeader) => {
    return await commonApi('get', `${baseUrl}/admin/jobs`, "", reqHeader)
}

//to edit job post

export const editjobApi = async (jobid, reqBody, reqHeader) => {
    return await commonApi('put', `${baseUrl}/admin/editJob/${jobid}`, reqBody, reqHeader)
}

//to delete a job

export const deleteJobApi = async (id, reqHeader) => {
    return await commonApi('delete', `${baseUrl}/admin/deleteJob/${id}`, {}, reqHeader)
}


//-------------------------------------------------------------------------------------------------------------------------------------------------------------//

//to register a user

export const registerUserApi = async (reqBody) => {
    return await commonApi('post', `${baseUrl}/user/register`, reqBody, "")
}

//to user login
export const loginUserApi = async (reqBody) => {
    return await commonApi('post', `${baseUrl}/user/login`, reqBody, "")
}

//to change user password
export const changeUserPasswordApi = async (reqBody, reqHeader) => {
    return await commonApi('put', `${baseUrl}/user/update-password`, reqBody, reqHeader)
}


//to add user profile  

export const addUserProfileApi = async (reqBody, reqHeader) => {
    return await commonApi('post', `${baseUrl}/user/profile`, reqBody, reqHeader)
}


//to get admin profile

export const getUserProfileApi = async (reqHeader) => {
    return await commonApi('get', `${baseUrl}/candidate/info`, "", reqHeader)
}

//to update user profile

export const updateProfileApi = async (id, reqBody, reqHeader) => {

    return await commonApi('put', `${baseUrl}/user/edit/${id}`, reqBody, reqHeader)
}



//to get jobs for home screen

export const getHomeJobsApi = async () => {
    return await commonApi('get', `${baseUrl}/home/jobs`, "", "")
}

//to get alljobs

export const getAllJobsApi = async (searchKey, reqHeader) => {
    return await commonApi('get', `${baseUrl}/all-jobs/?${searchKey}`, "", reqHeader)
}

//to get a single job

export const getAJobApi = async (id) => {
    return await commonApi('get', `${baseUrl}/view-job/${id}`, "", "")
}

//to save a job 

export const saveAjobApi = async (reqBody, reqHeader) => {
    return await commonApi('post', `${baseUrl}/jobs/save`, reqBody, reqHeader)
}

//to get saved jobs

export const getSavedJobApi = async (reqHeader) => {
    return await commonApi('get', `${baseUrl}/saved-jobs`, "", reqHeader)
}

//to delete saved jobs

export const removeSavedJobApi = async (id, reqHeader) => {
    return await commonApi('delete', `${baseUrl}/saved-jobs/remove/${id}`, {}, reqHeader)
}

//to get a single saved job

export const getOneSavedJobApi = async (id) => {
    return await commonApi('get', `${baseUrl}/savedjob/view-job/${id}`, "", "")
}

//to apply a job

export const applyJobApi = async (id, reqHeader) => {
    return await commonApi('post', `${baseUrl}/user/apply/${id}`, {}, reqHeader)

}

//to get applied job

export const getAppliedJobsApi = async (reqHeader) => {
    return await commonApi('get', `${baseUrl}/user/applied-jobs`, "", reqHeader)
}

//to delete job application
export const deleteApplicationApi = async (id, reqHeader) => {
    return await commonApi('delete', `${baseUrl}/applied-jobs/remove/${id}`, {}, reqHeader)

}
//--------------------------------------------------------------------------------------------------------------------------------------------

//to get candidates applied by recruiter

export const getCandidatesApi = async (id, reqHeader) => {
    return await commonApi('get', `${baseUrl}/admin/jobs/candidates/${id}`, "", reqHeader)
}

//to save candidates by admin
export const saveCandidateApi = async (id, reqHeader) => {
    return await commonApi('post', `${baseUrl}/admin/save-candidate/${id}`, {}, reqHeader)
}

//to get saved candiates

export const getSavedCandidatesApi = async (reqHeader) => {
    return await commonApi('get', `${baseUrl}/saved-candidates`, "", reqHeader)
}

//to remove saved profile
export const deleteSavedCandidateApi = async (id, reqHeader) => {
    return await commonApi('delete', `${baseUrl}/saved-candidates/remove/${id}`, {}, reqHeader)

}

//to get all candidates
export const getAllCandidatesApi = async (reqHeader) => {
    return await commonApi('get', `${baseUrl}/all-candidates`, "", reqHeader)
}

//---------------------------------------------------------------------------------------------
//to get all recruiters

export const getRecruitersApi = async (reqHeader) => {
    return await commonApi('get', `${baseUrl}/admin/recruiters`, "", reqHeader)
}
//to verify a user

export const verifyRecruiterApi = async (id, reqBody, reqHeader) => {

    return await commonApi('put', `${baseUrl}/admin/verify/${id}`, reqBody, reqHeader)
}
