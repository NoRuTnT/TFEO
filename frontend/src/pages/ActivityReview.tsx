import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/MainPage.css';
import Footer from '../components/footer/Footer';
import '../styles/Footer.css';
import '../styles/ActivityContent.css';
import { writeReview } from '../api/ReviewApis';
import { useReviewStore } from '../store/ReviewStore';
import { IReviewKeyword } from '../interfaces/ReviewKeywordInterface';

const ActivityContent: React.FC = ({ history }: any) => {
  const [homeNo, setHomeNo] = useState<number>(0);
  const { ReviewInfo, setReview } = useReviewStore();
  const [homeContent, setHomeContent] = useState<string>('');

  useEffect(() => {
    const homeNofromUrl = new URLSearchParams(location.search).get('homeNo');
    const parsedHomeNo = homeNofromUrl ? parseInt(homeNofromUrl, 10) : 0;
    setHomeNo(parsedHomeNo);

    // 컴포넌트가 마운트될 때 keywordValues의 choice를 모두 false로 초기화
    setReview((currentState) => ({
      ...currentState,
      keywordValues: currentState.keywordValues.map((kw) => ({ ...kw, choice: false })),
    }));
  }, []);

  //글 입력
  const handleHomeContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setHomeContent(event.target.value);
  };

  //키워드 선택
  const toggleKeywordChoice = (value: string) => {
    setReview((currentState) => ({
      ...currentState,
      keywordValues: currentState.keywordValues.map((kw) => (kw.value === value ? { ...kw, choice: !kw.choice } : kw)),
    }));
  };

  //작성 취소
  const handleCancel = () => {
    if (history) {
      history.goBack(); // 이전 페이지로 이동
    } else {
      console.error('History object is undefined.');
    }
  };

  //리뷰 제출
  const handleSubmit = async () => {
    if (!homeNo) {
      console.error('Home number is not available.');
      return;
    }

    const reviewKeywords: IReviewKeyword = {
      kindElderly: false,
      cleanHouse: false,
      spaciousRoom: false,
      manyNearbyAmenities: false,
      matchesStatedOptions: false,
      affordableRent: false,
      nearSchool: false,
      convenientTransportation: false,
      easyAccessToHome: false,
      goodSecurity: false,
      respectfulElderly: false,
    };

    ReviewInfo.keywordValues.forEach((keyword) => {
      if (keyword.value in reviewKeywords) {
        reviewKeywords[keyword.value as keyof IReviewKeyword] = keyword.choice;
      }
    });

    await writeReview(homeNo, homeContent, reviewKeywords);
  };

  return (
    <div className="main-page">
      <div style={{ fontWeight: 'bold', fontSize: '20px', margin: '10px' }}>어르신과 함께한 6개월은 어떠셨나요?</div>
      <div style={{ fontSize: '16px', marginBottom: '10px' }}> 키워드를 골라주세요 </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', maxWidth: '400px' }}>
        {ReviewInfo.keywordValues.map((kw, index) => (
          <button
            key={index}
            style={{
              backgroundColor: kw.choice ? '#F9EAE1' : 'transparent',
              border: '1px solid black',
              borderRadius: '20px',
              padding: '5px 10px',
              margin: '3px',
              cursor: 'pointer',
              fontSize: '10px',
              flex: '0 0 calc(50% - 6px)', // 2열로 표시되도록 설정
              boxSizing: 'border-box',
            }}
            onClick={() => toggleKeywordChoice(kw.value)}
          >
            {kw.keyword}
          </button>
        ))}
      </div>

      <div>
        <textarea
          // value={homeContent} // value를 homeContent 상태로 설정
          onChange={handleHomeContentChange} // 입력값 변경 시 핸들러 호출
          placeholder="리뷰를 작성해 주세요."
          style={{
            width: '280px',
            height: '230px',
            margin: '10px 0',
            padding: '10px',
            border: '1px solid black',
            borderRadius: '10px',
            color: 'grey',
          }}
        />
      </div>
      <div>
        <button style={{ marginRight: '10px' }} onClick={handleCancel}>
          취소
        </button>
        <Link to={{ pathname: '/home-detail', search: `?homeNo=${homeNo}` }}>
          <button onClick={handleSubmit}>등록</button>
        </Link>
      </div>
    </div>
  );
};

export default ActivityContent;
