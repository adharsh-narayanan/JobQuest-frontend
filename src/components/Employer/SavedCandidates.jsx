import React, { useContext, useEffect, useState } from 'react'
import ApplicantCards from '../General/ApplicantCards'
import { getSavedCandidatesApi } from '../../services/Api'
import { saveCandidateContext } from '../../context/contextApi'
import Pagination from 'react-bootstrap/Pagination';


function SavedCandidates() {
    const [currentPage, setCurrentPage] = useState(1)
    const [token, setToken] = useState("")
    const [candidates, setCandidates] = useState([])
    const { savedCandidate, setSavedCandidate } = useContext(saveCandidateContext)

    useEffect(() => {
        if (sessionStorage.getItem('token')) {
            setToken(sessionStorage.getItem('token'))
        }
    }, [token])
    useEffect(() => {
        getSavedProfile()
        setSavedCandidate(false)
    }, [token, savedCandidate])



    //get saved profiles

    const getSavedProfile = async () => {
        if (token) {
            const reqHeader = {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
            const result = await getSavedCandidatesApi(reqHeader)
            if (result.status == 200) {
                console.log(result.data);
                setCandidates(result.data)
            }
            else {
                console.log(result.response);
            }

        }
    }


        //pagination
  const jobsPerPage = 6;
  const lastIndex = currentPage * jobsPerPage;
  const firstIndex = lastIndex - jobsPerPage;
  const data = candidates.slice(firstIndex, lastIndex);
  const page = Math.ceil(candidates.length / jobsPerPage)

  const handlePageChange = (number) => {
    setCurrentPage(number);
  };

  let items = [];
  for (let number = 1; number <= page; number++) {
    items.push(
      <Pagination.Item key={number} active={number === currentPage} onClick={() => handlePageChange(number)}>
        {number}
      </Pagination.Item>,
    );
  }
   
    return (
        <>
            <div className='container-fluid mb-5 pb-5 w-100 rounded' style={{ backgroundColor: 'white', color: 'black' }}>
                <div className='mt-2 p-3 border-bottom'>
                    <h2>Saved Candidates</h2>

                </div>
                {candidates?.length > 0 ? <div className='container-fluid'>

                    <div className='row'>


                        {data.map((candidate) => (
                            <div className="col-md-6 ">
                                <ApplicantCards candidate={candidate} />
                            </div>
                        ))}
                    </div>
                </div> :

                    <p className='text-center text-warning p-5'>No profiles to display</p>
                }

                {/* pagination */}

                <div className='d-flex align-items-center justify-content-center mt-3'>
                    <Pagination>{items}</Pagination>
                </div>
            </div>
            
        </>
    )
}

export default SavedCandidates