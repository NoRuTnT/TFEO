import React from 'react';
import '../../styles/ContractProgressBar.css';
import CheckIcon from '@mui/icons-material/Check';
import { styled, useTheme } from '@mui/material/styles';

interface Props {
  status: string;
}

const ContractProgressBar = ({ status }: Props) => {
  const Icon = {
    Check: styled(CheckIcon)({ fontSize: '32px' }),
  };
  return (
    <div className="progressBar">
      <div className="progressBarTitle">
        <div className="left">승인대기</div>
        <div className="center">계약서작성</div>
        <div className="right">계약 완료</div>
      </div>
      <div className="progressBarCircleWrapper">
        <div className="progressBarCircle applied checkCircle" />
        <div className={`progressBarCircle inProgress`} />
        <div className="progressBarCircle completed" />
        <Icon.Check className={'progressBarCircleCheck applied progressBarCircle'} />
        <Icon.Check
          className={`${status !== 'applied' ? 'progressBarCircleCheck' : 'progressBarCircleNot'} inProgress progressBarCircle`}
        />
        <Icon.Check
          className={`${status !== 'completed' ? 'progressBarCircleNot' : 'progressBarCircleCheck'} completed progressBarCircle`}
        />
      </div>
      <div className="progressBarLineWrapper">
        <div className={`progressBarLine ${status !== 'applied' ? 'checkLine' : ''}`} />
        <div className={`progressBarLine ${status !== 'completed' ? '' : 'checkLine'}`} />
      </div>
    </div>
  );
};
export default ContractProgressBar;
