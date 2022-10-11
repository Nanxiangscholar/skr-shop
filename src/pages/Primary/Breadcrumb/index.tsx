import React from 'react'
import { NavLink } from 'react-router-dom';

export default function Breadcrumb({data}:any) {
  return (
    <div className='dev-wb-primary-Breadcrumb'>
        <div>
          <span>
            <span>
              <NavLink to={'/home'}>Home</NavLink>
            </span>
            <span className='dev-wb-primary-Breadcrumb-separator'>/</span>
          </span>
          <span>
            <span>Primary</span>
            <span></span>
          </span>
        </div>
      </div>
  )
}
