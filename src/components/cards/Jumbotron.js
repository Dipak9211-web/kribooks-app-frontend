function Jumbotron({title, subtitle}) {
  return (
    <div className="container-fluid jumbotron" style={{marginTop:"-8px", height:"200px"}}>
    <div className="row">
        <div className="col text-center p-4 ">
            <h1 className="fw-bold">{title}</h1>
            <p className="lead">{subtitle}</p>
        </div>
    </div>
    </div>
  )
}

export default Jumbotron