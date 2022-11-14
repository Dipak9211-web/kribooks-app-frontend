import React from 'react'

function CategoryForm({value, setValue, handleSubmit, buttonText="Submit", handleDelete}) {
  return (
    <>
            <div className="p-3">
                <form onSubmit={handleSubmit}>
                   <input type="text" value={value} onChange={(e)=>setValue(e.target.value)} className="form-control p-3" placeholder='write category name' />
                 <div className="d-flex justify-content-between">
                 <button type='submit' className='btn btn-primary mt-3'>
                  {buttonText}
                  </button>
                  {handleDelete && <button type='submit' onClick={handleDelete} className='btn btn-danger mt-3'> delete</button>}
                 </div>
                </form>
            </div>
    </>
  )
}

export default CategoryForm