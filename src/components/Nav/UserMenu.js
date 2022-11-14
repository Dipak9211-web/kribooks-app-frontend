import React from 'react'
import { NavLink } from 'react-router-dom'

function UserMenu() {
  return (
    <>
            <div className="p-3 mb-2 mt-2 bg-light">User Links</div>
               <ul className='list-group list-unstyle'>
                  <li>
                    <NavLink className="list-group-item" to="/dashboard/user/profile">
                      Profile
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="list-group-item" to="/dashboard/user/orders">
                       Orders
                    </NavLink>
                  </li>
               </ul>
    </>
  )
}

export default UserMenu