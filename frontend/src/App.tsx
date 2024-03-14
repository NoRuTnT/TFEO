import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import MyInfo from './pages/MyInfo';
import ApplyList from './pages/ApplyList';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/my-info" element={<MyInfo />} />
          <Route path="/apply-list" element={<ApplyList />} />
          {/* ... 여기에 더 많은 라우트를 추가할 수 있습니다 ... */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
