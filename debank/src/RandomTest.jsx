import React from "react";
import { useState } from "react";
import axios from "axios";

function RandomTest(){
    const [subject, setSubject] = useState("1");
    const [diff, setDiff] = useState("Dễ");
    // const [json, setJson] = useState([])

    const subjectChange = (e) => {
        setSubject(e.target.value);
    }

    const diffChange = (e) => {
        setDiff(e.target.value);
    }

    const createForm = () => {
        var subject_name = "Chemistry"
        var difficulty = "easy"

        axios.get(
            "http://localhost:5133/api/Questions/SUBJECT_NAME,DIFFICULTY",
            {
                params: {
                    SUBJECT_NAME: subject_name,
                    DIFFICULTY: difficulty
                },
                headers:{
                    'Access-Control-Allow-Origin': true
                },
                proxy:{
                    protocol: 'https',
                    host: "0799-115-76-54-96.ap.ngrok.io",
                }
            }
        )
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err))

        // fetch("https://0799-115-76-54-96.ap.ngrok.io/api/Questions",{
        //     mode: "cors",
        //     headers: {
        //         'Access-Control-Allow-Origin': true
        //     }
        // })
        // .then(res => res.json()).then(console.log);
    }

    return (
        <div id="body">
            <div id="sub-header">
                <h2>Tạo đề thi</h2>
                <hr />  
            </div>
            <table id="table-question">
                <tbody>
                    <tr id="tr-question">
                        <td id="td-question">Môn</td>
                        <td id="td-question">
                            <select name="subjects" id="subjects" value={subject} onChange={subjectChange}>
                                <option value="1">Toán</option>
                                <option value="2">Văn</option>
                                <option value="3">Anh</option>
                            </select>
                        </td>
                    </tr>
                    <tr id="tr-question">
                        <td id="td-question">Độ khó</td>
                        <td id="td-question">
                        <select name="difficulties" id="difficulties" value={diff} onChange={diffChange}>
                            <option value="Dễ">Dễ</option>
                            <option value="Thường">Thường</option>
                            <option value="Khó">Khó</option>
                        </select>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div style={{margin: '10px auto 0 auto', width: '50px'}}>
                <button id="downloadPDF" onClick={createForm}>submit</button>
            </div>
        </div>
    )
}
// () => createForm()

// await axios.get(
        //     "https://284f-2402-800-639a-c0b8-2460-1d2d-62c1-cbfb.ap.ngrok.io/api/questions?SUBJECT_ID="+subject, 
        //     {
        //         headers:{
        //             'Access-Control-Allow-Origin': '*'
        //         }
        //     }
        // )
export default RandomTest