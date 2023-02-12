import React, {useEffect } from 'react';
import { Link} from "react-router-dom";
import { useNavigate } from 'react-router';


function logout() {
    const eve = new CustomEvent('change-nav', {
        detail: {
            type: "NonUser"
        }
    });
    window.dispatchEvent(eve);
    sessionStorage.setItem('NavbarVar','NonUser');
    fetch(process.env.REACT_APP_HOST+'/logout',{
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({mfa:sessionStorage.getItem('mfa')
        })
    })
    sessionStorage.removeItem('mfa');
    sessionStorage.setItem('dis','loading')

}
function Navbar_user(props) {
    return (<nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{ "zIndex": 99999 }}>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="/">Home</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/view-data">View Data</Link>
                </li>
            </ul>
            <ul className="navbar-nav ms-auto" style={{ "marginRight": "3rem" }}>
                <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        {props.UsrNam}
                    </button>
                    <ul className="dropdown-menu">
                        <li><Link className="dropdown-item" type="button" to={"/profile"}>View Profile</Link></li>
                        <li><Link className="dropdown-item" type="button" to={"/changePass"}>Change Password</Link></li>
                        {props.bool ?
                            <li><Link className="dropdown-item" type="button" to={"/modify"}>Modify Data</Link></li> : <div></div>}
                        <li><Link className="dropdown-item" type="button" onClick={logout} to={"/"}>Logout</Link></li>
                    </ul>
                </div>
            </ul>
        </div>
    </nav>);
}

function Navbar() {
    return (<nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{ "zIndex": 99999 }}>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="/">Home</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/view-data">View Data</Link>
                </li>
            </ul>
            <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/signUp">Sign Up</Link>
                </li>
            </ul>
        </div>
    </nav>);
}

function Mix(props) {
    const navigate = useNavigate();

    useEffect(() => {
        let any = window.location.href.split('/').slice(-1);
      if (props.Var != 'NonUser') {
        if(any=='login' || any=='signUp')
        navigate('/profile');
      }
    },[props.Var]);


    if (props.Var == "NonUser") {
        return (<Navbar />);
    }
    else {

        if (props.Var == "user")
            return (<Navbar_user bool={false} UsrNam={props.UsrNam}/>);
        if (props.Var == "admin")
            return (<Navbar_user bool={true} UsrNam={props.UsrNam}/>);
    }
}

export default Mix;