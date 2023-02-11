import { Link } from "react-router-dom";
function Home(){
    return(
        <center className='custom-bg' style={{"paddingTop": "10%"}}>
        <div className="container">
          <h1 className="whi">Research Activity Bank</h1>
          <p className="whi">This is the aggregation of all research projects happening in universities across the world in different subject fields.</p>
          <br></br>
          <Link to="/view-data" className="btn btn-primary">View research Data</Link>
        </div>
      </center>);
};
 

export default Home;