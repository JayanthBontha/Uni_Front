import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Table from './Table';

function Prof2() {
  const [Profdata, setProfdata] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {
    if (sessionStorage.getItem('mfa') == null) {
      navigate('/login');
    }
    else {
      if (Profdata === null) {
        fetch(process.env.REACT_APP_HOST+'/profile', {
          method: 'POST',
          headers: { 'Content-type': 'application/json' },
          body: JSON.stringify({ mfa: sessionStorage.getItem('mfa') })
        }).then(response => response.json())
          .then(json => {
            if (json._id == null) {
              // const eve = new CustomEvent('terminate');
              // window.dispatchEvent(eve);
              sessionStorage.removeItem('mfa');
              const eve2 = new CustomEvent('change-nav', {
                detail: {
                  type: "NonUser"
                }
              });
              window.dispatchEvent(eve2);
              navigate('/terminate');
            }
            else {
              setProfdata({
                name: json.name,
                email: json.email,
                role: json.role,
                insti: json.insti,
                starred:json.starred
              });
            }
          });
      }
    }
  }, []);

  if (!Profdata) {
    return <p>Loading...</p>
  }

  return (
  <section className="eee" style={{'minHeight':'100vh'}}>

    <div className="row">
      <div className="col-lg-4">
        <div className="card mb-4">
          <div className="card-body text-center">
            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp" alt="avatar"
              className="rounded-circle img-fluid" style={{ "width": "150px", "padding": "10px" }}></img>
            <h5 className="my-3">{Profdata.name}</h5>
            <p className="text-muted mb-1">{Profdata.role}</p>
            <p className="text-muted mb-4">{Profdata.insti}</p>
          </div>
        </div>
      </div>
      <div className="col-lg-8">
        <div className="card mb-4">
          <div className="card-body">
            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0">Full Name</p>
              </div>
              <div className="col-sm-9">
                <p className="text-muted mb-0">{Profdata.name}</p>
              </div>
            </div>
            <hr></hr>
            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0">Email</p>
              </div>
              <div className="col-sm-9">
                <p className="text-muted mb-0">{Profdata.email}</p>
              </div>
            </div>
            <hr></hr>
            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0">Institution</p>
              </div>
              <div className="col-sm-9">
                <p className="text-muted mb-0">{Profdata.insti}</p>
              </div>
            </div>
          </div>
        </div>
        <center><h4 className="mb-4">Starred Research</h4></center>
        <Table table={Profdata.starred}/>
      </div>
    </div>
  </section>);
}

export default Prof2;