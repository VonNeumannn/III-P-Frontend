import { Routes, Route } from 'react-router-dom';
import Accounts from './components/Accounts';
import AccountStatements from './components/AccountStatements';
import Login from './components/Login';
import Movements from './components/Movements';

function App() {
  document.body.style = 'background: #d3d3d3;';
  return (
    <div className="App container px-5">
      <Routes>
        <Route path='*' element={<Login />} />
        <Route path='/login' element={<Login />} />
        <Route path='/accounts' element={<Accounts />} />
        <Route path='/account-statements/:id' element={<AccountStatements />} />
        <Route path='/movements/:id' element={<Movements/>} />
      </Routes>
    </div>
  );
}

export default App;