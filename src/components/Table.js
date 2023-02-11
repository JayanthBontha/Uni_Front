import Mod from "./modal";
import {useState} from "react";

function Table(props){
    let [Skipper,SetSkipper] = useState([])
    function deleter(i){
        let wtv = [...Skipper,i];
        SetSkipper(wtv);
    }


    return(
        <div className="container" style={{'maxHeight': '400px','overflowY':'auto'}}>
        <table className="table back-white">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Field</th>
                    <th>Author</th>
                    <th>Institution </th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Link</th>
                </tr>
            </thead>
            <tbody>
                {
                    props.table.slice(0, Math.min(props.table.length+Skipper.length, 10+Skipper.length)).map((ele) => {
                        if(!Skipper.includes(ele._id))
                        return (
                            <tr key={ele._id}>
                                <td><Mod title={ele.title} author={ele.author} abstract={ele.abstract} idee={ele._id} flag={deleter} /></td>
                                <td>{ele.field}</td>
                                <td>{ele.author}</td>
                                <td>{ele.institute}</td>
                                <td>{ele.date}</td>
                                <td>{ele.status}</td>
                                <td>
                                    lnk
                                </td>
                            </tr>
                        );
                    })
                }
            </tbody>
        </table>
    </div>
    );
}

export default Table;