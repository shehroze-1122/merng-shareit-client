import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import MenuBar from './components/MenuBar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { AuthContextProvider } from './context/AuthContextProvider';
import AuthRoute from './utils/AuthRoute';

import 'fomantic-ui-css/semantic.min.css'
import './App.css';

const App = ()=> {
  return (
    <AuthContextProvider>
      <Container style={{width:'90%'}}>
        <Router>
          <MenuBar />
          <Routes>
          
            <Route exact path='/' element={<Home/>} />
            
            <Route exact path='/login' element={<AuthRoute/>}>
              <Route exact path='/login' element={<Login />} />
            </Route>
            
            <Route exact path='/register' element={<AuthRoute/>}>
              <Route exact path='/register' element={<Register/>}/>
            </Route>
            
           
          
          </Routes>
        </Router>
      </Container>
    </AuthContextProvider>
  );
}

export default App;
