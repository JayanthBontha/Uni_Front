import { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom'
function Change() {
    function lougout() {
        sessionStorage.setItem('flag',0);
        const eve = new CustomEvent('change-nav', {
            detail: {
                type: "NonUser"
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
        sessionStorage.setItem('dis', 'loading')
        alert("Your session has been terminated. Re-Login to continue")
    }

    let navigate = useNavigate();
    useEffect(() => {
        if (sessionStorage.getItem('mfa') == null) {
            navigate('/login');
            return;
        }
    }, []);

    let [Error,SetError]= useState(null);
    function send(e) {
        e.preventDefault();
        let cur = document.getElementById('cur_pass').value;
        let newe = document.getElementById('new_pass').value;
        let re = document.getElementById('re_pass').value;
        if(newe!=re){
            SetError(2);
        }
        else{
            fetch(process.env.REACT_APP_HOST+'/changePass', {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify({
                  oldpass:cur,
                  newpass:newe,
                  mfa:sessionStorage.getItem('mfa')
                })
              }).then(res=>res.json()).then(final=>{
                if(final.error===null) alert('Password Changed');
                else if(final.error===1) SetError(1);
                else{
                    lougout();
                }
              })
        }

    }
    return (
        <div className='custom-bg'>
            <form onSubmit={send}>
                <div className="row">
                    <div className="col-md-5 dist marleft">
                        <label for="inputEmail4" className='whi'>Current Password</label>
                        <input type="password" className="form-control wcontrol3" id="cur_pass" placeholder="Enter your Current Password" required></input>
                        {Error == 1 ? <p className="eroor">Incorrect Password</p> : <div />}
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-5 dist marleft">
                        <label for="inputEmail4" className='whi'>Enter New Password</label>
                        <input type="password" className="form-control wcontrol3" id="new_pass" placeholder="Enter your New Password" required></input>
                        {Error == 2 ? <p className="eroor">New Passwords should match</p> : <div />}
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-5 dist marleft">
                        <label for="inputEmail4" className='whi'>Re-enter New Password</label>
                        <input type="password" className="form-control wcontrol3" id="re_pass" placeholder="Re-Enter your New Password" required></input>
                    </div>
                </div>
                <button type='submit' className='marleft btn btn-primary' style={{ 'marginTop': '2%', 'marginLeft': '1%' }}>Submit</button>
            </form>
        </div>
    );
}


export default Change;