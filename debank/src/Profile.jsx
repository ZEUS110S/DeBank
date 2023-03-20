import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

function Profile(){
    return (
        <div id="body">
            <div id="profile-background">
            </div>
            <div id="profile-fullname">
                <span>
                    Bằng Nguyễn&nbsp;&nbsp;
                    <FontAwesomeIcon size="1x" icon={faCheck} />    
                </span>
            </div>
            <div id="profile-bio">
                <span>Giới thiệu</span>
                <br/>
                <span>Tham gia từ tháng 2, 2023</span>
            </div>
        </div>
    )
}

export default Profile;