import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import MyInfo from './pages/MyInfo';
import ApplyList from './pages/ApplyList';
import ActivityCertification from './pages/ActivityCertification';
import ActivityContent from './pages/ActivityContent';
import ActivityReview from './pages/ActivityReview';
import MakeActivity from './pages/MakeActivity';
import FindHouse from './pages/FindHouse';
import Contract from './pages/Contract';
import ContractForm from './pages/ContractForm';
import './styles/App.css';
import Survey from './pages/Survey';
import ContractTest from './components/contract/ContractTest';
import { IHomeDetail } from './interfaces/HomeInterface';
import HomeDetail from './pages/HomeDetail';
import LoginPage from './pages/Login';
import WishList from './pages/WishList';

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
          <Route path="/activity-review" element={<ActivityReview />} />
          <Route path="/make-activity" element={<MakeActivity />} />
          <Route path="/find-house" element={<FindHouse />} />
          <Route path="/home-detail" element={<HomeDetail />} />
          <Route path="/contract" element={<Contract />} />
          <Route path="/contract-form" element={<ContractForm />} />
          <Route path="/survey" element={<Survey />} />
          <Route path="/login" element={<LoginPage />} />
          {/* ... 여기에 더 많은 라우트를 추가할 수 있습니다 ... */}
          <Route path="/contract-test" element={<ContractTest />} />
          <Route path="/wish-list" element={<WishList />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
