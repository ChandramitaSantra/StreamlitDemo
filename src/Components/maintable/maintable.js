import React, { useState, useEffect } from 'react';
import { Table, Checkbox, Input, Button, Modal } from 'antd';
import { datas } from '../../data/export';
import Select from 'react-select';
import './maintable.css';

const customStyles = {
	control: (provided, state) => ({
		...provided,
		backgroundColor: state.isFocused ? 'black' : 'black',
		borderColor: state.isFocused ? '#FFFF' : '#FFF',
		'&:hover': {
			borderColor: state.isFocused ? '#FFF' : '#FFF'
		},
		fontSize: '14px' // Reduced font size
	}),
	option: (provided, state) => ({
		...provided,
		backgroundColor: state.isFocused ? '#FFF' : null,
		'&:hover': {
			backgroundColor: '#FFF'
		},
		fontSize: '14px' // Reduced font size
	}),
	menu: (provided) => ({
		...provided,
		backgroundColor: 'black',
		fontSize: '14px' // Reduced font size
	}),
	menuList: (provided) => ({
		...provided,
		maxHeight: '200px',
		overflowY: 'auto',
		marginTop: 0,
		padding: '4px 0' // Reduced padding
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


const getPercentage = (data, key) => {
  const sum = (arr) => arr.reduce((a, b) => a + b, 0);
  let vals = [];
  let totals = [];
  let info = datas[data];
  if (key === 'jailbreak') {
    const val = 10; // Replace this with your calculation
    return parseFloat(val.toFixed(2));
  }
  if (key === 'bias') {
    info = info.bias.summary[key][0];
  } else {
    info = datas[data][key].summary[key];
  }
  for (let val of info) {
    vals.push(val.failed);
    totals.push(val.total);
  }
  const percentage = (sum(vals) / sum(totals)) * 100;
  return parseFloat(percentage.toFixed(2));
};

const models = [
  'Claude-3H',
  'DBRX-Instruct',
  'Gemma-7B',
  'Mixtral8x-7B',
  'NexusRavenV2-13B'
];

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

const FixedTableapp = ({ onModelClick }) => {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState('');
const [showCompare, setShowCompare] = useState(false);
const [selectedModels, setSelectedModels] = useState([]);
  const [showComparison, setShowComparison] = useState(false);

  useEffect(() => {
    const loadData = () => {
      const newData = models.map((model, index) => ({
        key: index,
        name: model,
        bias: getPercentage(model, 'bias'),
        jailbreaks: getPercentage(model, 'jailbreak'),
        toxicity: getPercentage(model, 'toxicity'),
        malware: getPercentage(model, 'malware'),
        avg: Math.round(
          (getPercentage(model, 'bias') +
            getPercentage(model, 'jailbreak') +
            getPercentage(model, 'toxicity') +
            getPercentage(model, 'malware')) /
            4
        ),
        selected: false // Add a selected property to track checkbox state
      }));
      setData(newData);
    };

    loadData();
  }, []);

  const handleCheckboxChange = (index) => {
    const newData = [...data];
    newData[index].selected = !newData[index].selected;
    setData(newData);
	
  };

  const handleSearch = () => {
    // Filter data based on the search text
    const filteredData = models.filter(model =>
      model.toLowerCase().includes(searchText.toLowerCase())
    );

    // Update the table data with the filtered results
    const newData = filteredData.map((model, index) => ({
      key: index,
      name: model,
      bias: getPercentage(model, 'bias'),
      jailbreaks: getPercentage(model, 'jailbreak'),
      toxicity: getPercentage(model, 'toxicity'),
      malware: getPercentage(model, 'malware'),
      avg: Math.round(
        (getPercentage(model, 'bias') +
          getPercentage(model, 'jailbreak') +
          getPercentage(model, 'toxicity') +
          getPercentage(model, 'malware')) /
          4
      ),
      selected: false // Add a selected property to track checkbox state
    }));
    setData(newData);
  };

  const handleCompare = () => {
    const selectedData = data.filter(item => item.selected);
    setSelectedModels(selectedData);
    setShowComparison(true);
  };

  const columns = [
    {
      title: 'Model Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (text) => <a href="#" onClick={() => onModelClick(text)}>{text}</a> // Render the name as a hyperlink with onClick handler
    },
    {
      title: 'Enkrypt AI Risk Score',
      dataIndex: 'avg',
      key: 'avg',
      sorter: (a, b) => a.avg - b.avg
    },
    {
      title: 'Jailbreaks',
      dataIndex: 'jailbreaks',
      key: 'jailbreaks',
      sorter: (a, b) => a.jailbreaks - b.jailbreaks
    },
    {
      title: 'Toxicity',
      dataIndex: 'toxicity',
      key: 'toxicity',
      sorter: (a, b) => a.toxicity - b.toxicity
    },
    {
      title: 'Malware',
      dataIndex: 'malware',
      key: 'malware',
      sorter: (a, b) => a.malware - b.malware
    },
    {
      title: 'Bias',
      dataIndex: 'bias',
      key: 'bias',
      sorter: (a, b) => a.bias - b.bias
    },
    {
      title: 'Select',
      key: 'select',
      render: (text, record, index) => (
        <Checkbox checked={record.selected} onChange={() => handleCheckboxChange(index)} />
      )
    }
  ];
  const selectedData = data.filter(item => item.selected);

  return (
    <div>
      <div style={{ marginBottom: '16px' }}>
        <Input
          placeholder="Search Model Name"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ marginRight: '8px', width: '200px' }}
        />
        <Button type="primary" onClick={handleSearch}>Search</Button>
        <div>
        <Button type="primary" onClick={handleCompare}  >Compare Now</Button>
        </div>
      </div>
      <Table columns={columns} dataSource={data} pagination={false} scroll={{ y: 400 }} />
      {showComparison && (
        <div style={{ marginTop: '16px', padding: '10px', border: '1px solid #ccc', backgroundColor:'FFFFFF' }}>
          
          {selectedModels.map(model => (
            <div key={model.key}>
              <p>{model.name}</p>
              {/* Render more details for comparison here */}
            </div>
          ))}
          <Button type="primary" onClick={() => setShowComparison(false)}>Close</Button>
        </div>
      )}
    </div>
  );
};
const FixedTable = () => {
	const [modalVisible, setModalVisible] = useState(false);
	const [selectedModel, setSelectedModel] = useState(null);
  
	const handleModelClick = (model) => {
	  setSelectedModel(model);
	  setModalVisible(true);
	};
  
	return (
	  <>
		<FixedTableapp onModelClick={handleModelClick} />
		<Modal
	title="Model Details"
	visible={modalVisible}
	onCancel={() => setModalVisible(false)}
	footer={null}
	style={{ top: 80 }} // Adjust top position as needed
  >
	{selectedModel && (
	  <div>
		{/* Render model details here */}
		<p>Model: {selectedModel}</p>
		{/* Add other details as needed */}
	  </div>
	)}
  </Modal>
	  </>
	);
  };
  

export default FixedTable;
