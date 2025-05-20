import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Position {
  x: number;
  y: number;
}

const initialState: Position = {
  x: 0,
  y: 0,
};

const robotSlice = createSlice({
  name: 'robot',
  initialState,
  reducers: {
    move(state, action: PayloadAction<'UP' | 'DOWN' | 'LEFT' | 'RIGHT'>) {
      switch (action.payload) {
        case 'UP':
          if (state.y > 0) state.y -= 1;
          break;
        case 'DOWN':
          if (state.y < 4) state.y += 1;
          break;
        case 'LEFT':
          if (state.x > 0) state.x -= 1;
          break;
        case 'RIGHT':
          if (state.x < 4) state.x += 1;
          break;
      }
    },
    resetPosition(state) {
      state.x = 0;
      state.y = 0;
    },
  },
});

export const { move, resetPosition } = robotSlice.actions;
export default robotSlice.reducer;
