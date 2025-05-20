import React from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell, Paper, TableContainer } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const renderGrid = (grid: string[][]) => (
  <table style={{ borderCollapse: 'collapse' }}>
    <tbody>
      {grid.map((row, rowIndex) => (
        <tr key={rowIndex}>
          {row.map((cell, colIndex) => (
            <td key={colIndex} style={{ border: '1px solid #ccc', padding: '2px 8px' }}>{cell}</td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
);

const HistoryTable: React.FC = () => {
  const history = useSelector((state: RootState) => state.command.history);

  return (
    <TableContainer component={Paper} sx={{ mt: 4 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Original</TableCell>
            <TableCell>Optimallashtirilgan</TableCell>
            <TableCell>Vaqti</TableCell>
            <TableCell>Oldin</TableCell>
            <TableCell>Keyin</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {history.map((item, idx) => (
            <TableRow key={idx}>
              <TableCell>{item.original}</TableCell>
              <TableCell>{item.optimized}</TableCell>
              <TableCell>{item.date} {item.time}</TableCell>
              <TableCell>{renderGrid(item.before)}</TableCell>
              <TableCell>{renderGrid(item.after)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default HistoryTable;
