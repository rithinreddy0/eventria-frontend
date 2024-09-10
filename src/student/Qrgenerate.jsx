import React, { useState } from 'react'
import ReactDOM from "react-dom";
import QRCode from "react-qr-code";

export default function Qrgenerate({value}) {
  return (
    <div>
      <div className='lg:w-[400px] mt-8 w-[200px] flex justify-center items-center '>
  <QRCode
    size={100}
    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
    value={value}
    
    />
    </div>  
    </div>
  )
}
