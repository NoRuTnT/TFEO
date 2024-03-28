import axios from 'axios';
export const getAddressApi = async () => {
  try {
    const response = await axios.post(
      'https://business.juso.go.kr/addrlink/addrLinkUrl.do',
      {
        confmKey: process.env.REACT_APP_ADDRESS_SEARCH_KEY,
        returnUrl: 'http://localhost:3000',
      },
      {
        headers: {
          'Access-Control-Allow-Origin': 'http://localhost:3000',
          'Content-Type': 'application/json',
        },
      },
    );
    return response.data;
  } catch (e) {
    console.log(e);
  }
};
