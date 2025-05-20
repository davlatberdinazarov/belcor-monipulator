// components/CommandForm.tsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import {
  addCommandToHistory,
  setCurrentCommand
} from '../store/commandSlice';
import { optimizeCommands } from '../utils/commandOptimizer';

type FormValues = {
  command: string;
};

const CommandForm: React.FC = () => {
  const { register, handleSubmit, reset } = useForm<FormValues>();
  const dispatch = useDispatch();

  const onSubmit = (data: FormValues) => {
    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString();

    const original = data.command;
    const optimized = optimizeCommands(original);

    const before = [['-', '-', '-'], ['-', 'A', '-'], ['-', '-', '-']];
    const after = [['-', '-', '-'], ['-', '-', '-'], ['-', 'A', '-']];

    // 1️⃣ Harakatni boshlash uchun
    dispatch(setCurrentCommand(original));

    // 2️⃣ Tarixga qo‘shish uchun
    dispatch(
      addCommandToHistory({
        original,
        optimized,
        date,
        time,
        before,
        after,
      })
    );

    reset();
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', gap: 2 }}>
      <TextField
        label="Buyruqlar"
        {...register('command', { required: true })}
        fullWidth
      />
      <Button type="submit" variant="contained">
        Yuborish
      </Button>
    </Box>
  );
};

export default CommandForm;
