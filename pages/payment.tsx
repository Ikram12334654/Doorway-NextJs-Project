import React from 'react'

function Payment() {
    const ArrowSvg=()=>(              <svg
        className="InlineSVG Icon Header-backArrow mr2 Icon--sm mt-1"
        focusable="false"
        width="12"
        height="12"
    
        viewBox="0 0 16 16"
      >
        <path
          d="M3.417 7H15a1 1 0 0 1 0 2H3.417l4.591 4.591a1 1 0 0 1-1.415 1.416l-6.3-6.3a1 1 0 0 1 0-1.414l6.3-6.3A1 1 0 0 1 8.008 2.41z"
          fill-rule="evenodd"
        ></path>
      </svg>)
  return (
    <div className='w-full h-full  justify-center'>
      <div className='flex flex-row lg:flex-col  w-[992px] lg:w-[480px] sm:w-[320px] m-auto'>
         <div className='w-[50%] p-6 flex flex-col '>
         <header className="Header" style={{backgroundColor: "#fff"}}>
  <div className="Header-content flex-container justify-content-space-between align-items-stretch">
    <div className="Header-business flex-item width-grow flex-container align-items-center">
      <a
        className="Link Header-businessLink Link--primary"
        href="https://app.doorway.io/register?canceled=true"
        aria-label="Back to Dorway Ltd"
        title="Dorway Ltd"
        target="_self"
      >
        <div style={{position: "relative"}}>
          <div className="flex-container align-items-center">
           
            <div className="flex flex-row space-x-2" style={{opacity: 1, transform: "none"}}>
              <ArrowSvg/>
              <div className="HeaderImage HeaderImage--logo flex-item width-fixed flex-container justify-content-center align-items-center">
                    <img
                        alt="Dorway Ltd logo"
                        src="https://d1wqzb5bdbcre6.cloudfront.net/e442c63ed5d0adaaf3e26e0ceec350c7b70c5bd6dd2d6e5b6f63fd807d0bfd76/68747470733a2f2f66696c65732e7374726970652e636f6d2f66696c65732f4d44423859574e6a64463878536d7452566d68476131647462323144557a563466475a6662476c325a56394d6257684361325a7359555a795557745852316c524f4459335633705255445930307461775458765251"
                        className="HeaderImage-img"
                        loading="lazy"
                    />
                    <span className="Header-businessLink-label hidden">Back</span>
                    </div>

            </div>

            

          </div>
        </div>
      </a>
    </div>
  </div>
</header>

         </div>
         <div className='w-[50%] p-6 flex flex-col '>
           
         </div>
      </div>
    </div>
  )
}

export default Payment