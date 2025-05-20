// store/commandSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CommandHistoryItem {
  original: string;
  optimized: string;
  date: string;
  time: string;
  before: string[][];
  after: string[][];
}

export interface CommandState {
  history: CommandHistoryItem[];
  currentCommand: string; // 🔁 aktiv buyruq
}

const initialState: CommandState = {
  history: [],
  currentCommand: '',
};

const commandSlice = createSlice({
  name: 'command',
  initialState,
  reducers: {
    addCommandToHistory(state, action: PayloadAction<CommandHistoryItem>) {
      state.history.push(action.payload);
    },
    clearHistory(state) {
      state.history = [];
    },
    setCurrentCommand(state, action: PayloadAction<string>) {
      state.currentCommand = action.payload;
    },
    clearCurrentCommand(state) {
      state.currentCommand = '';
    }
  },
});

export const {
  addCommandToHistory,
  clearHistory,
  setCurrentCommand,
  clearCurrentCommand
} = commandSlice.actions;

export default commandSlice.reducer;
