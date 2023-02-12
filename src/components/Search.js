import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import dis from "./images/disabled.png"
import down from "./images/down.png"
import up from "./images/up.png"

function Search() {
    if (!sessionStorage.getItem('flag')) {
        sessionStorage.setItem('flag', 0);
    }
    const [TwoDate, setTwoDate] = useState('none');
    const [Multi, setMulti] = useState('none');
    const [TableData, SetTableData] = useState(null);
    const [Max, SetMax] = useState(10);
    let [StarArr, SetStarArr] = useState([])
    let s = 'Completed'
    let [Og, SetOg] = useState(null);
    let dummy;


    function lougout() {
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
        setMulti('none');
        sessionStorage.setItem('dis','loading')
        alert("Your session has been terminated. Re-Login to continue")
    }

    function reset() {
        const all_img = document.getElementsByClassName("im");
        Array.from(all_img).forEach(item => item.src = dis);
        SetTableData(Og);
    }


    function sort(id, direc) {
        if (TableData != null) {
            let col=id.slice(-1);
            let tags = ['title', 'field', 'author', 'institute', 'date', 'status']
            let whatever;
            if (direc === "down") {
                whatever = [...TableData].sort(function (a, b) { return a[tags[col-1]].localeCompare(b[tags[col-1]]); }).reverse();
            }
            else {
                whatever = [...TableData].sort(function (a, b) { return a[tags[col-1]].localeCompare(b[tags[col-1]]); });
            }
            SetTableData(whatever);
        }
    }
    window.sort = sort;
    function change_img(id_ele) {
        let changee = document.getElementById(id_ele);
        let comp = changee.src;

        if (comp === dis) {
            reset();
            changee.src = down;
            sort(id_ele, "down");
        }

        if (comp === down) {
            reset();
            changee.src = up;
            sort(id_ele, "up");
        }

        if (comp === up) {
            reset();
            changee.src = down;
            sort(id_ele, "down");
        }

    }

    function dat_val(event) {
        let d1 = document.getElementById('date1');
        let d2 = document.getElementById('date2');
        if (event.target.value === 3) {
            setTwoDate('');
            d1.setAttribute("required", "");
            d2.setAttribute("required", "");
        }
        else {
            setTwoDate('none');
            d1.removeAttribute("required");
            d2.removeAttribute("required");
        }
    }

    function open() {
        if (sessionStorage.getItem('mfa')) {
            if (Multi === 'none') setMulti('');
            else setMulti('none');
        }
        else
            alert("Login to star and download research")
    }

    function wtv(event) {
        SetMax(event.target.value);
    }

    function star_handler(event, data) {
        sessionStorage.setItem('flag', 1);
        if (event.target.checked) {
            let dfdfh = [...StarArr, data];
            SetStarArr(dfdfh);
        }
        else {
            SetStarArr(StarArr.filter(item => item !== data));
        }
    }

    function star_handler2(bool, data) {
        sessionStorage.setItem('flag', 1);
        if (bool) {
            dummy = [...StarArr, data];
        }
        else {
            dummy = StarArr.filter(item => item !== data);
        }
        SetStarArr(dummy);
    }

    function star_uploader() {
        if (sessionStorage.getItem('flag') === 1) {
            fetch(process.env.REACT_APP_HOST+'/view-data/change-star', {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify({
                    new_arr: StarArr,
                    mfa: sessionStorage.getItem('mfa')
                })
            }).then(res => { if (res.terminate) lougout(); })
            sessionStorage.setItem('flag', 0)
        }
    }

    function request(e) {
        e.preventDefault();
        fetch(process.env.REACT_APP_HOST+'/view-data', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                title: document.getElementById('title').value,
                field: document.getElementById('field').value,
                status: document.getElementById('status_getter').value,
                institute: document.getElementById('insti').value,
                author: document.getElementById('author').value,
                pub: document.getElementById('date-select').value,
                date1: document.getElementById('date1').value,
                date2: document.getElementById('date2').value,
                mfa: sessionStorage.getItem('mfa')
            })
        }).then(res => res.json()).then(final => {
            SetTableData(final.array);
            SetOg(final.array);
            if (final.timeout) lougout();
            else SetStarArr(final.star)
        });
    }

    function Mod(props) {
        return (<div>
            <button type="button" className="btn btn-link" data-bs-toggle="modal" data-bs-target={'#buffer' + props.unique} style={{ 'color': 'black', 'textAlign': 'left' }}>{props.title}</button>
            <div className="modal" id={'buffer' + props.unique} tabIndex="-1" role="dialog" aria-hidden="true" style={{'position':'fixed'}}>
                <div className="modal-dialog" style={{'marginTop':'10%'}} role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Research Paper</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p>Title: <b>{props.title}</b></p>
                            <p>Author(s): {props.author}</p>
                            <p>Abstract:{props.abstract}</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            { (sessionStorage.getItem('mfa'))?
                                (StarArr.includes(props.unique)) ?
                                    <button type='button' className='btn btn-danger' data-bs-dismiss="modal" onClick={() => { star_handler2(false, props.unique) }}>UnStar</button>
                                    : <button type='button' className='btn btn-warning' data-bs-dismiss="modal" onClick={() => { star_handler2(true, props.unique) }}>Star</button>
                                : <div></div>
                            }
                            
                            <Link a="research_paper.pdf" className="btn btn-primary" download>Download</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        );
    }

    useEffect(() => { star_uploader() }, [StarArr]);

    return (
        <div>
            <form style={{ "margin": "0% 2% 2% 3%" }} onSubmit={request}>
                <div className="row dist-bot">
                    <div className="col">
                        <label>Title:</label>
                        <input type="text" className="form-control" id='title' placeholder="Search by Title"></input>
                    </div>
                    <div className="col">
                        <label>Field:</label>
                        <input type="text" className="form-control" id='field' placeholder="Search by Field"></input>
                    </div>

                    <div className="col">
                        <label>Entries:</label>
                        <input type="number" className="form-control" id='entries' placeholder="Enter No. of Entries, default=10" onChange={wtv}></input>
                    </div>

                    <div className="col-auto">
                        <label>Status</label>
                        <select className="form-select" id='status_getter'>
                            <option default value="Completed">Completed</option>
                            <option value="Ongoing">Ongoing</option>
                            <option value="Cancelled">Cancelled</option>
                            <option value="Paused">Paused</option>
                        </select>
                    </div>

                </div>
                <div className="row">
                    <div className="col" style={{ 'maxWidth': '200px' }}>
                        <label>Author:</label>
                        <input type="text" className="form-control" id='author' placeholder="Search by Author"></input>
                    </div>
                    <div className="col" style={{ 'maxWidth': '200px' }}>
                        <label>Institution:</label>
                        <input type="text" className="form-control" id='insti' placeholder="Search by Institution"></input>
                    </div>

                    <div className="col-auto">
                        <label>Published:</label>
                        <select className="form-select" onChange={dat_val} id="date-select">
                            <option default value="1">After</option>
                            <option value="2">Before</option>
                            <option value="3">Between</option>
                        </select>
                    </div>

                    <div className="col-auto">
                        <label className="hide">1</label><br></br>
                        <input type="date" className="form-control" id='date1' placeholder="Search by Date"></input>
                    </div>

                    <div className="col-auto" style={{ display: TwoDate }} id="changer">
                        <label className="hide">1</label><br></br>
                        <input type="date" className="form-control" id='date2' placeholder="Search by Date"></input>
                    </div>

                    <div className="col-auto">
                        <label className="hide">1</label><br></br>
                        <button type="button" className="btn btn-secondary" onClick={reset}>Reset</button>
                    </div>

                    <div className="col-auto">
                        <label className="hide">1</label><br></br>
                        <button type="button" className="btn btn-outline-warning" onClick={open}>Multi-Star</button>
                    </div>

                    <div className="col-auto">
                        <label className="hide">1</label><br></br>
                        <button type="submit" className="btn btn-primary" onClick={reset}>Search</button>
                    </div>

                </div>
            </form>


            <div className="container" style={{ 'overflowY': 'auto', 'backgroundColor': 'white', 'maxHeight': '400px' }}>
                <table className="table">
                    <thead>
                        <tr>
                            <th className='tab-wid-m'>Title<img src={dis} className="im" id="im1" onClick={()=>{change_img("im1")}}></img></th>
                            <th className='tab-wid'>Field <img src={dis} className="im" id="im2" onClick={()=>{change_img("im2")}}></img></th>
                            <th className='tab-wid'>Author <img src={dis} className="im" id="im3" onClick={()=>{change_img("im3")}}></img></th>
                            <th className='tab-wid'>Institution <img src={dis} className="im" id="im4" onClick={()=>{change_img("im4")}}></img></th>
                            <th className='tab-wid'>Date <img src={dis} className="im" id="im5" onClick={()=>{change_img("im5")}}></img></th>
                            <th className='tab-wid'>Status <img src={dis} className="im" id="im6" onClick={()=>{change_img("im6")}}></img></th>

                            <th>{(Multi === "none") ? (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-up-right" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z" />
                                <path fillRule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z" />
                            </svg>) : (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check2-square" viewBox="0 0 16 16">
                                <path d="M3 14.5A1.5 1.5 0 0 1 1.5 13V3A1.5 1.5 0 0 1 3 1.5h8a.5.5 0 0 1 0 1H3a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V8a.5.5 0 0 1 1 0v5a1.5 1.5 0 0 1-1.5 1.5H3z" />
                                <path d="m8.354 10.354 7-7a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z" />
                            </svg>)}</th>



                        </tr>
                    </thead>
                    <tbody>
                        {
                            (TableData != null) ?
                                TableData.slice(0, Math.min(TableData.length, Max)).map((ele) => {
                                    return (
                                        <tr key={ele._id}>
                                            <td><Mod title={ele.title} author={ele.author} abstract={ele.abstract} unique={ele._id} /></td>
                                            <td>{ele.field}</td>
                                            <td>{ele.author}</td>
                                            <td>{ele.institute}</td>
                                            <td>{ele.date}</td>
                                            <td>{ele.status}</td>
                                            <td>
                                                {(Multi === "none") ? (
                                                    <Link to={'/download.pdf'}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="grey" className="bi bi-file-earmark-arrow-down-fill" viewBox="0 0 16 16">
                                                        <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zm-1 4v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 0 1 .708-.708L7.5 11.293V7.5a.5.5 0 0 1 1 0z" />
                                                    </svg></Link>)
                                                    :
                                                    (
                                                        (StarArr.includes(ele._id) || 0) ?
                                                            <div className="form-check">
                                                                <input className="form-check-input" type="checkbox" checked={1} onChange={(e) => { star_handler(e, ele._id) }} />
                                                            </div>
                                                            :
                                                            <div className="form-check">
                                                                <input className="form-check-input" type="checkbox" onChange={(e) => { star_handler(e, ele._id) }} />
                                                            </div>
                                                    )
                                                }
                                            </td>
                                        </tr>
                                    );
                                })
                                : null
                        }
                    </tbody>
                </table>
            </div>

        </div>
    );
}

export default Search;