import React, { useState } from 'react'
import {color} from "../styles/style"
function index() {
  const [email,setEmail]=useState()
  const [password,setPassword]=useState()

  return (
    <div className='w-screen h-screen overflow-hidden fle flex-row'>
<div
  className="h-full w-full xl:w-7/10 lg:w-3/5 md:w-1/2 aling-center "
  style={{ backgroundColor: color.mainThemeColor }}
>
</div>

    </div>
  )
}

export default index
