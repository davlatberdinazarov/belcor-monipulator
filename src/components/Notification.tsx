// components/Notification.tsx
import React, { useState, useEffect } from 'react';
import { Snackbar, Alert } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const Notification: React.FC = () => {
  const history = useSelector((state: RootState) => state.command.history);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (history.length > 0) {
      setOpen(true);
    }
  }, [history]);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
      <Alert severity="success" onClose={handleClose} variant="filled">
        Buyruq muvaffaqiyatli bajarildi!
      </Alert>
    </Snackbar>
  );
};

export default Notification;
