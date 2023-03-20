import { useNavigate } from "react-router-dom";

function Login(props){
    let navigate = useNavigate();

    const login = () => {
        var username = document.querySelector("#login_user-input").value;
        var password = document.querySelector("#login_pass-input").value;
        console.log(username + " | " + password)
        props.handleLogin(username, password)
    }

    return (
        <div id="container">
            <div id="loginBox">
                <div id="login_logo-div">
                    <span>DEBANK</span>
                </div>
                <div id="login_title-div">
                    <span>Đăng nhập vào DeBank</span>
                </div>
                <div id="login_user-div">
                    <input type="text" placeholder="Tài khoản" id="login_user-input"/>
                </div>
                <div id="login_pass-div">
                    <input type="password" placeholder="Mật khẩu" id="login_pass-input"/>
                </div>
                <button id="login_login-btn" onClick={login}>Đăng nhập</button>
                <button id="login_reg-btn" onClick={() => navigate("/register")}>Đăng ký</button>
                <div id="login_forget-btn">
                    <span>Quên mật khẩu?</span>
                </div>
            </div>
        </div>
    )
}

export default Login;