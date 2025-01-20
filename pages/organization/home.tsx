import React from 'react'
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';
import HelpIcon from '@mui/icons-material/Help';
import Link from 'next/link'
import QRCode from '../Component/QRCanvas';
import PrivateRoutesNavBar from '@/assets/privateRoutesNavBar';
import UserPass from '../Component/UserPass';
import PassPreview from '@/pages/Component/passPreview';
import { useRouter } from 'next/router';
import DoorwayDetailsModel from '../Component/Models/DoorwayDetailsModel';
function home() {
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
    return (
        <div className='flex flex-col  w-full '>
            <div className='flex justify-center w-full m-auto'>
                {<PrivateRoutesNavBar />}
            </div>
            <div className='pt-6'>
                <div className='min-md:grid grid-cols-2 justify-between'>
                    <div className='justify-center w-[90%] items-start mx-auto flex'>
                        <UserPass />
                    </div>
                    <div className='mx-auto min-md:ml-12 min-md:mr-0 max-w-[550px]'>
                        <div className="justify-center min-md:justify-start flex items-center gap-[5px] text-[16px] text-[#526B85] mb-[20px] mt-[24px] min-md:mt-[0px]">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="1em" height="1em" fill="currentColor" className="inline-block mx-1">
                                <path fill-rule="evenodd" d="M8 14.933a1 1 0 0 0 .1-.025q.114-.034.294-.118c.24-.113.547-.29.893-.533a10.7 10.7 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.8 11.8 0 0 1-2.517 2.453 7 7 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7 7 0 0 1-1.048-.625 11.8 11.8 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 63 63 0 0 1 5.072.56">
                                </path>
                            </svg>Manage Nextuf Store's Doorways
                        </div>
                        <div className="my-4">
                            <Link className="border-2 border-gray-300 flex items-center justify-between pl-4 min-sm:pl-6 pr-1.5 py-1.5 rounded text-gray-400 text-sm " href="/doorways">
                                <div className="flex items-center gap-[15px]"><SupervisorAccountIcon sx={{ width: "1rem", height: 20 }} />
                                    Doorways &amp; Users
                                </div>
                                <div className="ml-1 rounded p-1 min-md:p-2 bg-themeColor">
                                    <KeyboardArrowRightIcon sx={{ width: 24, height: 24, color: "white" }} />
                                </div></Link>
                        </div>
                        <div className="my-4">
                            <Link className="border-2 border-gray-300 flex items-center justify-between pl-4 min-sm:pl-6 pr-1.5 py-1.5 rounded text-gray-400 text-sm " href="/doorways">
                                <div className="flex items-center gap-[15px]"><AutoAwesomeIcon sx={{ width: "1rem", height: 20 }} />
                                    Design Template
                                </div>
                                <div className="ml-1 rounded p-1 min-md:p-2 bg-themeColor">
                                    <KeyboardArrowRightIcon sx={{ width: 24, height: 24, color: "white" }} />
                                </div></Link>
                        </div>
                        <div className="my-4">
                            <Link className="border-2 border-gray-300 flex items-center justify-between pl-4 min-sm:pl-6 pr-1.5 py-1.5 rounded text-gray-400 text-sm " href="/doorways">
                                <div className="flex items-center gap-[15px]"><SettingsIcon sx={{ width: "1rem", height: 20 }} />
                                    Organisation Settings
                                </div>
                                <div className="ml-1 rounded p-1 min-md:p-2 bg-themeColor">
                                    <KeyboardArrowRightIcon sx={{ width: 24, height: 24, color: "white" }} />
                                </div></Link>
                        </div>
                        <hr className='my-4 mt-8' />
                        <div className="mt-[24px] justify-center min-md:justify-start flex items-center gap-[10px] text-[#526B85] mb-[10px]">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="1em" height="1em" fill="currentColor" className="text-[#CFD5E7]">
                                <path d="M6.5 2a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1zM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0">
                                </path>
                                <path d="M4.5 0A2.5 2.5 0 0 0 2 2.5V14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2.5A2.5 2.5 0 0 0 11.5 0zM3 2.5A1.5 1.5 0 0 1 4.5 1h7A1.5 1.5 0 0 1 13 2.5v10.795a4.2 4.2 0 0 0-.776-.492C11.392 12.387 10.063 12 8 12s-3.392.387-4.224.803a4.2 4.2 0 0 0-.776.492z">
                                </path>
                            </svg>
                            Default Doorway
                        </div>
                        <div>
                            <div className='hidden min-md:block mb-3'>
                               <p className="mt-[18px] min-md:mt-0 text-[14px] font-bold">Scan QR code to save to Apple Wallet</p>
                               <div className='rounded-[8px] shadow-lg w-[145px] h-[145px] p-[10px] flex items-center justify-center mt-[8px] mb-[25px]'>
                                <QRCode/>
                               </div>
                               <Link target="_system" rel="noreferrer" href="https://app.doorway.io/download/17e3a251-4916-4c09-bf18-3b54cb72c250.pkpass?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzYW1pX3VsbGFoNzFAb3V0bG9vay5jb20iLCJ0eXAiOiJnZXRfY2FyZCIsImV4cCI6MTczNzA0Njk1Mn0.qBpT9gkcLAZ-ymBBI8HxQuYDSearJtgkRAm8qa4WEBY" className="text-[15px] text-themeColor">
                               Save via PC
                               </Link>
                            </div>
                            <div className="block min-md:hidden mb-3 flex flex-col items-center">
                            <p className="mt-[20px] text-[16px] font-bold">
                            Save to Wallet:
                            </p>
  
                            </div>
                        </div>
                        <Link className="text-[15px] text-themeColor min-md:inline block text-center" href="/account">I have an Android</Link>
                        <div className="my-4">
                            <div className="border-2 border-gray-300 flex items-center justify-between pl-4 min-sm:pl-6 pr-1.5 py-1.5 rounded text-gray-400 text-sm " role='button' onClick={toggleModal}>
                                <div className="flex items-center gap-[15px]"><PersonIcon sx={{ width: "1rem", height: 20 }} />
                                   My Doorway
                                </div>
                                <div className="ml-1 rounded p-1 min-md:p-2 bg-themeColor">
                                    <KeyboardArrowRightIcon sx={{ width: 24, height: 24, color: "white" }} />
                                </div></div>
                        </div>
                        <div className="my-4">
                            <Link className="border-2 border-gray-300 flex items-center justify-between pl-4 min-sm:pl-6 pr-1.5 py-1.5 rounded text-gray-400 text-sm " href="/doorways">
                                <div className="flex items-center gap-[15px]"><HelpIcon sx={{ width: "1rem", height: 20 }} />
                                    Get Help
                                </div>
                                <div className="ml-1 rounded p-1 min-md:p-2 bg-themeColor">
                                    <KeyboardArrowRightIcon sx={{ width: 24, height: 24, color: "white" }} />
                                </div></Link>
                        </div>
                    </div>
                </div>
            </div>
            {isModalOpen && <DoorwayDetailsModel onClose={closeModal}/>}
        </div>
    )
}

export default home