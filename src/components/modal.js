import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function Mod(props) {
  let navigate = useNavigate();
  function del(id) {
    fetch(process.env.REACT_APP_HOST+'/profile/del', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        mfa: sessionStorage.getItem('mfa'),
        idee: id
      })
    }).then(res => res.json()).then(final=>{
      if (final.done)
        props.flag(props.idee);
      else {
        alert("Your session has expired. Relogin to continue")
        const eve = new CustomEvent('change-nav', {
          detail: {
            type: "NonUser"
          }
        });
        window.dispatchEvent(eve);
        sessionStorage.setItem('NavbarVar', 'NonUser');
        fetch(process.env.REACT_APP_HOST+'/logout', {
          method: 'POST',
          headers: { 'Content-type': 'application/json' },
          body: JSON.stringify({
            mfa: sessionStorage.getItem('mfa')
          })
        })
        sessionStorage.removeItem('mfa');
        navigate('/login');
      }
    })
  }
  return (<div>
    <button type="button" className="btn btn-link" data-bs-toggle="modal" data-bs-target={'#buffer' + props.idee} style={{ 'color': 'black', 'textAlign': 'left' }}>{props.title}</button>

    <div className="modal" id={'buffer' + props.idee} tabIndex="-1" role="dialog" aria-labelledby="researchModalLabel" aria-hidden="true" style={{'position':'fixed !important'}}>
      <div className="modal-dialog" style={{'marginTop':'10%'}} role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="researchModalLabel">Research Paper</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <p>Title: <b>{props.title}</b></p>
            <p>Author(s): {props.author}</p>
            <p>Abstract:{props.abstract}</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type='button' className='btn btn-danger' data-bs-dismiss="modal" onClick={() => { del(props.idee) }}>UnStar</button>
            <Link a="research_paper.pdf" className="btn btn-primary" download>Download</Link>
          </div>
        </div>
      </div>
    </div></div>

  );
}



export default Mod;