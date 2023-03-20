import React from "react";
// import { useState } from "react";
import { Routes, Route, useNavigate, Navigate, Link } from "react-router-dom";
import Header from './Header'
import Footer from './Footer'

import './App.css';
import RandomTest from "./RandomTest";
import RandomQuestion from "./RandomQuestion";
import News from './News'
import Home from "./Home";
import axios from "axios";
import Login from "./Login";
import Register from "./Register";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faUser } from "@fortawesome/free-solid-svg-icons";
import Profile from "./Profile";

function App(){
  // const [success, setSuccess] = useState(false)
  let navigate = useNavigate();

  const handleSubmit = (username, password) => {
    // setSuccess(success => !success)
    
    axios.post("https://3cbf-2402-800-639a-b391-c048-f291-3706-8fa9.ap.ngrok.io/api/Users/Login",
    {},
    {
      params: {
        USERNAME: username,
        PASSWORD: password
      }
    })
      .then(res => {
        console.log(res.data)
        // set local storage
        if(res.data.length === 0){
          localStorage.setItem('isSuccess', JSON.stringify(false))
        } else {
          localStorage.setItem('isSuccess', JSON.stringify(true))
          navigate("/home")
        }
      })
    // localStorage.setItem('isSuccess', JSON.stringify(true))
    // navigate("/home")
  }

  const openProfileBox = () => {
    // setSuccess(success => !success)
    document.querySelector('#profile-div').style.display = 'block'
    if(document.querySelector('#profile-modal').classList.contains("reversed")){
      document.querySelector('#profile-modal').classList.remove('reversed')
      document.querySelector('#profile-modal').classList.add('animated')
    } else {
      document.querySelector('#profile-modal').classList.add('animated')
    }
    // localStorage.setItem('isSuccess', JSON.stringify(false))
    // navigate("/login")
  }

  const test = () => {
    document.querySelector('#profile-modal').classList.remove("animated")
    document.querySelector('#profile-modal').classList.add('reversed')
    setTimeout(() => {
      document.querySelector('#profile-div').style.display = 'none'
    }, 1000)
  }

  const logoutTest = (e) => {
    e.preventDefault();
    localStorage.setItem('isSuccess', JSON.stringify(false))
    navigate("/login")
  }

  const handleRegister = (username, password, fullname, dob, email) => {
    // setSuccess(success => !success);
    axios.post(
      "https://284f-2402-800-639a-c0b8-2460-1d2d-62c1-cbfb.ap.ngrok.io/api/Users", 
      {
        "username": username,
        "password": password,
        "fullname": fullname,
        "dob": dob,
        "email": email
      }
    )
    .then(res => console.log(res.data))
    localStorage.setItem('isSuccess', JSON.stringify(true))
    navigate("home")
  }

  if(!JSON.parse(localStorage.getItem('isSuccess'))){
    return (
      <Routes>
        <Route path="/" element={<Navigate to="/login"/>}></Route>
        <Route path="/login" element={<Login handleLogin={handleSubmit}/>}></Route>
        <Route path="/register" element={<Register handleRegister={handleRegister}/>}></Route>
      </Routes>
    )
  }
  return (
    <div style={{position: 'relative'}}>
      <div className="homepage">
        <Header openProfileBox={openProfileBox}/>
            <Routes>
                <Route path="/" element={<Navigate to="/home"/>}></Route>
                <Route exact path="/home" element={<Home />}></Route>
                <Route exact path="/randomTest" element={<RandomTest />}></Route>
                <Route exact path="/randomQuestion" element={<RandomQuestion />}></Route>
                <Route exact path="/news" element={<News />}></Route>
                <Route exact path="/profile" element={<Profile />}></Route>
            </Routes>
        <Footer />
      </div>
      <div id="profile-div">
          <div id="profile-modal">
            <button id="closeBtn" onClick={test}>
              <FontAwesomeIcon size="2x" icon={faXmark} />
            </button>
            <div id="profile-info-box">
              <div id="profile-info">
                <FontAwesomeIcon size="3x" icon={faUser}/>
                <div id="profile-id">
                  <span id="fullname">Bằng Nguyễn</span>
                  <br />
                  <span id="mail">nguyenvubang011001hiie@gmail.com</span>
                </div>
              </div>
              <hr/>
              <div id="profile-link-div">
                <Link to="/profile" id="profile-link" onClick={test}>Trang cá nhân</Link>
              </div>
              <hr style={{borderTop: '1px solid black'}}/>
              <div id="profile-config">
                <a href="/settings">Cài đặt</a>
                <a href="/login" onClick={logoutTest}>Đăng xuất</a>
              </div>
            </div>
          </div>
      </div>
    </div>
  )
}

export default App;