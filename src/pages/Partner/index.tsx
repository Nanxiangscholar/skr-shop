import React from 'react'
import marketing from '../../assets/image/following/img_marketing.jpg'
import '../../themes/Partner/index.scss'


const Partner = () => {
  return (
    <div className='partner'>
      <div className='partner_text'>营销联盟</div>
      <div className='partner_img'>
        <img src={marketing} alt="" />
      </div>
    </div>
  )
}

export default Partner