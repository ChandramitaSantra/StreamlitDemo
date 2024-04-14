import React, { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faSync } from '@fortawesome/free-solid-svg-icons';
import Select from 'react-select';
import './Sidebar.css'; // Ensure this CSS file exists and is correctly imported
import SwitchExample from '../SwitchToggle/SwitchToggle';
import SwitchExample1 from '../SwitchToggle1/SwitchToggle1';

const options = [
  { value: 'Claude-3H', label: 'Claude-3H' },
  { value: 'Command-R+', label: 'Command-R+' },
  { value: 'DBRX-Instruct', label: 'DBRX-Instruct' },
  { value: 'GPT-3.5-turbo', label: 'GPT-3.5-turbo' },
  { value: 'GPT-4-turbo', label: 'GPT-4-turbo' },
  { value: 'Gemma-7B', label: 'Gemma-7B' },
  { value: 'InternLM2-Chat-20B', label: 'InternLM2-Chat-20B' },
  { value: 'JambaV0.1', label: 'JambaV0.1' },
  { value: 'Lla ma2-13B', label: 'Lla ma2-13B' },
  
];





const Sidebar = ({ isCollapsed }) => {
  const [isClicked, setIsClicked] = useState(false);

    
  const handleClick = () => {
    setIsClicked(!isClicked); // Toggle the state
};
    
    
    
  

    // Function to handle the click event
    

    
    




    return (
        <nav className="sidebar">
            {/* Close sidebar menu */}
            <div className="dismiss">
                <FontAwesomeIcon icon={faArrowLeft} />
            </div>

            <ul className="list-unstyled menu-elements">
                <li className="active">
                    <div className="switch-container">
                        <SwitchExample />
                        <a className={`scroll-link ${isCollapsed ? 'fixed-text' : ''}`} href="#top-content">About Enkrypt AI Sentry</a>
                    </div>
                </li>
                <li className="active1">
                    <div className="switch-container">
                        <SwitchExample1 />
                        <a className={`scroll-link ${isCollapsed ? 'fixed-text' : ''}`} href="#section-1">About Generative AI Red Taming</a>
                    </div>
                </li>
                <li>
                    <a className="scroll-link" style={{fontSize: '20px', fontWeight: "bold"}} href="#section-5"> Red Teaming Demo</a>
                </li>
                <li>
                    <a className="scroll-link" style={{fontSize: '20px'}} href="#section-6"> Model Comparison</a>
                </li>
                <li>
                    <a className="scroll-link" style={{fontSize: '20px'}} href="#section-6"> Select models to compare with </a>
                </li>
                <li>
                    <div className="multi-select-dropdown">
                        <Select
                            isMulti
                            options={options}
                            className="basic-multi-select"
                            classNamePrefix="select"
                            placeholder="Choose  an option"
                           
                        />
                    </div>
                </li>

                <div className="sidebar-footer">
                <button 
                    onClick={handleClick} 
                    className={`compare-now-btn ${isClicked ? 'clicked' : ''}`}
                >
                    Compare Now
                </button>
            </div>
            </ul>
        </nav>
    );
};

export default Sidebar;
