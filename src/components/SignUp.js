import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Sign() {
  const navigate = useNavigate();
  const [emailError, setEmailError] = useState('none');
  function send(e) {
    e.preventDefault();
    const var_pass = document.getElementById('pass').value;
    const var_repass = document.getElementById('repass').value;
    if (var_pass != var_repass) {
      setEmailError('same_nahi');
    }
    else {
      fetch(process.env.REACT_APP_HOST + "/signUp", {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({
          name: document.getElementById('name').value,
          email: document.getElementById('email').value,
          insti: document.getElementById('insti').value,
          role: document.getElementById('role').value,
          pass: var_pass
        })
      }).then(res => res.json())
        .then(data => {
          if (data.code == 'successful') {
            const eve = new CustomEvent('change-nav', {
              detail: {
                type: data.kind,
                nme: document.getElementById('name').value
              }
            });
            window.dispatchEvent(eve);
            sessionStorage.setItem('mfa', data.mfa)
            navigate('/profile')
          }
          else if (data.code == 'exists') {
            setEmailError('wrong_hai');
          }
        });
    }
  }


  return (
    <div className="custom-bg">
      <form onSubmit={send} className="container more-dist back-white" style={{ "maxWidth": "800px" }} >
        <div className="row">
          <div className="col-md-5 dist marleft">
            <label for="inputEmail4">Full Name</label>
            <input type="text" className="form-control wcontrol3" id="name" placeholder="Enter your Full Name" required></input>
          </div>
          <div className="col-md-5 dist">
            <label for="inputEmail4">Email</label>
            <input type="email" className="form-control wcontrol2" id="email" placeholder="Enter your Email" required></input>
            {emailError == 'wrong_hai' ? <p className="eroor">Email already exists</p> : <div />}
          </div>
        </div>
        <br></br>
        <div className="row">
          <div className="col-md-5 marleft">
            <label for="inputPassword4">Password</label>
            <input type="password" className="form-control wcontrol2" id="pass" placeholder="Password" required pattern='^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$' />
          </div>
          <div className="col-md-5">
            <label for="inputPassword4"> Re-enter Password</label>
            <input type="password" className="form-control wcontrol2" id="repass" placeholder="Re-enter Password" required></input>
            {emailError == 'same_nahi' ? <p className="eroor">Enter the same password</p> : <div />}
          </div>

        </div>
        <br></br>
        <div className="row">
          <div className="col-md-5 dist marleft">
            <label for="inputEmail4">Institution</label>
            <input type="text" className="form-control wcontrol2" id="insti" placeholder="Your Institution Name" required></input>
          </div>
          <div className="col-md-5 dist">
            <label for="inputEmail4">Role</label>
            <input type="text" className="form-control wcontrol2" id="role" placeholder="Enter your designation" required></input>
          </div>
        </div>
        <br></br>
        <button type="submit" className="btn btn-primary dist-bot marleft">Sign Up</button>
      </form>
      <br></br>
    </div>
  );
}

export default Sign;