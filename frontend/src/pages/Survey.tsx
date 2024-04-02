import React, { MouseEventHandler, useState } from 'react';
import Slider from 'react-slick';
import { Autocomplete, TextField, Button, Box, Paper, Typography, Grid, Slider as MSlider, Stack } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';
import { styled } from '@mui/system';
import { Link } from 'react-router-dom';
import { useMemberStore } from '../store/MemberStore';
import colleges from '../api/surveyData';
import { customAxios } from '../api/customAxios';
import { IMember } from '../interfaces/MemberInterface';

const Survey: React.FC = () => {
  const [slider, setSlider] = useState<Slider | null>(null);
  const [sliderValue, setSliderValue] = useState(5);
  const [selectedCollege, setSelectedCollege] = useState('대학교');
  const changeSliderValue = (event: Event, newValue: number | number[]) => {
    setSliderValue(newValue as number);
    setMemberInfo(13, newValue);
  };
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    afterChange: (current: number) => setIndex(current), // Update the current index after slide change
    ref: (slider: Slider) => setSlider(slider), // Connect the slider ref
  };
  const { MemberInfo, setCollege, setMemberPersonality, setGender, updateMemberPersonality } = useMemberStore();

  const [requestData, setRequestData] = useState<IMember>();

  const QuestionContainer = styled(Paper)({
    boxShadow: 'none',
    padding: ' 0px',
    marginTop: '40px',
    textAlign: 'center',
    whiteSpace: 'pre-wrap',
    height: '80vh',
  });

  const AnswerButton = styled(Button)({
    margin: '10px',
    width: '100%',
    height: '50px',
    fontSize: '18px',
    marginBottom: '10px',
  });

  const NavigationButton = styled(Button)({
    margin: '0 5px',
  });

  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
  }));

  const marks = [
    { value: 0, label: '0' },
    { value: 10, label: '10' },
  ];

  const data = [
    {
      question: '다니고 있는 학교를\n알려주세요',
      answer: [],
      nextButton: true,
    },
    {
      question: '성별은\n무엇인가요?',
      answer: ['남성', '여성'],
      nextButton: false,
    },
    {
      question: '주로 활동하는 시간대는\n언제인가요?',
      answer: ['낮', '저녁'],
      nextButton: false,
    },
    {
      question: '집에 귀가하는 시간대는\n주로 언제인가요?',
      answer: ['일찍 들어오는 편이에요.', '늦게 들어오는 편이에요.'],
      nextButton: false,
    },
    {
      question: '저녁은 보통\n어디서 먹나요?',
      answer: ['집에서', '밖에서'],
      nextButton: false,
    },
    {
      question: '나는 담배를',
      answer: ['핀다', '피지 않는다'],
      nextButton: false,
    },
    {
      question: '나는 술을',
      answer: ['좋아한다', '좋아하지 않는다'],
      nextButton: false,
    },
    {
      question: '집에 얼마나 머무르나요?',
      answer: ['주로 집에 있어요', '약속이 많아요'],
      nextButton: false,
    },
    {
      question: '집이 조용한 것을\n선호하나요?',
      answer: ['네', '아니오'],
      nextButton: false,
    },
    {
      question: '입주 이후 계약을\n연장할 의사가 있나요?',
      answer: ['네', '아니오'],
      nextButton: false,
    },
    {
      question: '살고 있는 집에\n반려동물이 있어도 괜찮나요?',
      answer: ['네', '아니오'],
      nextButton: false,
    },
    {
      question: '견디기 힘든 상황을 골라주세요',
      answer: ['무지 더운 여름', '무지 추운 겨울', '두 가지 다'],
      nextButton: false,
    },
    {
      question: '같이 사는 사람과 집 상태 중\n더 중요한 것은 무엇인가요?',
      answer: ['같이 사는 사람', '집 상태'],
      nextButton: true,
    },
  ];

  const [index, setIndex] = useState(0);
  const [responses, setResponses] = useState(Array(data.length).fill('')); // 각 설문 항목에 대한 응답 저장

  const handleNext = () => {
    slider?.slickNext();
  };

  const handleResponse = (selectedAnswer: string) => {
    setSelectedCollege(selectedAnswer);
    const newResponses = [...responses];
    newResponses[index] = selectedAnswer;
    setMemberInfo(index, selectedAnswer);
    setResponses(newResponses);
    if (!data[index - 1].nextButton) {
      slider?.slickNext();
    }
  };
  const setMemberInfo = (idx: number, response: any) => {
    if (idx === 1) {
      // 대학교
      colleges.forEach((college) => {
        if (college.name === response) {
          setCollege(college.name, college.lat, college.lng);
        }
      });
    } else if (idx === 2) {
      // 성별
      if (response === '남성') {
        setGender('M');
      } else {
        setGender('F');
      }
    } else if (idx === 3) {
      // 활동 시간
      if (response === '낮') {
        updateMemberPersonality('daytime', 1);
        updateMemberPersonality('nighttime', 0);
      } else {
        updateMemberPersonality('daytime', 0);
        updateMemberPersonality('nighttime', 1);
      }
    } else if (idx === 4) {
      if (response === '일찍 들어오는 편이에요.') {
        updateMemberPersonality('fast', 1);
        updateMemberPersonality('late', 0);
      } else {
        updateMemberPersonality('fast', 0);
        updateMemberPersonality('late', 1);
      }
    } else if (idx === 5) {
      if (response === '집에서') {
        updateMemberPersonality('dinner', 1);
      } else {
        updateMemberPersonality('dinner', 0);
      }
    } else if (idx === 6) {
      if (response === '핀다') {
        updateMemberPersonality('smoke', 1);
      } else {
        updateMemberPersonality('smoke', 0);
      }
    } else if (idx === 7) {
      if (response === '좋아한다') {
        updateMemberPersonality('drink', 1);
      } else {
        updateMemberPersonality('drink', 0);
      }
    } else if (idx === 8) {
      if (response === '주로 집에 있어요') {
        updateMemberPersonality('inside', 1);
        updateMemberPersonality('outside', 0);
      } else {
        updateMemberPersonality('inside', 0);
        updateMemberPersonality('outside', 1);
      }
    } else if (idx === 9) {
      if (response === '네') {
        updateMemberPersonality('quiet', 1);
      } else {
        updateMemberPersonality('quiet', 0);
      }
    } else if (idx === 10) {
      if (response === '네') {
        updateMemberPersonality('liveLong', 1);
        updateMemberPersonality('liveShort', 0);
      } else {
        updateMemberPersonality('liveLong', 0);
        updateMemberPersonality('liveShort', 1);
      }
    } else if (idx === 11) {
      if (response === '네') {
        updateMemberPersonality('fast', 1);
        updateMemberPersonality('late', 0);
      } else {
        updateMemberPersonality('fast', 1);
        updateMemberPersonality('late', 0);
      }
    } else if (idx === 12) {
      if (response === '무지 더운 여름') {
        updateMemberPersonality('hot', 1);
        updateMemberPersonality('cold', 0);
      } else if (response == '무지 추운 겨울') {
        updateMemberPersonality('hot', 0);
        updateMemberPersonality('cold', 1);
      } else {
        updateMemberPersonality('hot', 1);
        updateMemberPersonality('cold', 1);
      }
    } else if (idx == 13) {
      updateMemberPersonality('hostHousePrefer', response);
    }
  };

  const sendData = async () => {
    const requestData = {
      member: {
        college: MemberInfo.college,
        lat: MemberInfo.lat,
        lng: MemberInfo.lng,
        gender: MemberInfo.gender,
      },
      memberPersonality: {
        daytime: MemberInfo.memberPersonality.daytime,
        nighttime: MemberInfo.memberPersonality.nighttime,
        fast: MemberInfo.memberPersonality.fast,
        late: MemberInfo.memberPersonality.late,
        dinner: MemberInfo.memberPersonality.dinner,
        smoke: MemberInfo.memberPersonality.smoke,
        drink: MemberInfo.memberPersonality.drink,
        outside: MemberInfo.memberPersonality.outside,
        inside: MemberInfo.memberPersonality.inside,
        quiet: MemberInfo.memberPersonality.quiet,
        liveLong: MemberInfo.memberPersonality.liveLong,
        liveShort: MemberInfo.memberPersonality.liveShort,
        pet: MemberInfo.memberPersonality.pet,
        cold: MemberInfo.memberPersonality.cold,
        hot: MemberInfo.memberPersonality.hot,
        hostHousePrefer: MemberInfo.memberPersonality.hostHousePrefer,
      },
    };

    // 학생 성향 정보 DB 저장
    await customAxios
      .post(`api/members/survey`, requestData)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Box sx={{ width: '100%' }}>
        <Slider {...settings}>
          <QuestionContainer>
            <br />
            <br />
            <Typography variant="h4">성향 테스트</Typography>
            <Box height={200} width={200}></Box>
            <Button onClick={handleNext}>설문하러 가기</Button>
            <Typography variant="body2">설문조사는 집주인 추천에 반영됩니다</Typography>
          </QuestionContainer>
          {data.map((item, idx) => (
            <QuestionContainer key={idx}>
              <Box sx={{ position: 'relative', margin: '40px' }}>
                <Typography variant="body2" color="black" fontSize="15px" marginBottom="10px" marginTop="80px">
                  {idx + 1}/{data.length}
                </Typography>
                <BorderLinearProgress variant="determinate" value={((idx + 1) * 100) / data.length} />
              </Box>
              <Typography marginTop="60px" fontSize="20px">
                {item.question}
              </Typography>
              {idx == 0 && (
                <div>
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={colleges.map((college) => college.name)}
                    sx={{ width: 295, margin: '70px auto' }}
                    renderInput={(params) => <TextField {...params} label={selectedCollege} />}
                    onChange={(event, value) => handleResponse(value as string)}
                  />
                </div>
              )}
              {idx >= 1 && idx < 12 && !item.nextButton && (
                <Grid container spacing={2} justifyContent="center">
                  {item.answer.map((answerItem, answerIdx) => (
                    <Grid item xs={8} md={6} key={answerIdx}>
                      <AnswerButton variant="outlined" color="primary" onClick={() => handleResponse(answerItem)}>
                        {answerItem}
                      </AnswerButton>
                    </Grid>
                  ))}
                </Grid>
              )}
              {idx == 12 && (
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
                  <Box sx={{ width: 300 }}>
                    <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
                      <div style={{ width: '50px' }}>
                        <Typography variant="body1">사람</Typography>
                      </div>
                      <MSlider
                        aria-label="importance"
                        value={sliderValue}
                        valueLabelDisplay="auto"
                        shiftStep={3}
                        step={1}
                        min={0}
                        max={10}
                        onChange={changeSliderValue}
                      />
                      <Typography variant="body1">집</Typography>
                    </Stack>
                  </Box>
                </div>
              )}
              {item.nextButton && (
                <Box mt={2} sx={{ position: 'fixed', bottom: '60px', marginLeft: '300px' }}>
                  <NavigationButton
                    variant="text"
                    color="inherit"
                    onClick={handleNext}
                    disabled={index === data.length - 1}
                  >
                    다음 &gt;&gt;
                  </NavigationButton>
                </Box>
              )}
            </QuestionContainer>
          ))}
          <QuestionContainer>
            <div style={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
              <Typography variant="h6">
                🥳 설문을 완료했어요! <br />
                마이페이지에서 내 정보를 <br />
                추가로 입력할 수 있어요 <br /> <br />
                <Button onClick={sendData} component={Link} to="/home">
                  집보러가기
                </Button>
              </Typography>
            </div>
          </QuestionContainer>
        </Slider>
      </Box>
    </Box>
  );
};

export default Survey;
