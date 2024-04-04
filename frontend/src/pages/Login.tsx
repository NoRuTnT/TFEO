import React from 'react';
import '../styles/Login.css';

const LoginPage: React.FC = () => {
  const redirectToAuthUrl = (url: string) => {
    window.location.href = url;
  };

  const kakaologin = () => {
    const url = `https://j10a707.p.ssafy.io/oauth2/authorization/kakao`;
    redirectToAuthUrl(url);
  };

  const googlelogin = () => {
    const url = `https://j10a707.p.ssafy.io/oauth2/authorization/google`;
    redirectToAuthUrl(url);
  };

  return (
    <div>
      <div>
        <img src="/landing/background.png" style={{ height: '100vh', width: '100%' }} />
      </div>
      <div style={{ position: 'fixed', top: '80px', left: '50px', fontSize: '45px' }} className="fade-in-down">
        <div style={{ fontFamily: 'iceJaram-Rg', fontWeight: 'bold' }}>스물다섯 여든하나</div>
        <div style={{ fontSize: '17px', marginTop: '10px', marginRight: '60px' }}>
          특별한 인연을 만드는 공간, 인생 선배가 여러분을 기다립니다.
        </div>
      </div>
      {/*<img style={{ height: '100vh' }} src="/test/landing.png" alt="image" />*/}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} className="fade-in">
        <div
          style={{
            width: '80%',
            height: '20%',
            position: 'fixed',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            bottom: '50px',
          }}
        >
          <button
            style={{
              width: '100%',
              height: '40%',
              marginTop: '10px',
              backgroundColor: '#fee500',
              borderRadius: '5px',
              border: '1px solid darkgray',
            }}
            onClick={kakaologin}
          >
            <div style={{ display: 'flex', width: '100%' }}>
              <img style={{ width: '8%', marginLeft: '20px' }} src="/login/kakao.png" />
              <div style={{ width: '90%', margin: 'auto' }}>카카오로 시작하기</div>
            </div>
          </button>

          <button
            style={{
              width: '100%',
              height: '40%',
              marginTop: '5px',
              backgroundColor: 'white',
              borderRadius: '5px',
              border: '1px solid darkgray',
            }}
            onClick={googlelogin}
          >
            <div style={{ display: 'flex', width: '100%' }}>
              <img style={{ width: '9%', marginLeft: '20px' }} src="/login/google.png" />
              <div style={{ width: '90%', margin: 'auto' }}>구글로 시작하기</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
