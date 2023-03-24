import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-regular-svg-icons";

function Header(props){
    const openProfileBox = (e) => {
        e.preventDefault();
        props.openProfileBox();
    }

    return (
        <header id="header">
            <div id="header-top">
                <h2 id="title">DEBANK</h2>
                <div id="search-box">
                    <input id="search-bar" type="text" placeholder="&#xf002;&nbsp;Tìm kiếm"/>
                </div>
                <div id="user-box" style={{display: 'flex', alignItems: 'center'}}>
                    <div id="notification-icon">
                        <a href="/login" onClick={openProfileBox} id="icon">
                            <FontAwesomeIcon size="2x" icon={faBell}/>
                        </a>
                        <div id="noti-box">

                        </div>
                    </div>
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
                        <Link to="/randomQuestion">Tạo câu hỏi</Link>               
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