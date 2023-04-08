import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

function Register(props) {
    let navigate = useNavigate();

    const register = () => {
        var username = document.querySelector("#register_user-input").value;
        var password = document.querySelector("#register_pass-input").value;
        var pwdConfirm = document.querySelector("#register_passConfirm-input").value;
        var fullname = document.querySelector("#register_fullname-input").value;
        var email = document.querySelector("#register_email-input").value;
        
        console.log(password + " " + pwdConfirm)
        if(username === "" ||             // check if string is empty
            password === "" || 
            pwdConfirm === "" || 
            fullname === "" || 
            email === ""){
            props.showNotificationPopup('Cảnh báo', 'Các trường không được trống', '#ffc107')
        } else if(
            !username.replace(/\s/g, '').length ||         // check if string contains only space
            !password.replace(/\s/g, '').length || 
            !pwdConfirm.replace(/\s/g, '').length || 
            !fullname.replace(/\s/g, '').length || 
            !email.replace(/\s/g, '').length){
            props.showNotificationPopup('Cảnh báo', 'Phải có đầy đủ thông tin', '#ffc107')
        } else {
            if(pwdConfirm !== password){
                props.showNotificationPopup('Cảnh báo', 'Mật khẩu không trùng khớp', '#ffc107')
            } else {
                props.handleRegister(username, password, fullname, email)
            }
        }
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
                <div id="register_fullname-div">
                    <input type="text" placeholder="Họ tên" id="register_fullname-input"/>
                </div>
                <div id="register_email-div">
                    <input type="text" placeholder="Email" id="register_email-input"/>
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