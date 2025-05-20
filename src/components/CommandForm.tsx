// components/CommandForm.tsx
import React from "react";
import { useForm } from "react-hook-form";
import { TextField, Button, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addCommandToHistory, setCurrentCommand, updatePosition } from "../store/commandSlice";
import { optimizeCommands } from "../utils/commandOptimizer";
import { RootState } from "../store/store";

type FormValues = {
  command: string;
};

const GRID_SIZE = 5;

// 🔧 Yangi funksiya: (x, y) joylashuvdan massiv yasash
const createGrid = (x: number, y: number): string[][] => {
  return Array.from({ length: GRID_SIZE }, (_, row) =>
    Array.from({ length: GRID_SIZE }, (_, col) =>
      row === y && col === x ? "🤖" : "--"
    )
  );
};

const getFinalPositionFrom = (
  command: string,
  start: { x: number; y: number }
): { x: number; y: number } => {
  let x = start.x;
  let y = start.y;

  for (const cmd of command) {
    if (cmd === "П" && x < GRID_SIZE - 1) x++;
    else if (cmd === "Л" && x > 0) x--;
    else if (cmd === "В" && y > 0) y--;
    else if (cmd === "Н" && y < GRID_SIZE - 1) y++;
  }

  return { x, y };
};

const CommandForm: React.FC = () => {
  const { register, handleSubmit, reset } = useForm<FormValues>();
  const dispatch = useDispatch();
  const currentPosition = useSelector(
    (state: RootState) => state.command.currentPosition
  );

  const onSubmit = (data: FormValues) => {
    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString();

    const original = data.command;
    const optimized = optimizeCommands(original);

    // ✅  Boshlang‘ich pozitsiya (Redux'dan)
    const before = createGrid(currentPosition.x, currentPosition.y);

    // 🔴 Yakuniy pozitsiya
    const { x, y } = getFinalPositionFrom(original, currentPosition);
    const after = createGrid(x, y);

    dispatch(updatePosition({ x, y })); // ✅ Yakuniy pozitsiyani saqlash
    dispatch(setCurrentCommand(original));
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
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ display: "flex", gap: 2 }}
    >
      <TextField
        label="Buyruqlar"
        {...register("command", { required: true })}
        fullWidth
      />
      <Button type="submit" variant="contained">
        Yuborish
      </Button>
    </Box>
  );
};

export default CommandForm;
