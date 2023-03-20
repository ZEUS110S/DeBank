import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

function Register(props) {
    let navigate = useNavigate();

    const register = () => {
        var username = document.querySelector("#username").value;
        var password = document.querySelector("#password").value;
        var fullname = document.querySelector("#fullname").value;
        var email = document.querySelector("#email").value;
        var dob = document.querySelector("#year").value + "-" + document.querySelector("#month").value + "-" + document.querySelector("#day").value;
        // console.log(username);
        // console.log(password);
        // console.log(fullname);
        // console.log(dob);
        // console.log(email);
        props.handleRegister(username, password, fullname, dob, email)
    }

    return (
        <div id="container">
            <div id="registerBox">
                <button id="register_loginBack-btn" onClick={() => navigate("/login")}>
                    <FontAwesomeIcon size="1x" icon={faArrowLeft}/>&nbsp;&nbsp;
                    Quay lại đăng nhập
                </button>
                <div id="register_logo-div">
                    <span>DEBANK</span>
                </div>
                <div id="register_title-div">
                    <span>Đăng ký tài khoản DeBank</span>
                </div>
                <div id="register_user-div">
                    <input type="text" placeholder="Tài khoản" id="register_user-input"/>
                </div>
                <div id="register_pass-div">
                    <input type="password" placeholder="Mật khẩu" id="register_pass-input"/>
                </div>
                <div id="register_passConfirm-div">
                    <input type="password" placeholder="Xác nhận mật khẩu" id="register_passConfirm-input"/>
                </div>
                <button id="register_reg-btn" onClick={register}>Đăng ký</button>
            </div>
        </div>
    )
}

export default Register;