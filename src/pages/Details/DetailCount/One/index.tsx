import React from 'react'

function One({imges}:any) {
  return (
    <>
      <ul className="nav">
        <li value={0} className="on">DETAIL</li>
        <li value={1}>REVIEW( 98 )</li>
        <li value={2}>Q&amp;A( 65 )</li>
        <li value={3}>RETURN &amp; DELIVERY</li>
      </ul>
      <ul className='on-mine'>
          {
            imges.map((item:any,i:number)=>{
              return <li key={i}><img src={item.small} alt=""/></li>
            })
          }
      </ul>
    </>
  )
}

export default One