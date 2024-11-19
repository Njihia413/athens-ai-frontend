import React from 'react';
import { Link } from 'react-router-dom';

const ChatSidebar = () => {
  return (
      <>
        <div className="sidebar" id="sidebar">
          <div className="sidebar-inner slimscroll">
            <div className="sidebar-menu">
              {/* Edit Icon at the Top Right */}
              <div className="d-flex justify-content-end align-items-center mb-3">
                <Link to="/guest" className="text-white">
                  <i className="la la-edit" style={{ fontSize: '1.8rem' }}></i>
                </Link>
              </div>
              <ul>
                <li className="menu-title"><span>Today</span></li>
                <li>
                  <Link onClick={() => localStorage.setItem("minheight", "true")} to="/conversation/chat">
                    <span className="chat-user">Make a HTTP request in Javascript</span>
                  </Link>
                </li>
                <li>
                  <Link onClick={() => localStorage.setItem("minheight", "true")} to="/conversation/chat">
                    <span className="chat-user">Center a div in React using tailwind</span>
                  </Link>
                </li>
                <li>
                  <Link onClick={() => localStorage.setItem("minheight", "true")} to="/conversation/chat">
                    <span className="chat-user">Give me 3 ideas on how to plan a good trip</span>
                  </Link>
                </li>
                <li>
                  <Link onClick={() => localStorage.setItem("minheight", "true")} to="/conversation/chat">
                    <span className="chat-user">Next JS tutorial best practices</span>
                  </Link>
                </li>
                <li className="menu-title mt-4">Yesterday</li>
                <li>
                  <Link onClick={() => localStorage.setItem("minheight", "true")} to="/conversation/chat">
                    <span className="chat-user">Help me complete this task I was given on</span>
                  </Link>
                </li>
                <li>
                  <Link onClick={() => localStorage.setItem("minheight", "true")} to="/conversation/chat">
                    <span className="chat-user">Experiencing too many errors while trying to migrate to another framework</span>
                  </Link>
                </li>
                <li>
                  <Link onClick={() => localStorage.setItem("minheight", "true")} to="/conversation/chat">
                    <span className="chat-user">Can't remove my y axis overflow using React and Bootstrap</span>
                  </Link>
                </li>
                <li>
                  <Link onClick={() => localStorage.setItem("minheight", "true")} to="/conversation/chat">
                    <span className="chat-user">Flex cards or items and center them vertically using Bootstrap</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </>
  );
}

export default ChatSidebar;
