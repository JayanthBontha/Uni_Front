import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
function M() {
  let navigate = useNavigate();
  const [Eror, SetEror] = useState(0)
  useEffect(() => {
    if (sessionStorage.getItem('NavbarVar') !== 'admin') {
      navigate('/profile');
    }
  }, []);

  function send(e) {
    e.preventDefault();
    const formData = new FormData();
    const file = document.querySelector('input[type="file"]').files[0];
    formData.append("file", file);
    formData.append("mfa", sessionStorage.getItem('mfa'));

    fetch(process.env.REACT_APP_HOST + '/modify', {
      method: "POST",
      body: formData
    }).then(res => res.json()).then(ans => {
      if (ans.code === 0) {
        alert("Data has been uploaded");
        SetEror(0);
        document.querySelector("form").reset();
      }
      else if (ans.code === 3) {
        const eve = new CustomEvent('change-nav', {
          detail: {
            type: "NonUser",
            nme: 'loading'
          }
        });
        window.dispatchEvent(eve);
        sessionStorage.setItem('NavbarVar', 'NonUser');
        fetch(process.env.REACT_APP_HOST + '/logout', {
          method: 'POST',
          headers: { 'Content-type': 'application/json' },
          body: JSON.stringify({
            mfa: sessionStorage.getItem('mfa')
          })
        })
        sessionStorage.removeItem('mfa');
        alert("Your session has been terminated. Re-Login to continue");
        navigate('/terminate')
      }
      else SetEror(ans.code);
    })
  }

  return (<center><form onSubmit={send}>
    <div className="col-auto">
      <label for="file">Upload an Excel file :</label>
      <input className="form-control" type="file" id="formFile" accept=".xls, .xlsx" style={{ 'maxWidth': '200px' }} required />
      {Eror === 1 ? <p className="eroor">Recheck Headers</p> : null}
      {Eror === 2 ? <p className="eroor">Make sure data is valid</p> : null}
    </div>
    <div>
      <br></br>
      <button className='btn btn-primary' type="submit">Submit</button>
    </div>
  </form></center>
  );
}

export default M;

