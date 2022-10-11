import React, { useEffect } from 'react'
import './index.scss'
import One from './One'
import Two from './Two'
import Three from './Three'
import Four from './Four'
function DetailCount({ imges }: any) {
  useEffect(() => {
      let arrs = document.getElementsByClassName('nav')
      let arr:any = Array.from(arrs)
      arr.forEach((item:any) => {
        item.addEventListener('click', function (e: any) {
          var target = e.target
          if (target.nodeName === 'LI') {
            let number = target.value;
            // console.log(arr[number].offsetTop)
            document.documentElement.scrollTop = arr[number].offsetTop-100
          }
        })
    })

  }, [])
  return (
    <div className='details-count'>
      <div className='details-count-one'>
        <One imges={imges} />
      </div>
      <div className='details-count-two'>
        <Two />
      </div>
      <div className='details-count-three'>
        <Three />
      </div>
      <div className='details-count-Four'>
        <Four />
      </div>
    </div>
  )
}

export default DetailCount