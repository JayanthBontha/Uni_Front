import {useState,useEffect} from 'react';
import { Link } from "react-router-dom";
function Reset(){
  const [Var,SetVar] = useState(localStorage.getItem("log") || "NonUser");

  useEffect(() => {
      window.addEventListener('storage', (e) => {
        SetVar(e.newValue);
      });
    }, []);
    return(
      <div className='custom-bg'>
      <form className="container more-dist" style={{'backgroundColor':'transparent'}}>
      <div className="mb-3">
        <label for="exampleInputEmail1" className="form-label whi">Enter Reset Email Address</label>
        <input type="email" className="form-control wcontrol" id="exampleInputEmail1" aria-describedby="emailHelp"></input>
      </div>
      <div className="mb-3 form-check nlp">
        {Var=="NonUser" ?
      <Link to="/login">Go back to login?</Link>:<div></div>
        }
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
    </div>
    );
}

export default Reset;