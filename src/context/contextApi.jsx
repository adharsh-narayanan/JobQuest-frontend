import React, { createContext, useState } from 'react'

//cotext for adding new admin
export const editAdminContext = createContext()

//context for adding a job
export const addjobContext = createContext()

//context for editing a job

export const editJobContext = createContext()

//context for logout
export const logoutResponsecontext = createContext()

//context for user profile updation
export const userProfileContext = createContext()

//context for deleting a saved job

export const savedJobContext = createContext()

//context for update applied job

export const applyJobContext = createContext()

//context for saving profile

export const saveCandidateContext = createContext()

//context for admin verification
export const verifyAdminContext=createContext()

function contextApi({ children }) {
  const [editResponse, setEditResponse] = useState(null)
  const [addjobresponse, setaddjobresponse] = useState({})
  const [editJobResponse, setEditJobResponse] = useState({})
  const [AuthoriseToken, setauthoriseToken] = useState(true)
  const [editUserProfile, seteditUserProfile] = useState({})
  const [savedJob, setSavedJob] = useState(false)
  const [appliedJob, setAppliedJob] = useState(false)
  const [savedCandidate, setSavedCandidate] = useState(false)
  const[verificationstatus,setVerificationstatus]=useState(false)

  return (
    <editAdminContext.Provider value={{ editResponse, setEditResponse }}>
      <addjobContext.Provider value={{ addjobresponse, setaddjobresponse }}>
        <editJobContext.Provider value={{ editJobResponse, setEditJobResponse }}>
          <logoutResponsecontext.Provider value={{ AuthoriseToken, setauthoriseToken }}>
            <userProfileContext.Provider value={{ editUserProfile, seteditUserProfile }}>
              <savedJobContext.Provider value={{ savedJob, setSavedJob }}>
                <applyJobContext.Provider value={{ appliedJob, setAppliedJob }}>
                  <saveCandidateContext.Provider value={{savedCandidate, setSavedCandidate}}>
<verifyAdminContext.Provider value={{verificationstatus,setVerificationstatus}} >
  
                      {children}
  
</verifyAdminContext.Provider>
                  </saveCandidateContext.Provider>
                </applyJobContext.Provider>
              </savedJobContext.Provider>
            </userProfileContext.Provider>
          </logoutResponsecontext.Provider>
        </editJobContext.Provider>
      </addjobContext.Provider>
    </editAdminContext.Provider>

  )
}

export default contextApi