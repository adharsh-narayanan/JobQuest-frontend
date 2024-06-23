import React from 'react'
import { baseUrl } from '../../services/baseUrl';
import FileDownloadIcon from '@mui/icons-material/FileDownload';



function AllCandidates({users}) {
  return (
    <>
    <div className='container-fluid w-100 rounded' style={{ height: '100dvh' }}>
                 <div className='' style={{ backgroundColor: 'white', color: 'black', height: '' }}>
                     <div className='mt-2 p-3'>
                         <h2>Applied Jobs</h2>
                     </div>
 
                     <div className='p-4 border table-responsive border-secondary'>
                         <table class="table table-striped">
                             <thead>
                                 <tr>
                                     <th scope="col">#</th>
                                     <th scope="col">Name</th>
                                     <th scope="col">Location</th>
                                     <th scope="col">phone</th>
                                     <th scope="col">E-mail</th>
                                     <th scope="col">Resume</th>
                                 </tr>
                             </thead>
                             <tbody>
                            {users?.map((user)=>(
                                <tr>
                                <th scope="row">2</th>
                                <td>{user.username}</td>
                                <td>{user.city}</td>
                                <td>{user.phone}</td>
                                <td className=''>{user.email}</td>
                                <td>
                                <div className='btn btn-success' onClick={() => window.open(`${baseUrl}/uploads/user/${user.resume}`, '_blank',)}>
                        <FileDownloadIcon /> 
                    </div>                              
                                </td>
                            </tr>
                            )) }
                                 
                             </tbody>
                         </table>
                     </div>
                 </div>
 
 
 
 
 
             </div>
    </>
  )
}

export default AllCandidates