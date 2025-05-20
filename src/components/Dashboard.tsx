import { useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';
import { Button, Box, Typography } from '@mui/material';

// Komponentlar``
import CommandForm from './CommandForm';
import Grid from './Grid';
import HistoryTable from './HistoryTable';
import Notification from './Notification';

const Dashboard = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Manipulator boshqaruvi</Typography>
        <Button variant="outlined" color="error" onClick={handleLogout}>
          Chiqish
        </Button>
      </Box>

      {/* Buyruq kiritish formasi */}
      <pre>Run this command 'ЛЛНППВ' for example</pre>
      <CommandForm />

      {/* Manipulyator joylashgan grid (visualizatsiya) */}
      <Box sx={{ my: 4 }}>
        <Grid />
      </Box>

      {/* Buyruq tarixi */}
      <HistoryTable />

      {/* Snackbar */}
      <Notification />
    </Box>
  );
};

export default Dashboard;
