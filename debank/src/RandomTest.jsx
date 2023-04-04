import React from "react";
import { useState } from "react";
import axios from "axios";
import {jsPDF} from 'jspdf';
import { callAddFont } from "./calibri-normal";

function RandomTest(props){
    window.scrollTo(0,0)
    const [subject, setSubject] = useState("1");
    const [diff, setDiff] = useState("Dễ");
    const [grade, setGrade] = useState("10");

    const subjectChange = (e) => {
        setSubject(e.target.value);
    }

    const diffChange = (e) => {
        setDiff(e.target.value);
    }

    const gradeChange = (e) => {
        setGrade(e.target.value);
    }

    const createForm = () => {
        var subject_name = document.querySelector("#subjects").value;
        var difficulty = document.querySelector("#difficulties").value;
        var grade = document.querySelector("#grade").value;

        // get questions from db using API
        axios.get(
            "http://localhost:5133/api/Questions/SUBJECT_NAME,DIFFICULTY,GRADE",
            {
                params: {
                    SUBJECT_NAME: subject_name,
                    DIFFICULTY: difficulty,
                    GRADE: grade
                },
                headers:{
                    'Access-Control-Allow-Origin': true
                }
            }
        )
        .then(res => res.data)
        .then(data => {
            if(data.length !== 0){
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
                    if((index + 1) % 8 === 0){
                        if((index + 1) !== 40){
                            doc.addPage();
                        }
                        x = 10;
                        y = 10;

                        yA = 20;
                        xA = 10;
                    }
                });
                doc.save("a4.pdf") // save and download final pdf file
                // document.querySelector('#success1-text').style.display = 'block'
                // setTimeout(() => {
                //     document.querySelector('#success1-text').style.display = 'none'
                // }, 2000);
                props.showNotificationPopup('Thành công', 'Tạo đề thành công', '#0ec47d')
            } else {
                props.showNotificationPopup('Thất bại', 'Tạo đề thất bại', '#f76860')
            }
        })
        .catch((err) => {
            props.showNotificationPopup('Thất bại', 'Tạo đề thất bại', '#f76860')
        })        
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
                                <option value="Math">Toán</option>
                                <option value="Chemistry">Hoá</option>
                                <option value="Physics">Lý</option>
                                <option value="Biology">Sinh</option>
                                <option value="History">Sử</option>
                                <option value="Geography">Địa</option>
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
                    <tr id="tr-question">
                        <td id="td-question">Lớp</td>
                        <td id="td-question">
                            <select name="grade" id="grade" value={grade} onChange={gradeChange}>
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                            </select>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div id="submit-btn">
                <button id="downloadPDF" onClick={() => createForm()}>submit</button>
            </div>
        </div>
    )
}
export default RandomTest