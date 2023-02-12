import { useState } from 'react';
import { Link } from "react-router-dom";
function Reset() {
  const [Ret, SetRet] = useState(0);
  function send(e) {
    e.preventDefault()
    fetch(process.env.REACT_APP_HOST + '/resetPass', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ email: document.getElementById('exampleInputEmail1').value })
    }).then(res => res.json()).then(final => { console.log(final.code);SetRet(final.code) });
  }

  return (
    <div className='custom-bg'>
      <form className="container more-dist" style={{ 'backgroundColor': 'transparent' }} onSubmit={send}>
        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label whi">Enter Reset Email Address</label>
          <input type="email" className="form-control wcontrol" id="exampleInputEmail1" aria-describedby="emailHelp" />
          {Ret === 1 ? <p className="uneroor">Password has been reset. Login to continue</p> :null}
          {Ret === 2 ? <p className="eroor">Invalid Email</p> :null}
          {Ret===0 ? <br></br>:null}
        </div>
        <div className="mb-3 form-check nlp">
          <Link to="/login">Go back to login?</Link>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default Reset;