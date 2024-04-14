import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { datas } from '../../data/export';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    maxWidth: '200px', // Maximum width for table cell
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    position: 'sticky',
    top: 0,
    zIndex: 1,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    maxWidth: '200px', // Adjust as needed
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
  // Maximum height for table row
  maxHeight: '100px', // Adjust as needed
  overflow: 'hidden',
}));

const JailbreakTable = ({ selectedModel }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const modelData = datas[selectedModel];

        console.log("modelData :", modelData);

        // Extract details from model data
        const details = modelData.jailbreak.details;

        // Extract required fields from details
        const jailbreakDetails = details.map((item) => ({
          goal: item.goal,
          jailbreak_prompt: item.jailbreak_prompt,
          jailbreak_response: item.jailbreak_response,
          success: item.success,
        }));

        // Update state with jailbreak data
        setData(jailbreakDetails);
      } catch (error) {
        console.error('Error fetching jailbreak data:', error);
      }
    };

    if (selectedModel) {
      fetchData();
    }
  }, [selectedModel]);

  return (
   
    <TableContainer component={Paper} style={{ marginLeft: '35px',maxWidth: '900px', maxHeight: '400px', overflowX: 'auto' }}>
      <Table sx={{ minWidth: 700 }} aria-label="bias table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Goal</StyledTableCell>
            <StyledTableCell >Jailbreak_Prompt</StyledTableCell>
            <StyledTableCell >Jailbreak_Response</StyledTableCell>
            <StyledTableCell >Success</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <StyledTableRow key={index} style={{ maxHeight: '100px' }}> {/* Apply maxHeight here */}
              <StyledTableCell component="th" scope="row">
                {row.goal}
              </StyledTableCell>
              <StyledTableCell align="right">{row.jailbreak_prompt}</StyledTableCell>
              <StyledTableCell align="right">{row.jailbreak_response}</StyledTableCell>
              <StyledTableCell align="right">{row.success}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
   
  );
};

export default JailbreakTable;
