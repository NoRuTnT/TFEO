import React, { useState } from 'react';
import ContractProgressBar from '../components/contract/ContractProgressBar';
import Footer from '../components/footer/Footer';
import ContractHomeCard from '../components/contract/ContractHomeCard';
import ContractCompletedContent from '../components/contract/ContractCompletedContent';
import ContractAppliedContent from '../components/contract/ContractAppliedContent';
import ContractInProgressContent from '../components/contract/ContractInProgressContent';
import '../styles/Contract.css';

const Contract = () => {
  const [status, setStatus] = useState<string>('applied');
  const setApplied = () => {
    setStatus('applied');
  };
  const setInProgress = () => {
    setStatus('in-progress');
  };
  const setCompleted = () => {
    setStatus('completed');
  };
  const renderByStatus = (status: string) => {
    switch (status) {
      case 'applied':
        console.log('applied');
        return <ContractAppliedContent />;
      case 'in-progress':
        console.log('in-progress');
        return <ContractInProgressContent />;
      case 'completed':
        console.log('completed');
        return <ContractCompletedContent />;
    }
  };
  return (
    <div className="contract">
      <ContractProgressBar status={status} />
      <ContractHomeCard />
      <button onClick={setApplied}>applied</button>
      <button onClick={setInProgress}>inProgress</button>
      <button onClick={setCompleted}>completed</button>
      <hr />
      {renderByStatus(status)}
      <Footer />
    </div>
  );
};
export default Contract;
