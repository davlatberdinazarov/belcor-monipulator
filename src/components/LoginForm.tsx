import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { login } from '../store/authSlice';
import { Box, Button, TextField, Typography } from '@mui/material';

const LoginForm = () => {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();

  const onSubmit = (data: any) => {
    if (data.username === 'admin' && data.password === 'admin') {
      dispatch(login());
    } else {
      alert("Noto'g'ri login yoki parol");
    }
  };

  return (
    <Box sx={{ width: 300, margin: '100px auto', display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="h5">Tizimga kirish</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField label="Login" {...register("username")} fullWidth margin="normal" />
        <TextField label="Parol" type="password" {...register("password")} fullWidth margin="normal" />
        <Button type="submit" variant="contained" fullWidth>Kirish</Button>
      </form>
    </Box>
  );
};

export default LoginForm;
