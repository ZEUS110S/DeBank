import React from "react";
import { useState } from "react";
import axios from "axios";
import {jsPDF} from 'jspdf';
import { callAddFont } from "./calibri-normal";

function RandomTest(){
    const [subject, setSubject] = useState("1");
    const [diff, setDiff] = useState("Dễ");

    const subjectChange = (e) => {
        setSubject(e.target.value);
    }

    const diffChange = (e) => {
        setDiff(e.target.value);
    }

    const createForm = () => {
        var subject_name = document.querySelector("#subjects").value;
        var difficulty = document.querySelector("#difficulties").value;

        // get questions from db using API
        axios.get(
            "http://localhost:5133/api/Questions/SUBJECT_NAME,DIFFICULTY",
            {
                params: {
                    SUBJECT_NAME: subject_name,
                    DIFFICULTY: difficulty
                },
                headers:{
                    'Access-Control-Allow-Origin': true
                }
            }
        )
        .then(res => res.data)
        .then(data => {
            // init x and y for pdf text coordination
            var x = 10;
            var y = 10;

            var yA = 20;
            var xA = 10;
            // create PDF
            jsPDF.API.events.push(["addFonts", callAddFont]);
            const doc = new jsPDF();
            
            doc.setFont("calibri", "normal") // set custom font
            doc.setFontSize(10) // set font size
            data.forEach((question, index) => {
                doc.text((index + 1) + ". " + question.questioN_TITLE, x, y, {maxWidth: 195})
                doc.text("A. " + question.answeR_1, xA, yA, {maxWidth: 190})
                doc.text("B. " + question.answeR_2, xA, yA + 5, {maxWidth: 190})
                doc.text("C. " + question.answeR_3, xA, yA + 10, {maxWidth: 190})
                doc.text("D. " + question.answeR_4, xA, yA + 15, {maxWidth: 190})
                y += 35
                yA += 35
            }); // loop over all elements in array to add question to pdf
            doc.save("a4.pdf") // save and download final pdf file
        })
        .catch((err) => console.log(err))        
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
                                <option value="Chemistry">Hoá</option>
                                <option value="Biology">Sinh</option>
                                <option value="English">Anh</option>
                            </select>
                        </td>
                    </tr>
                    <tr id="tr-question">
                        <td id="td-question">Độ khó</td>
                        <td id="td-question">
                        <select name="difficulties" id="difficulties" value={diff} onChange={diffChange}>
                            <option value="easy">Dễ</option>
                            <option value="normal">Thường</option>
                            <option value="hard">Khó</option>
                        </select>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div style={{margin: '10px auto 0 auto', width: '50px'}}>
                <button id="downloadPDF" onClick={() => createForm()}>submit</button>
            </div>
        </div>
    )
}
export default RandomTest