import { faFacebook, faInstagram, faLinkedin, faSquareXTwitter } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'


function FooterFile() {
  return (
   <>
   <footer className='container'>
    <div className='container pt-5'>
       <h2 style={{color:'green',fontSize:"2rem",fontWeight:'600'}}>Job Quest</h2>
       <hr />
    </div>

    <div className='w-100  d-flex justify-content-center  align-items-center flex-column  text-light'>

<div className='w-100 row d-flex justify-content-evenly  ' >


    <div className='col-md-4  mt-5  website' >
        <div className='w-75'>
            <h4 style={{fontWeight:'400',color:"black"}}> About Us</h4>
            <p style={{ color: 'black', textAlign: `justify` }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, nemo, magni harum nesciunt reiciendis, consequuntur repellendus ipsam .</p>
        </div>
    </div>

   {/*  <div className='col-md-2 mt-5'>
        <h4  style={{fontWeight:'400',color:"black"}}>Quick Links</h4>

        <ul className='m-0 p-0 ' style={{ listStyle: `none` }}>

            <li><Link style={{ textDecoration: "none", fontSize: '18px' }} to={'/'}>Home</Link></li>
            <li><Link style={{ textDecoration: "none", fontSize: '18px' }} to={'/project'}>Project</Link></li>
            <li><Link style={{ textDecoration: "none", fontSize: '18px' }} to={'/dashboard'}>Dashboard</Link></li>
            
        </ul>
    </div>

    <div className='col-md-2 mt-5'>
        <h4  style={{fontWeight:'400',color:"black"}}>Tech Used</h4>

        <ul className='m-0 p-0 ' style={{ listStyle: `none`,color:"black" }}>

            <li>React</li>                          
            <li>Bootswatch</li>
            <li>Bootstrap</li>
        </ul>
    </div> */}


    <div className=' col-md-4 contact mt-5' >
        <h4  style={{fontWeight:'400',color:"black"}}>Contact Us</h4>
        
        
         <div className='p-0'>
                    <ul className='m-0 p-0 ' style={{listStyle:"none",color:"black"}}>
                        <li>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</li>
                        <li><Link>jobqueryinfo@demo.com</Link></li>
                    </ul>
                
               
                <div className='d-flex text-dark mt-3 fs-4 justify-content-around pt-2'>
                    <FontAwesomeIcon style={{ cursor: "pointer" }} icon={faInstagram} />
                    <FontAwesomeIcon style={{ cursor: "pointer" }} icon={faFacebook} />
                    <FontAwesomeIcon style={{ cursor: "pointer" }} icon={faSquareXTwitter} />
                    <FontAwesomeIcon style={{ cursor: "pointer" }} icon={faLinkedin} />
                </div>
               
         </div>
    </div>

</div>

<div>
    <p>Copyright &copy; 2024 AdharshNarayanan. Built with react</p>
</div>
</div>

   </footer>

   </>
  )
}

export default FooterFile