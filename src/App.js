import React, { useState } from 'react';
import { Layout, Modal, Button } from 'antd';
import './App.css';
import Select from 'react-select';
import FixedTable from './Components/maintable/maintable';
import BiasBarChart from './Components/Barcharts/biasbar';
import JailbreaksBarChart from './Components/Barcharts/jailbreakbar';
import MalwareBarChart from './Components/Barcharts/malwarebar';
import ToxicityBarChart from './Components/Barcharts/toxicitybar';
import Biastable from './Components/Tables/Biastable';
import Jailbreaktable from './Components/Tables/Jailbreaktable';
import Malwaretable from './Components/Tables/Malwaretable';
import Toxicitytable from './Components/Tables/Toxicitytable';
import SwitchToggle from './Components/SwitchToggle/SwitchToggle';
import SwitchToggle1 from './Components/SwitchToggle1/SwitchToggle1'; // Import the SwitchToggle component

const { Header, Content, Sider } = Layout;

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
  { value: 'NexusRavenV2-13B', label: 'NexusRavenV2-13B' },
  { value: 'Mixtral8x7B', label: 'Mixtral8x7B' }
];

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? 'black' : 'black',
    borderColor: state.isFocused ? '#FFFF' : '#FFF',
    '&:hover': {
      borderColor: state.isFocused ? '#FFF' : '#FFF'
    },
    fontSize: '14px'
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? '#FFF' : null,
    '&:hover': {
      backgroundColor: '#FFF'
    },
    fontSize: '14px'
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: 'black',
    fontSize: '14px'
  }),
  menuList: (provided) => ({
    ...provided,
    maxHeight: '200px',
    overflowY: 'auto',
    marginTop: 0,
    padding: '4px 0'
  }),
  singleValue: (provided) => ({
    ...provided,
    color: '#FFFFFF'
  }),
  indicatorSeparator: (provided) => ({
    ...provided,
    backgroundColor: '#303338'
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    color: '#ffffff'
  })
};

function App() {
  const [selectedModel, setSelectedModel] = useState(null);
  const [activeLink, setActiveLink] = useState('Bias');
  const [isSwitchVisible, setIsSwitchVisible] = useState(false); // State to manage the visibility of the SwitchExample modal

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <Layout style={{ minHeight: '100vh', backgroundColor: '#0E1117' }}>
      <Sider width={200} style={{ backgroundColor: '#0E1117', marginRight: '24px' }}>
        <div style={{ padding: '24px 0', textAlign: 'center', marginTop:'40px' }}>
          <SwitchToggle />
		  <div/>
		  <div style={{  textAlign: 'center', marginTop:'45px' }}></div>
		  <SwitchToggle1 /> {/* Render the SwitchToggle component in the Sider */}
        </div>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-header" style={{
            backgroundColor: '#0E1117',
            color: 'white',
            padding: '0 24px',
            fontSize: '54px',
            marginTop: '40px',
            fontWeight: 'bold'
          }}>
          Enkrypt AI Red Teaming Suite
        </Header>
        <Content className="site-layout-content"style={{  marginTop: '60px', fontSize: '45px' }}>
          <div style={{ textAlign: 'left', color: 'white', fontSize: '24px' }}>
            This interactive demo illustrates Enkrypt AI's red teaming suite.
            Red teaming forms a small piece of our overall goal of accessing and
            improving the security of AI models, hence increase trust and
            accelerate enterprise adoption of generative AI models. Our Sentry
            Guardrails that protect LLMs during inference, and our Generative AI
            Gateway and Governance Platform that provides a comprehensive view
            of the security posture of AI models, are other components of our
            security suite. Do reach out to us at{' '}
            <a href="mailto:hello@enkryptai.com" style={{ color: 'blue' }}>
              hello@enkryptai.com
            </a>{' '}
            for more information.
          </div>
          <div style={{ marginTop: '40px',marginRight:'100px', paddingLeft:'20px' }}>
            <FixedTable />
          </div>
        </Content>
        <div
          style={{
            textAlign: 'left',
            color: 'white',
            fontSize: '24px',
            padding: '24px'
          }}
        >
          <div className="multi-select-dropdown">
            <Select
              options={options}
              onChange={(selectedOption) => {
                console.log(selectedOption.value);
                setSelectedModel(selectedOption.value);
              }}
              placeholder="Choose an option"
              styles={customStyles}
            />
          </div>
          <div style={{ color: 'white' }}>
            <>
              <div className="navbar-container">
                <ul>
                  <li
                    className={
                      activeLink === 'Bias'
                        ? 'nav-link active-link'
                        : 'nav-link'
                    }
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick('Bias');
                    }}
                  >
                    <a href="#">Bias</a>
                    <div className="underline"></div>
                  </li>
                  <li
                    className={
                      activeLink === 'Jailbreak'
                        ? 'nav-link active-link'
                        : 'nav-link'
                    }
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick('Jailbreak');
                    }}
                  >
                    <a href="#">Jailbreak</a>
                    <div className="underline"></div>
                  </li>
                  <li
                    className={
                      activeLink === 'Toxicity'
                        ? 'nav-link active-link'
                        : 'nav-link'
                    }
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick('Toxicity');
                    }}
                  >
                    <a href="#">Toxicity</a>
                    <div className="underline"></div>
                  </li>
                  <li
                    className={
                      activeLink === 'Malware'
                        ? 'nav-link active-link'
                        : 'nav-link'
                    }
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick('Malware');
                    }}
                  >
                    <a href="#">Malware</a>
                    <div className="underline"></div>
                  </li>
                </ul>
              </div>
              <div className="barchart-container">
                {activeLink === 'Bias' && (
                  <div>
                    <BiasBarChart selectedModel={selectedModel} />
                    <Biastable selectedModel={selectedModel} />
                  </div>
                )}
                {activeLink === 'Jailbreak' && (
                  <div>
                    <JailbreaksBarChart selectedModel={selectedModel} />
                    <Jailbreaktable selectedModel={selectedModel}/>
                  </div>
                )}
                {activeLink === 'Toxicity' && (
                  <div>
                    <ToxicityBarChart selectedModel={selectedModel} />
                    <Toxicitytable selectedModel={selectedModel}/>
                  </div>
                )}
                {activeLink === 'Malware' && (
                  <div>
                    <MalwareBarChart selectedModel={selectedModel} />
                    <Malwaretable selectedModel={selectedModel}/>
                  </div>
                )}
              </div>
            </>
          </div>
        </div>
      </Layout>
    </Layout>
  );
}

export default App;