import React, { useState } from "react";
import Main from "./Main";

function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <div className="wrapper">
      <aside id="sidebar" className={isExpanded ? "expand" : ""}>
        <div className="d-flex">
          <button className="toggle-btn" type="button" onClick={handleToggle}>
            <i class="bi bi-grid"></i>
          </button>
          <div className="sidebar-logo">
            <a href="#"></a>
          </div>
        </div>
        <ul className="sidebar-nav">
          <li className="sidebar-item">
            <a href="#" className="sidebar-link">
              <i class="bi bi-grid-1x2-fill"></i>
              <span>Dashboard</span>
            </a>
          </li>
          <li className="sidebar-item">
            <a href="#" className="sidebar-link">
              <i class="bi bi-people-fill"></i>
              <span>Patients</span>
            </a>
          </li>
          <li className="sidebar-item">
            <a href="#" className="sidebar-link">
              <i class="bi bi-list-task"></i>
              <span>Appointments</span>
            </a>
          </li>
          {/* <li className="sidebar-item">
            <a
              href="#"
              className="sidebar-link collapsed has-dropdown"
              data-bs-toggle="collapse"
              data-bs-target="#auth"
              aria-expanded="false"
              aria-controls="auth"
            >
              <i className="lni lni-protection"></i>
              <span>Auth</span>
            </a>
            <ul
              id="auth"
              className="sidebar-dropdown list-unstyled collapse"
              data-bs-parent="#sidebar"
            >
              <li className="sidebar-item">
                <a href="#" className="sidebar-link">
                  Login
                </a>
              </li>
              <li className="sidebar-item">
                <a href="#" className="sidebar-link">
                  Register
                </a>
              </li>
            </ul>
          </li> */}
          {/* <li className="sidebar-item">
            <a
              href="#"
              className="sidebar-link collapsed has-dropdown"
              data-bs-toggle="collapse"
              data-bs-target="#multi"
              aria-expanded="false"
              aria-controls="multi"
            >
              <i className="lni lni-layout"></i>
              <span>Multi Level</span>
            </a>
            <ul
              id="multi"
              className="sidebar-dropdown list-unstyled collapse"
              data-bs-parent="#sidebar"
            >
              <li className="sidebar-item">
                <a
                  href="#"
                  className="sidebar-link collapsed"
                  data-bs-toggle="collapse"
                  data-bs-target="#multi-two"
                  aria-expanded="false"
                  aria-controls="multi-two"
                >
                  Two Links
                </a>
                <ul
                  id="multi-two"
                  className="sidebar-dropdown list-unstyled collapse"
                >
                  <li className="sidebar-item">
                    <a href="#" className="sidebar-link">
                      Link 1
                    </a>
                  </li>
                  <li className="sidebar-item">
                    <a href="#" className="sidebar-link">
                      Link 2
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </li> */}
          <li className="sidebar-item">
            <a href="#" className="sidebar-link">
              <i class="bi bi-bandaid"></i>
              <span>Treatments</span>
            </a>
          </li>
        </ul>
        <div className="sidebar-footer">
          <a href="#" className="sidebar-link">
            <i className="lni lni-exit"></i>
            <span>Logout</span>
          </a>
        </div>
      </aside>
      <Main />
    </div>
  );
}

export default Sidebar;
