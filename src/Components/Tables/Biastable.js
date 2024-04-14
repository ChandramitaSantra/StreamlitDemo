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
const extractBiasData = (details) => {
  if (!details || !details.bias || !details.bias.length) return [];

  // Flatten the nested array
  const flattenedBias = details.bias[0];

  const rows = flattenedBias.map((row) => ({
    method: row.Method || '',
    category: row.Category || '',
    comparisonBetween: row['Comparision Between'] || '',
    prompt: row.Prompt || '',
    response: row.Response || '',
    errorOutput: row['Error Output'] || '',
    biasedExamples: Array.isArray(row['Biased Examples']) ? row['Biased Examples'].join(', ') : '',
    unbiasedExamples: Array.isArray(row['Unbiased Examples']) ? row['Unbiased Examples'].join(', ') : '',
    biasedExamplesCount: row['Biased Examples Count'] || '',
    unbiasedExamplesCount: row['Unbiased Examples Count'] || '',
    biasScore: row['Bias Score'] || '',
    biasedTowards: row['Biased Towards'] || '',
    explanation: row.Explanation || '',
    timeTaken: row['Time Taken'] || '',
  }));

  return rows;
};


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
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
}));

const BiasTable = ({ selectedModel }) => {
  const [biasData, setBiasData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const modelData = datas[selectedModel];
        if (modelData && modelData.bias.details) {
          const detailsbias = modelData.bias.details;
          const extractedData = extractBiasData(detailsbias);
          setBiasData(extractedData);
        }
      } catch (error) {
        console.error('Error fetching bias data:', error);
      }
    };

    if (selectedModel) {
      fetchData();
    }
  }, [selectedModel]);

  return (
    <TableContainer component={Paper}style={{ maxHeight: 440, overflow: 'auto' }}>
      <Table sx={{ minWidth: 700 }} aria-label="bias table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Method</StyledTableCell>
            <StyledTableCell>Category</StyledTableCell>
            <StyledTableCell>Comparison Between</StyledTableCell>
            <StyledTableCell>Prompt</StyledTableCell>
            <StyledTableCell>Response</StyledTableCell>
            <StyledTableCell>Error Output</StyledTableCell>
            <StyledTableCell>Biased Examples</StyledTableCell>
            <StyledTableCell>Unbiased Examples</StyledTableCell>
            <StyledTableCell>Biased Examples Count</StyledTableCell>
            <StyledTableCell>Unbiased Examples Count</StyledTableCell>
            <StyledTableCell>Bias Score</StyledTableCell>
            <StyledTableCell>Biased Towards</StyledTableCell>
            <StyledTableCell>Explanation</StyledTableCell>
            <StyledTableCell>Time Taken</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {biasData.map((row, index) => (
            <StyledTableRow key={index}style={{ maxHeight: '100px' }}>
              <StyledTableCell>{row.method}</StyledTableCell>
              <StyledTableCell>{row.category}</StyledTableCell>
              <StyledTableCell>{row.comparisonBetween}</StyledTableCell>
              <StyledTableCell>{row.prompt}</StyledTableCell>
              <StyledTableCell>{row.response}</StyledTableCell>
              <StyledTableCell>{row.errorOutput}</StyledTableCell>
              <StyledTableCell>{row.biasedExamples}</StyledTableCell>
              <StyledTableCell>{row.unbiasedExamples}</StyledTableCell>
              <StyledTableCell>{row.biasedExamplesCount}</StyledTableCell>
              <StyledTableCell>{row.unbiasedExamplesCount}</StyledTableCell>
              <StyledTableCell>{row.biasScore}</StyledTableCell>
              <StyledTableCell>{row.biasedTowards}</StyledTableCell>
              <StyledTableCell>{row.explanation}</StyledTableCell>
              <StyledTableCell>{row.timeTaken}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BiasTable;
