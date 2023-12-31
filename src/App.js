import './App.css';
import Home from './components/Home';
import SignInSide from './components/Login';
import SignUp from './components/Register';
import PrivateRoute from './utils/PrivateRoute';
import AuthProvider from './utils/helpers';
import { Route, Routes } from 'react-router-dom'
function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Routes>
          {/* If no user login yet */}
          <Route path="/login" element={<SignInSide />} />
          <Route path="/signup" element={<SignUp />} />
          {/* PrivateRoute check if there is token for a user or not */}
          <Route element={<PrivateRoute />}>
            {/* If user login */}
            <Route path="/" element={<Home />} />
          </Route>
        </Routes>
      </AuthProvider>
  </div>
  );
}

export default App;
