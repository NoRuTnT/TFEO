import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import MyInfo from './pages/MyInfo';
import ApplyList from './pages/ApplyList';
import ActivityCertification from './pages/ActivityCertification';
import ActivityContent from './pages/ActivityContent';
import MakeActivity from './pages/MakeActivity';
import FindHouse from './pages/FindHouse';
import Contract from './pages/Contract';
import ContractForm from './pages/ContractForm';
import './styles/App.css';
import Survey from './pages/Survey';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/my-info" element={<MyInfo />} />
          <Route path="/apply-list" element={<ApplyList />} />
          <Route path="/activity-certification" element={<ActivityCertification />} />
          <Route path="/activity-content" element={<ActivityContent />} />
          <Route path="/make-activity" element={<MakeActivity />} />
          <Route path="/find-house" element={<FindHouse />} />
          <Route path="/contract" element={<Contract />} />
          <Route path="/contract-form" element={<ContractForm />} />
          <Route path="/survey" element={<Survey />} />
          {/* ... 여기에 더 많은 라우트를 추가할 수 있습니다 ... */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
