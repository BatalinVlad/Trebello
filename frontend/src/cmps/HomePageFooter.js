import React from 'react'
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';

const sendMail = (mail) => {
    window.open('mailto:' + mail);
}

const HomePageFooter = () => {
    return (
        <footer className="home-page-footer z1">
            <div className='about-container-wrapper relative'>
                <span>created by</span>
                <div className="about-container flex">
                    <div className="info fill-width flex column ">
                        <div className="flex">
                            <p>Vlad Batalin</p>
                            <div>
                                <a href="https://www.linkedin.com/in/vlad-batalin-647725180/" target="blank">
                                    <LinkedInIcon className="linkedInIcon"></LinkedInIcon></a>
                                <EmailIcon onClick={() => sendMail('batalinvlad@gmail.com')} className="mail" />
                            </div>
                        </div>
                        <p className="bold uppercase">Full-stack developer</p>
                    </div>

                </div>
                <div className="creator-img absolute pointer"> </div>
            </div>
        </footer>
    )
}

export default HomePageFooter