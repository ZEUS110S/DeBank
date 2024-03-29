import React from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";

function RandomQuestion(props){
    // init when editFlg = 1
    const [title, setTitle] = useState("");
    const [subject, setSubject] = useState("1");
    const [diff, setDiff] = useState("Dễ");
    const [grade, setGrade] = useState("10");
    const [isCorrect, setIsCorrect] = useState("A");
    const [answer1, setAnswer1] = useState("")
    const [answer2, setAnswer2] = useState("")
    const [answer3, setAnswer3] = useState("")
    const [answer4, setAnswer4] = useState("")
    const location = useLocation()
    const {editFlg, question} = location.state;

    // init when editflg = 0
    const [updateTitle, setUpdateTitle] = useState(question.questioN_TITLE);
    const [updateSubject, setUpdateSubject] = useState(question.subjecT_NAME === null ? "Math" : question.subjecT_NAME);
    const [updateDiff, setUpdateDiff] = useState(question.difficulty);
    const [updateGrade, setUpdateGrade] = useState(question.grade);
    const [updateIsCorrect, setUpdateIsCorrect] = useState(question.answer);
    const [updateAnswer1, setUpdateAnswer1] = useState(question.answeR_1)
    const [updateAnswer2, setUpdateAnswer2] = useState(question.answeR_2)
    const [updateAnswer3, setUpdateAnswer3] = useState(question.answeR_3)
    const [updateAnswer4, setUpdateAnswer4] = useState(question.answeR_4)

    const titleChange = (e) => {
        setTitle(e.target.value)
    }

    const subjectChange = (e) => {
        setSubject(e.target.value);
    }

    const diffChange = (e) => {
        setDiff(e.target.value);
    }

    const gradeChange = (e) => {
        setGrade(e.target.value);
    }

    const isCorrectChange = (e) => {
        setIsCorrect(e.target.value)
    }

    const answer1Change = (e) => {
        setAnswer1(e.target.value)
    }

    const answer2Change = (e) => {
        setAnswer2(e.target.value)
    }

    const answer3Change = (e) => {
        setAnswer3(e.target.value)
    }

    const answer4Change = (e) => {
        setAnswer4(e.target.value)
    }

    const updateTitleChange = (e) => {
        setUpdateTitle(e.target.value)
    }

    const updateSubjectChange = (e) => {
        setUpdateSubject(e.target.value);
    }

    const updateDiffChange = (e) => {
        setUpdateDiff(e.target.value);
    }

    const updateGradeChange = (e) => {
        setUpdateGrade(e.target.value);
    }

    const updateIsCorrectChange = (e) => {
        setUpdateIsCorrect(e.target.value)
    }

    const updateAnswer1Change = (e) => {
        setUpdateAnswer1(e.target.value)
    }

    const updateAnswer2Change = (e) => {
        setUpdateAnswer2(e.target.value)
    }

    const updateAnswer3Change = (e) => {
        setUpdateAnswer3(e.target.value)
    }

    const updateAnswer4Change = (e) => {
        setUpdateAnswer4(e.target.value)
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
        var grade = document.querySelector('#grade').value;

        if(questionTitle === "" ||
           answer1 === "" ||
           answer2 === "" ||
           answer3 === "" ||
           answer4 === "" ||
           !questionTitle.replace(/\s/g, '').length ||
           !answer1.replace(/\s/g, '').length ||
           !answer2.replace(/\s/g, '').length ||
           !answer3.replace(/\s/g, '').length ||
           !answer4.replace(/\s/g, '').length){
            props.showNotificationPopup('Cảnh báo', 'Các trường không được trống', '#ffc107')
        } else {
            console.log(subjects + " " + diffs)
            props.addQuestion(questionTitle, subjects, props.userID, answer1, answer2, answer3, answer4, isCorrectAnswer, diffs, grade)
        }
    }

    const update = () => {
        console.log(question)

        var questionTitle = document.querySelector("#questionTitle").value;
        var subjects = document.querySelector("#subjects").value;
        var diffs = document.querySelector("#difficulties").value;
        var answer1 = document.querySelector("#answer1").value;
        var answer2 = document.querySelector("#answer2").value;
        var answer3 = document.querySelector("#answer3").value;
        var answer4 = document.querySelector("#answer4").value;
        var isCorrectAnswer = document.querySelector("#isCorrect").value;
        var grade = document.querySelector('#grade').value;
        var subjectID;

        if(questionTitle === "" ||
           answer1 === "" ||
           answer2 === "" ||
           answer3 === "" ||
           answer4 === "" ||
           !questionTitle.replace(/\s/g, '').length ||
           !answer1.replace(/\s/g, '').length ||
           !answer2.replace(/\s/g, '').length ||
           !answer3.replace(/\s/g, '').length ||
           !answer4.replace(/\s/g, '').length){
            props.showNotificationPopup('Cảnh báo', 'Các trường không được trống', '#ffc107')
        } else {
            switch(subjects){
                case "Math":
                    subjectID = 1;
                    break;
                case "Chemistry":
                    subjectID = 2;
                    break;
                case "Physics":
                    subjectID = 3;
                    break;
                case "Biology":
                    subjectID = 4;
                    break;
                case "History":
                    subjectID = 5;
                    break;
                case "Geography":
                    subjectID = 6;
                    break;
                case "English":
                    subjectID = 7;
                    break;
                default:
                    break;
            }
            props.updateQuestion(question.questioN_ID, questionTitle, subjectID, props.userID, answer1, answer2, answer3, answer4, isCorrectAnswer, diffs, grade);
        }
    }

    if(editFlg === '1'){
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
                            <td id="td-question"><input type="text" id="questionTitle" name="questionTitle" spellCheck="false" value={title} onChange={titleChange} placeholder="Nhập câu hỏi ở đây" style={{width: '500px'}}/></td>
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
                                <input type="text" id="answer1" name="answer1" style={{width: '300px'}} value={answer1} onChange={answer1Change} placeholder="Đáp án A"/>
                            </td>
                        </tr>
                        <tr id="tr-question">
                            <td id="td-question">B</td>
                            <td id="td-question">
                                <input type="text" id="answer2" name="answer2" style={{width: '300px'}} value={answer2} onChange={answer2Change} placeholder="Đáp án B"/>
                            </td>
                        </tr>
                        <tr id="tr-question">
                            <td id="td-question">C</td>
                            <td id="td-question">
                                <input type="text" id="answer3" name="answer3" style={{width: '300px'}} value={answer3} onChange={answer3Change} placeholder="Đáp án C"/>
                            </td>
                        </tr>
                        <tr id="tr-question">
                            <td id="td-question">D</td>
                            <td id="td-question">
                                <input type="text" id="answer4" name="answer4" style={{width: '300px'}} value={answer4} onChange={answer4Change} placeholder="Đáp án D"/>
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
                <div id="submit-btn">
                    <button onClick={() => submit()}>Tạo câu hỏi</button>
                </div>
            </div>
        )
    }

    if(editFlg === '0'){
        return (
            <div id="body">
                <div id="sub-header">
                    <h2>Cập nhật câu hỏi</h2>
                    <hr />  
                </div>
                <table id="table-question">
                    <tbody>
                        <tr id="tr-question">
                            <td id="td-question">Câu hỏi</td>
                            <td id="td-question"><input type="text" id="questionTitle" name="questionTitle" value={updateTitle} onChange={updateTitleChange} spellCheck="false" style={{width: '500px'}}/></td>
                        </tr>
                        <tr id="tr-question">
                            <td id="td-question">Lớp</td>
                            <td id="td-question">
                                <select name="grade" id="grade" value={updateGrade}  onChange={updateGradeChange}>
                                    <option value="10">10</option>
                                    <option value="11">11</option>
                                    <option value="12">12</option>
                                </select>
                            </td>
                        </tr>
                        <tr id="tr-question">
                            <td id="td-question">Môn</td>
                            <td id="td-question">
                                <select name="subjects" id="subjects" value={updateSubject} onChange={updateSubjectChange}>
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
                            <select name="difficulties" id="difficulties" value={updateDiff} onChange={updateDiffChange}>
                                <option value="easy">Dễ</option>
                                <option value="normal">Thường</option>
                                <option value="hard">Khó</option>
                            </select>
                            </td>
                        </tr>
                        <tr id="tr-question">
                            <td id="td-question">A</td>
                            <td id="td-question">
                                <input type="text" id="answer1" name="answer1" spellCheck="false" style={{width: '300px'}} value={updateAnswer1} onChange={updateAnswer1Change} placeholder="Đáp án A"/>
                            </td>
                        </tr>
                        <tr id="tr-question">
                            <td id="td-question">B</td>
                            <td id="td-question">
                                <input type="text" id="answer2" name="answer2" spellCheck="false" style={{width: '300px'}} value={updateAnswer2} onChange={updateAnswer2Change} placeholder="Đáp án B"/>
                            </td>
                        </tr>
                        <tr id="tr-question">
                            <td id="td-question">C</td>
                            <td id="td-question">
                                <input type="text" id="answer3" name="answer3" spellCheck="false" style={{width: '300px'}} value={updateAnswer3} onChange={updateAnswer3Change} placeholder="Đáp án C"/>
                            </td>
                        </tr>
                        <tr id="tr-question">
                            <td id="td-question">D</td>
                            <td id="td-question">
                                <input type="text" id="answer4" name="answer4" spellCheck="false" style={{width: '300px'}} value={updateAnswer4} onChange={updateAnswer4Change} placeholder="Đáp án D"/>
                            </td>
                        </tr>
                        <tr id="tr-question">
                            <td id="td-question">Đáp án</td>
                            <td id="td-question">
                                <select name="isCorrect" id="isCorrect" value={updateIsCorrect} onChange={updateIsCorrectChange}>
                                    <option value="A">A</option>
                                    <option value="B">B</option>
                                    <option value="C">C</option>
                                    <option value="D">D</option>
                                </select>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div id="update-btn">
                    <button onClick={() => update()}>Cập nhật câu hỏi</button>
                </div>
            </div>
        )
    }
    
}

export default RandomQuestion