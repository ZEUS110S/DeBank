import React from "react";

function Footer(){
    return (
      <footer id="footer">
        <div className="prj-member">
          <h2 id="tag">Project Members</h2>
          <div id="prj-member-link">
            <a href="https://github.com/dhdthdtr">Nguyễn Vũ Bằng</a>
            <a href="https://github.com/dhdthdtr">Nguyễn Huy Hoàng</a>
            <a href="https://github.com/dhdthdtr">Ng Zi Hao</a>
            <a href="https://github.com/dhdthdtr">Đỗ Cao Minh Nhật</a>
          </div>
        </div>
        <div className="prj-member">
        <h2 id="tag">Teacher</h2>
          <div id="prj-member-link">
            <span>Lê Minh Hiếu</span>
          </div>
        </div>
        <div id="prj-member">
          <h2 id="tag">Source code</h2>
          <div id="prj-member-link">
            <a href="https://github.com/dhdthdtr">Github</a>
            </div>
          </div>
      </footer> 
    );
}

export default Footer