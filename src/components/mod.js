function M() {
  function send(){
    fetch(process.env.REACT_APP_HOST+'/modifyData', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ mfa: sessionStorage.getItem('mfa') })
      });
  }
  return (<center><form action="/" method="post" enctype="multipart/form-data">
    <div className="col-auto">
      <label for="file">Upload an Excel file :</label>
      <input class="form-control" type="file" id="formFile" accept=".xls, .xlsx" style={{ 'maxWidth': '200px' }} />
    </div>
    <div>
      <br></br>
      <button className='btn btn-primary' type="submit">Submit</button>
    </div>
  </form></center>
  );
}

export default M;

