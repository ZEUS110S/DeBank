import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { faCheck, faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

class Profile extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            questions: []
        }
        this.deleteQuestion = this.deleteQuestion.bind(this)
    }

    deleteQuestion(questionID){
        window.event.preventDefault();
        // axios.delete(
        //     "http://localhost:5133/api/Questions/" + questionID,
        // ).then(res => console.log("success"))
        this.props.handleConfirm(questionID)
    }

    componentDidMount(){
        axios.get(
            "http://localhost:5133/api/Questions/USERNAME",
            {
                params: {
                    USERNAME: this.props.username
                },
                headers:{
                    'Access-Control-Allow-Origin': true
                }
            }
        ).then(res => {
            console.log(res.data)
            this.setState({
                questions: res.data
            })
        })
        .catch(err => console.log(err));
    }

    render() {
        var question;
        // temp
        const temp = {
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

        if(this.state.questions.length === 0){
            question = <div id="no-question">Bạn chưa tạo câu hỏi nào</div>
        } else {
            question = this.state.questions.map((question) => (
                <div className="history-item-wrapper" key={question.questioN_ID}>
                    <div className="history-title">
                        <a href="/profile">
                            <span>{question.questioN_TITLE}</span>
                        </a>
                    </div>
                    <div className="history-icons">
                        <Link to="/randomQuestion" state={{editFlg: '0', question: question}}>
                            <FontAwesomeIcon size="2x" icon={faPen} style={{color: "#44ff00"}}/>    
                        </Link> 
                        <a href="/#" onClick={() => this.deleteQuestion(question.questioN_ID)} style={{marginLeft: "10px"}}>
                            <FontAwesomeIcon size="2x" icon={faCircleXmark} style={{color: "#ec0909"}}/>
                        </a>
                    </div>
                </div>
            ))
        }

        return (
            <div id="body">
                <div id="profile-background">
                </div>
                <div id="profile-fullname">
                    <span>
                        {this.props.name}&nbsp;&nbsp;
                        <FontAwesomeIcon size="1x" icon={faCheck} />    
                    </span>
                </div>
                <div id="profile-bio">
                    <span>Giới thiệu</span>
                    <br/>
                    <span>Tham gia từ tháng 2, 2023</span>
                </div>
                <div id="profile-title" style={{marginTop: "15px"}}>
                    <div id="profile-func">
                        <h2>Các câu hỏi đã tạo</h2>
                        <div id="profile-func-item">
                            <a href="/profile">Tải lại</a>
                            <Link to="/randomQuestion" state={{editFlg: '1', question: temp}}>Tạo mới</Link>
                        </div>
                    </div>
                    <hr style={{zIndex: -999}}/>  
                </div>
                {question}
            </div>
        )
    }
}

export default Profile;