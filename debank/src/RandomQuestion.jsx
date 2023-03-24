import React from "react";
import { useState } from "react";

function RandomQuestion(props){
    const [subject, setSubject] = useState("1");
    const [diff, setDiff] = useState("Dễ");
    // const [grade, setGrade] = useState("10");
    const [isCorrect, setIsCorrect] = useState("A");

    const subjectChange = (e) => {
        setSubject(e.target.value);
    }

    const diffChange = (e) => {
        setDiff(e.target.value);
    }

    // const gradeChange = (e) => {
    //     setGrade(e.target.value);
    // }

    const isCorrectChange = (e) => {
        setIsCorrect(e.target.value)
    }

    const submit = () => {
        var questionTitle = document.querySelector("#questionTitle").value;
        var subjects = document.querySelector("#subjects").value;
        var diffs = document.querySelector("#difficulties").value;
        var answer1 = document.querySelector("#answer1").value;
        var answer2 = document.querySelector("#answer2").value;
        var answer3 = document.querySelector("#answer3").value;
        var answer4 = document.querySelector("#answer4").value;
        var isCorrectAnswer = document.querySelector("#isCorrect").value;

        console.log(subjects + " " + diffs)

        props.addQuestion(questionTitle, subjects, props.userID, answer1, answer2, answer3, answer4, isCorrectAnswer, diffs)
    }

    return (
        <div id="body">
            <div id="sub-header">
                <h2>Tạo câu hỏi</h2>
                <hr />  
            </div>
            <table id="table-question">
                <tbody>
                    <tr id="tr-question">
                        <td id="td-question">Câu hỏi</td>
                        <td id="td-question"><input type="text" id="questionTitle" name="questionTitle" style={{width: '500px'}}/></td>
                    </tr>
                    {/* <tr id="tr-question">
                        <td id="td-question">Lớp</td>
                        <td id="td-question">
                            <select name="grade" id="grade" value={grade} onChange={gradeChange}>
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                            </select>
                        </td>
                    </tr> */}
                    <tr id="tr-question">
                        <td id="td-question">Môn</td>
                        <td id="td-question">
                            <select name="subjects" id="subjects" value={subject} onChange={subjectChange}>
                                <option value="1">Toán</option>
                                <option value="2">Hoá</option>
                                <option value="3">Lý</option>
                                <option value="4">Sinh</option>
                                <option value="5">Sử</option>
                                <option value="6">Địa</option>
                                <option value="7">Anh</option>
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
                        <td id="td-question">A</td>
                        <td id="td-question">
                            <input type="text" id="answer1" name="answer1" style={{width: '300px'}}/>
                        </td>
                    </tr>
                    <tr id="tr-question">
                        <td id="td-question">B</td>
                        <td id="td-question">
                            <input type="text" id="answer2" name="answer2" style={{width: '300px'}}/>
                        </td>
                    </tr>
                    <tr id="tr-question">
                        <td id="td-question">C</td>
                        <td id="td-question">
                            <input type="text" id="answer3" name="answer3" style={{width: '300px'}}/>
                        </td>
                    </tr>
                    <tr id="tr-question">
                        <td id="td-question">D</td>
                        <td id="td-question">
                            <input type="text" id="answer4" name="answer4" style={{width: '300px'}}/>
                        </td>
                    </tr>
                    <tr id="tr-question">
                        <td id="td-question">Đáp án</td>
                        <td id="td-question">
                            <select name="isCorrect" id="isCorrect" value={isCorrect} onChange={isCorrectChange}>
                                <option value="A">A</option>
                                <option value="B">B</option>
                                <option value="C">C</option>
                                <option value="D">D</option>
                            </select>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div style={{margin: '10px auto 0 auto', width: '50px'}}>
                <button onClick={() => submit()}>submit</button>
            </div>
        </div>
    )
}

export default RandomQuestion