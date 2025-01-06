import React from 'react'

function SaveToWallet() {
  return (
<div className='flex flex-col items-center'>
    <div className='block text-[25px] min-md:text-[50px] heading-[58px] font-[600] mb-[8px]  text-center max-w-[920px] mx-auto'>Save to Wallet</div>
    <div className='block text-[16px] heading-[25px] mb-[38px] min-md:mb-[38px] font-[400] text-center max-w-[287px] min-md:max-w-full'>
        <div className='block min-md:hidden'>Tap the button to save your Doorway to your Apple Wallet or Google Pay</div>
        <div className='hidden min-md:block'>Scan the QR code to save your Doorway to your Apple Wallet or Google Pay</div>
    </div>
    <div className='flex-col items-center hidden min-md:flex'>
    <div className='rounded-[8px] shadow-md w-[240px] h-[240px] p-[30px] flex items-center justify-center mb-[26px]'></div>
    <a href="" className='text-[15px] text-electricGreen w-[240px] flex items-center justify-center mb-[26px]'>Download Apple Wallet file</a>
    </div>
   
    <button className='bg-themeColor w-[170px] text-white cursor-pointer text-[15px] font-[500] heading-[14px] rounded-[5px] py-[12px] min-md:py-[14px] text-center'>Next</button>

  
</div>
  )
}

export default SaveToWallet