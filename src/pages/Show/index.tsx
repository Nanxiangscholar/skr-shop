import React,{memo} from 'react'
import './index.scss'
import Cards from 'components/Cards';

const Show = () => {
  return (
    <div className='Show'>
          <Cards />
          <Cards />
          <Cards />
          <Cards />
    </div>
  )
}

export default memo(Show)
