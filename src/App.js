import { Routes, Route } from 'react-router-dom';
import Accounts from './components/Accounts';
import AccountStatements from './components/AccountStatements';
import Login from './components/Login';
import AdditionalAccountMovements from './components/AdditionalAccountMovements';
import MasterAccountMovements from './components/MasterAccountMovements';
import SubAccountStatement from './components/SubAccountStatement';
import { getMyIP } from './constants';
function App() {
  getMyIP();
  document.body.style = 'background: #d3d3d3;';
  return (
    <div className="App container px-5">
      <Routes>
        <Route path='*' element={<Login />} />
        <Route path='/login' element={<Login />} />
        <Route path='/accounts' element={<Accounts />} />
        <Route path='/account-statements/:cardCode' element={<AccountStatements />} />
        <Route path='/subaccount-statements/:cardCode' element={<SubAccountStatement />} />
        <Route path='/additional-account-movements/:idStatement/:cardCode' element={<AdditionalAccountMovements/>} />
        <Route path='/master-account-movements/:idStatement/:cardCode' element={<MasterAccountMovements/>} />
      </Routes>
    </div>
  );
}

export default App;