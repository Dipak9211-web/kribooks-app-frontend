import React from 'react'
import { NavLink } from 'react-router-dom'

function AdminMenu() {
  return (
    <>
            <div className="p-3 mb-2 mt-2 bg-light">Admin Link</div>
               <ul className='list-group list-unstyle'>
                  <li>
                    <NavLink className="list-group-item" to="/dashboard/admin/category">
                       Create category
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="list-group-item" to="/dashboard/admin/product">
                       Create product
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="list-group-item" to="/dashboard/admin/products">
                       View Products
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="list-group-item" to="/dashboard/admin/orders">
                       Manage Orders
                    </NavLink>
                  </li>
               </ul>
    </>
  )
}

export default AdminMenu