// components/Grid.tsx
import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { clearCurrentCommand } from '../store/commandSlice';

const GRID_SIZE = 5;

const Grid: React.FC = () => {
  const dispatch = useDispatch();
  const command = useSelector((state: RootState) => state.command.currentCommand);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!command) return;

    const commands = command.split('');
    let i = 0;

    const interval = setInterval(() => {
      const cmd = commands[i];
      setPosition((prev) => {
        let { x, y } = prev;
        if (cmd === 'П' && x < GRID_SIZE - 1) x++;
        if (cmd === 'Л' && x > 0) x--;
        if (cmd === 'В' && y > 0) y--;
        if (cmd === 'Н' && y < GRID_SIZE - 1) y++;
        return { x, y };
      });

      i++;
      if (i >= commands.length) {
        clearInterval(interval);
        dispatch(clearCurrentCommand());
      }
    }, 500); // Harakat tezligi

    return () => clearInterval(interval);
  }, [command, dispatch]);

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: `repeat(${GRID_SIZE}, 60px)`,
        gridTemplateRows: `repeat(${GRID_SIZE}, 60px)`,
        gap: 1,
        justifyContent: 'center',
        my: 3,
      }}
    >
      {[...Array(GRID_SIZE)].flatMap((_, row) =>
        [...Array(GRID_SIZE)].map((_, col) => {
          const isRobot = position.x === col && position.y === row;
          return (
            <Box
              key={`${row}-${col}`}
              sx={{
                width: 60,
                height: 60,
                border: '2px solid #ccc',
                backgroundColor: isRobot ? 'primary.main' : 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                color: isRobot ? 'white' : 'black',
              }}
            >
              {isRobot ? '🤖' : ''}
            </Box>
          );
        })
      )}
    </Box>
  );
};

export default Grid;
