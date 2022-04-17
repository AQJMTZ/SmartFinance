import {Route, Routes, Navigate} from 'react-router-dom';
import Main from './component/main';
import Signup from './component/signup';
import Login from './component/Login';

function App() {
  return (
    <Route>
      {user && <Route path = '/ ' exact elemente = {<Main/>}/>}
      <Route path = '/signup' exact element = {<Signup/>}/>
      <Route path = '/login' exact element = {<Login/>}/>
      <Route path = '/' exact element = {<Navigate replace to = "/login"/>}/>
    </Route>
  );
}

export default App;
