import { Link} from "react-router-dom";
import { useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";


function Login() {
  const [raiseError, setRaiseError] = useState('none');
  const navigate = useNavigate();
  useEffect(()=>{
    if(sessionStorage.getItem('mfa')!=null){
      navigate('/profile');
    }
  },[])
  function send(e) {

    e.preventDefault();
    fetch(process.env.REACT_APP_HOST+'/login', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        email: document.getElementById('log_email').value,
        pass: document.getElementById('log_pass').value
      })
    })
      .then(response => response.json())
      .then(data => {
        if (data.auth != 'NonUser') {
          const eve = new CustomEvent('change-nav', {
            detail: {
              type: data.auth,
              nme : data.nme
            }
          });
          window.dispatchEvent(eve);
          console.log(data.nme)
          sessionStorage.setItem('mfa', data.mfa);
        }
        else {
          setRaiseError(data.err);
        }
      });
  }
  return (
    <div className="custom-bg">
      <br></br>
      <center> <h1 className="bigg whi" id="txt"> Common Login Form </h1> </center>
      <br></br><br></br>
      <form onSubmit={send} className="container" id="loginn">
        <div className="mb-3">
          <label className="form-label whi">Email address</label>
          <input type="email" className="form-control wcontrol" id="log_email" aria-describedby="emailHelp" required></input>
          {raiseError == 'wrong_email' ? <p className="eroor">Incorrect Email</p> : <div />}
        </div>
        <div className="mb-3">
          <label className="form-label whi">Password</label>
          <input type="password" className="form-control wcontrol" id="log_pass" required></input>
          {raiseError == 'wrong_password' ? <p className="eroor">Incorrect Password</p> : <div />}
        </div>
        <div className="mb-3 form-check nlp">
          <Link to="/resetPassword">Having Trouble signing in?</Link>
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>

    </div>);
}



export default Login;

