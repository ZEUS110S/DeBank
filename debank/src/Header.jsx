import React from "react";
import { Link } from "react-router-dom";

function Header(props){
    const openProfileBox = (e) => {
        e.preventDefault();
        props.openProfileBox();
    }

    // temp
    const question = {
        subjecT_NAME: "",
        difficulty: "easy",
        grade: 10,
        questioN_TITLE: "",
        answeR_1: "",
        answeR_2: "",
        answeR_3: "",
        answeR_4: "",
        answeR: ""
    }

    return (
        <header id="header">
            <div id="header-top">
                <h2 id="title">DEBANK</h2>
                <div id="user-box" style={{display: 'flex', alignItems: 'center'}}>
                    Welcome,&nbsp;
                    <a href="/login" onClick={openProfileBox}>{props.name}</a>
                </div>
            </div>
            <div id="nav-box">
                <ul id="nav-bar">
                    <li className="nav-item">
                        <Link to="/home">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/randomTest">Tạo đề thi</Link>               
                    </li>
                    <li className="nav-item">
                        <Link to="/randomQuestion" state={{editFlg: '1', question: question}}>Tạo câu hỏi</Link>               
                    </li>
                    <li className="nav-item">
                        <Link to="/news">Tin tức</Link>
                    </li>
                </ul>
            </div>
        </header>
    )
}

export default Header