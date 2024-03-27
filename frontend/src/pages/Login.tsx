// const Header: React.FC = () => {
//   return <div>Header Placeholder</div>;
// };
//
// export default Header;

// LoginPage.tsx
import React from 'react';

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
        <button onClick={kakaologin}>카카오</button>
        <button onClick={googlelogin}>구글</button>
      </div>
    </div>
  );
};

export default LoginPage;
