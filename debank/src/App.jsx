import React from "react";
// import { useState } from "react";
import { Routes, Route, useNavigate, Navigate, Link } from "react-router-dom";
import { useState } from "react";
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
  let navigate = useNavigate();
  const [questionID, setQuestionID] = useState(0);

  const handleSubmit = (username, password) => {
    if(username === "" || password === "" || !username.replace(/\s/g, '').length || !password.replace(/\s/g, '').length){
      showNotificationPopup('Thất bại', 'Đăng nhập thất bại', '#f76860')
    } else {
      axios.post("http://localhost:5133/api/Users/Login",
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
            showNotificationPopup('Thất bại', 'Đăng nhập thất bại', '#f76860')
          } else {
            localStorage.setItem('user_id', JSON.stringify(res.data[0].useR_ID))
            localStorage.setItem('username', JSON.stringify(res.data[0].username))
            localStorage.setItem('fullname', JSON.stringify(res.data[0].fullname))
            localStorage.setItem('email', JSON.stringify(res.data[0].email))
            localStorage.setItem('isSuccess', JSON.stringify(true))
            showNotificationPopup('Thành công', 'Đăng nhập thành công', '#0ec47d')
            setTimeout(() => {
              navigate("/home")
            }, 3000);
          }
        })
    }
  }

  const openProfileBox = () => {
    document.querySelector('#profile-div').style.display = 'block'
    if(document.querySelector('#profile-modal').classList.contains("reversed")){
      document.querySelector('#profile-modal').classList.remove('reversed')
      document.querySelector('#profile-modal').classList.add('animated')
    } else {
      document.querySelector('#profile-modal').classList.add('animated')
    }
  }

  const closeProfileBox = () => {
    document.querySelector('#profile-modal').classList.remove("animated")
    document.querySelector('#profile-modal').classList.add('reversed')
    setTimeout(() => {
      document.querySelector('#profile-div').style.display = 'none'
    }, 1000)
  }

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem('user_id')
    localStorage.removeItem('fullname')
    localStorage.removeItem('email')
    localStorage.setItem('isSuccess', JSON.stringify(false))
    navigate("/login")
  }

  const handleRegister = (username, password, fullname, email) => {
    axios.post(
      "http://localhost:5133/api/Users/Signup", 
      {
        "username": username,
        "password": password,
        "fullname": fullname,
        "email": email
      }
    )
    .then(res => {
      console.log(res.data)
      localStorage.setItem('isSuccess', JSON.stringify(true))
      showNotificationPopup('Thành công', 'Đăng ký tài khoản thành công', '#0ec47d')
      setTimeout(() => {
        navigate("home")
      }, 3000);
    })
    .catch((err) => {
      showNotificationPopup('Thất bại', 'Đăng ký tài khoản thất bại', '#f76860')
    })
  }

  const addQuestion = (questionTitle, subject, userID, answer1, answer2, answer3, answer4, answer, difficulty, grade) => {
    axios.post(
      "http://localhost:5133/api/Questions",
      {
          "questioN_TITLE": questionTitle,
          "subjecT_ID": subject,
          "useR_ID": userID,
          "answeR_1": answer1,
          "answeR_2": answer2,
          "answeR_3": answer3,
          "answeR_4": answer4,
          "answer": answer,
          "difficulty": difficulty,
          "grade": grade
      }
  )
      .then(res => {
        console.log(res.data)
        showNotificationPopup('Thành công', 'Tạo câu hỏi thành công', '#0ec47d')
        // reset form
        document.querySelector("#questionTitle").value = "";
        document.querySelector("#subjects").value = 1;
        document.querySelector("#difficulties").value = "easy";
        document.querySelector("#answer1").value = "";
        document.querySelector("#answer2").value = "";
        document.querySelector("#answer3").value = "";
        document.querySelector("#answer4").value = "";
        document.querySelector("#isCorrect").value = "A";
        document.querySelector('#grade').value = "10"
      })
      .catch((err) => {
        showNotificationPopup('Thất bại', 'Tạo câu hỏi thất bại', '#f76860')
      })
  }

  const openConfirmBox = (questionID) => {
    document.querySelector('#popup-div').style.display = 'block'
    if(document.querySelector('#popup-modal').classList.contains("reversed2")){
      document.querySelector('#popup-modal').classList.remove('reversed2')
      document.querySelector('#popup-modal').classList.add('animated2')
    } else {
      document.querySelector('#popup-modal').classList.add('animated2')
    }
    setQuestionID(questionID)
  }

  const closeConfirmBox = () => {
    document.querySelector('#popup-modal').classList.remove("animated2")
    document.querySelector('#popup-modal').classList.add('reversed2')
    setTimeout(() => {
      document.querySelector('#popup-div').style.display = 'none'
    }, 1000)
    setQuestionID(0)
  }

  const deleteQuestion = () => {
    axios.delete(
        "http://localhost:5133/api/Questions/" + questionID,
    ).then(res => {
      console.log("success")
      showNotificationPopup('Thành công', 'Xoá câu hỏi thành công', '#0ec47d')
      window.location.href = "/profile"
    })
    .catch((err) => {
      showNotificationPopup('Thất bại', 'Xoá câu hỏi thất bại', '#f76860')
    })
  }

  const updateQuestion = (questionID, questionTitle, subjectID, userID, answer1, answer2, answer3, answer4, isCorrectAnswer, diffs, grade) => {
    var updatedQuestion = {
      "questioN_ID": questionID,
      "questioN_TITLE": questionTitle,
      "subjecT_ID": subjectID,
      "useR_ID": userID,
      "answeR_1": answer1,
      "answeR_2": answer2,
      "answeR_3": answer3,
      "answeR_4": answer4,
      "answer": isCorrectAnswer,
      "difficulty": diffs,
      "grade": grade
    }
    
    axios.put(`http://localhost:5133/api/Questions/${questionID}`, updatedQuestion)
      .then((res) => {
        showNotificationPopup('Thành công', 'Cập nhật câu hỏi thành công', '#0ec47d')
      })
      .catch((err) => {
        showNotificationPopup('Thất bại', 'Cập nhật câu hỏi thất bại', '#f76860')
      })
  }

  const showNotificationPopup = (title, message, color) => {
    const container = document.getElementById('notification-popup-container');
    const notification = document.createElement('div');
    const titleEl = document.createElement('div');
    const messageEl = document.createElement('div');
    const closeBtn = document.createElement('span');

    notification.classList.add('notification-popup');
    notification.style.backgroundColor = color
    titleEl.classList.add('title');
    titleEl.textContent = title;
    messageEl.classList.add('message')
    messageEl.textContent = message;
    notification.appendChild(titleEl);
    notification.appendChild(closeBtn)
    notification.appendChild(messageEl);
    container.appendChild(notification);
    closeBtn.classList.add('close-btn');
    closeBtn.textContent = 'x';
    closeBtn.addEventListener('click', () => {
        notification.classList.add('hide');
        setTimeout(() => {
            container.removeChild(notification);
        }, 500);
    });

    setTimeout(() => {
        notification.classList.add('hide');
        setTimeout(() => {
            container.removeChild(notification);
        }, 500); // Remove after hide animation completes
    }, 2000); // Hide after 5 seconds
  }

  if(!JSON.parse(localStorage.getItem('isSuccess'))){
    return (
      <div>
        <div id="notification-popup-container"></div>
        <Routes>
          <Route path="/" element={<Navigate to="/login"/>}></Route>
          <Route path="/login" element={<Login handleLogin={handleSubmit}/>}></Route>
          <Route path="/register" element={<Register handleRegister={handleRegister} showNotificationPopup={showNotificationPopup}/>}></Route>
        </Routes>
      </div>
    )
  }
  return (
    <div>
      <div className="homepage">
      <div id="notification-popup-container"></div>
        <Header openProfileBox={openProfileBox} name={JSON.parse(localStorage.getItem('fullname'))}/>
            <Routes>
                <Route path="/" element={<Navigate to="/home"/>}></Route>
                <Route exact path="/home" element={<Home />}></Route>
                <Route exact path="/randomTest" element={<RandomTest showNotificationPopup={showNotificationPopup}/>}></Route>
                <Route exact path="/randomQuestion" element={<RandomQuestion showNotificationPopup={showNotificationPopup} updateQuestion={updateQuestion} addQuestion={addQuestion} userID={JSON.parse(localStorage.getItem("user_id"))}/>}></Route>
                <Route exact path="/news" element={<News />}></Route>
                <Route exact path="/profile" element={<Profile handleConfirm={openConfirmBox} username={JSON.parse(localStorage.getItem('username'))} name={JSON.parse(localStorage.getItem('fullname'))}/>}></Route>
            </Routes>
        <Footer />
      </div>
      <div id="profile-div">
          <div id="profile-modal">
            <button id="closeBtn" onClick={closeProfileBox}>
              <FontAwesomeIcon size="2x" icon={faXmark} />
            </button>
            <div id="profile-info-box">
              <div id="profile-info">
                <FontAwesomeIcon size="3x" icon={faUser}/>
                <div id="profile-id">
                  <span id="fullname">{JSON.parse(localStorage.getItem("fullname"))}</span>
                  <br />
                  <span id="mail">{JSON.parse(localStorage.getItem("email"))}</span>
                </div>
              </div>
              <hr/>
              <div id="profile-link-div">
                <Link to="/profile" id="profile-link" onClick={closeProfileBox}>Trang cá nhân</Link>
              </div>
              <hr style={{borderTop: '1px solid black'}}/>
              <div id="profile-config">
                <a href="/settings">Cài đặt</a>
                <a href="/login" onClick={logout}>Đăng xuất</a>
              </div>
            </div>
          </div>
      </div>
      <div id="popup-div">
        <div id="popup-modal">
          <div id="popup-text">
            <span>Bạn có chắc chắn muốn xoá bỏ câu hỏi này?</span>
          </div>
          <div id="popup-buttons">
            <button id="yes-btn" onClick={deleteQuestion}>Có</button>
            <button id="no-btn" onClick={closeConfirmBox}>Không</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App;