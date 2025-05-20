import { useSelector } from 'react-redux';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';
import { RootState } from './store/store';

function App() {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  return (
    <div>
      {isLoggedIn ? <Dashboard /> : <LoginForm />}
    </div>
  );
}

export default App;
