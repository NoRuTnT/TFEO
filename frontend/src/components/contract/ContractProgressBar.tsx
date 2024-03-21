import React from 'react';
import '../../styles/ContractProgressBar.css';

interface Props {
  status: string;
}

const ContractProgressBar = ({ status }: Props) => {
  return (
    <div className="progressBar">
      <div className="progressBarCircle checkCircle" />
      <div className={`progressBarLine ${status !== 'applied' ? 'checkLine' : ''}`} />
      <div className={`progressBarCircle ${status}`} />
      <div className={`progressBarLine inProgress completed`} />
      <div className="progressBarCircle completed" />
    </div>
  );
};
export default ContractProgressBar;
