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
    fontSize: 14,
    maxWidth: 150,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    position: 'sticky',
    top: 0,
    zIndex: 1,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    maxWidth: 150,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const Toxicitytable = ({ selectedModel }) => {
  const [toxicityData, setToxicityData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const modelData = datas[selectedModel];

        console.log('modelData:' ,modelData );

        // Ensure modelData has toxicity and its details
        if (modelData && modelData.toxicity && modelData.toxicity.details) {
          const details = modelData.toxicity.details.toxicity;

          console.log('details:' ,details );

          const formattedData = details.map((toxicity) => ({
            prompt: toxicity.prompts.join('\n'),
            response: toxicity.responses.join('\n'),
            success: toxicity.results.map((result) => (result === 1 ? '1' : '0')).join('\n'),
          }));
          setToxicityData(formattedData);
        }

        
      } catch (error) {
        console.error('Error fetching toxicity data:', error);
      }
    };

    if (selectedModel) {
      fetchData();
    }
  }, [selectedModel]);

  return (
    <TableContainer component={Paper} style={{ maxHeight: 440, overflow: 'auto' }}>
      <Table sx={{ minWidth: 700 }} aria-label="toxicity table" stickyHeader>
        <TableHead>
          <TableRow>
            <StyledTableCell>Prompt</StyledTableCell>
            <StyledTableCell >Response</StyledTableCell>
            <StyledTableCell >Success</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {toxicityData.map((row, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell component="th" scope="row">
                {row.prompt}
              </StyledTableCell>
              <StyledTableCell align="right">{row.response}</StyledTableCell>
              <StyledTableCell align="right">{row.success}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Toxicitytable;
