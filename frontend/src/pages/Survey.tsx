import React, { useState } from 'react';
import Slider from 'react-slick';
import { Autocomplete, TextField, Button, Box, Paper, Typography, Grid, Slider as MSlider, Stack } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';
import { styled } from '@mui/system';
import collage from '../api/surveyData';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';

const Survey: React.FC = () => {
  const [slider, setSlider] = useState<Slider | null>(null);
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    afterChange: (current: number) => setIndex(current), // Update the current index after slide change
    ref: (slider: Slider) => setSlider(slider), // Connect the slider ref
  };

  const QuestionContainer = styled(Paper)({
    boxShadow: 'none',
    padding: '40px',
    marginTop: '40px',
    textAlign: 'center',
    whiteSpace: 'pre-wrap',
  });

  const AnswerButton = styled(Button)({
    margin: '10px',
    width: '100%',
    marginBottom: '10px',
  });

  const NavigationButton = styled(Button)({
    margin: '0 5px',
  });

  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
  }));

  const data = [
    {
      question: '성별과 다니고 있는 학교를\n알려주세요',
      answer: ['남성', '여성'],
      nextButton: true,
    },
    {
      question: '수면 시간과 기상시간을\n표시해주세요',
      answer: ['아침형', '저녁형'],
      nextButton: true,
    },
    {
      question: '평균적으로 몇시에\n집에 들어오나요?',
      answer: ['일찍 들어오는 편이에요', '늦게 들어올 때가 많아요'],
      nextButton: true,
    },
    {
      question: '저녁은 보통\n어디서 먹나요?',
      answer: ['집에서', '밖에서'],
      nextButton: false,
    },
    {
      question: '나는 담배를',
      answer: ['핀다', '안핀다'],
      nextButton: false,
    },
    {
      question: '나는 술을',
      answer: ['좋아한다', '안좋아한다'],
      nextButton: false,
    },
    {
      question: '집에 얼마나 머무르나요?',
      answer: ['집돌이/집순이에요', '약속이 많아요'],
      nextButton: false,
    },
    {
      question: '집에서 조용히 지내는 걸\n선호하나요?',
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
    const newResponses = [...responses];
    newResponses[index] = selectedAnswer;
    setResponses(newResponses);
    if (!data[index - 1].nextButton) {
      slider?.slickNext();
    }
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
                <Typography variant="body2" color="textSecondary">
                  {idx + 1}/{data.length}
                </Typography>
                <BorderLinearProgress variant="determinate" value={((idx + 1) * 100) / data.length} />
              </Box>
              <Typography variant="h6" component="h2" gutterBottom>
                {item.question}
              </Typography>
              {idx == 0 && (
                <div>
                  <Box sx={{ textAlign: 'left' }}>성별</Box>
                  <Grid container spacing={2} justifyContent="center">
                    <Grid item xs={6} md={6}>
                      <AnswerButton variant="outlined" color="primary" onClick={() => handleResponse(`item.answer[0]`)}>
                        {item.answer[0]}
                      </AnswerButton>
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <AnswerButton variant="outlined" color="primary" onClick={() => handleResponse(`item.answer[1]`)}>
                        {item.answer[1]}
                      </AnswerButton>
                    </Grid>
                  </Grid>
                  <Box sx={{ textAlign: 'left' }}>대학교</Box>
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={collage}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="대학교" />}
                  />
                </div>
              )}
              {idx == 1 && (
                <div>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['MobileTimePicker', 'MobileTimePicker', 'MobileTimePicker']}>
                      <DemoItem>
                        <Box sx={{ textAlign: 'left' }}>취침</Box>
                        <TimePicker views={['hours']} label="시간" />
                      </DemoItem>
                      <Box sx={{ textAlign: 'left' }}>기상</Box>
                      <DemoItem>
                        <TimePicker views={['hours']} label="시간" />
                      </DemoItem>
                    </DemoContainer>
                  </LocalizationProvider>
                  <Typography variant="h6" component="h2" gutterBottom>
                    주로 생활하는 시간대가
                    <br />
                    언제인가요
                  </Typography>
                  <Grid container spacing={2} justifyContent="center">
                    <Grid item xs={6} md={6}>
                      <AnswerButton variant="outlined" color="primary" onClick={() => handleResponse(`item.answer[0]`)}>
                        {item.answer[0]}
                      </AnswerButton>
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <AnswerButton variant="outlined" color="primary" onClick={() => handleResponse(`item.answer[1]`)}>
                        {item.answer[1]}
                      </AnswerButton>
                    </Grid>
                  </Grid>
                </div>
              )}
              {idx == 2 && (
                <div>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['MobileTimePicker', 'MobileTimePicker', 'MobileTimePicker']}>
                      <DemoItem>
                        <TimePicker views={['hours']} label="시간" />
                      </DemoItem>
                    </DemoContainer>
                  </LocalizationProvider>
                  <Typography variant="h5" component="h2" gutterBottom margin={2}>
                    저는 집에
                  </Typography>
                  <Grid container spacing={2} justifyContent="center">
                    <Grid item xs={12} md={6}>
                      <AnswerButton variant="outlined" color="primary" onClick={() => handleResponse(`item.answer[0]`)}>
                        {item.answer[0]}
                      </AnswerButton>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <AnswerButton variant="outlined" color="primary" onClick={() => handleResponse(`item.answer[1]`)}>
                        {item.answer[1]}
                      </AnswerButton>
                    </Grid>
                  </Grid>
                </div>
              )}
              {idx > 2 && idx < 11 && <div></div>}
              {!item.nextButton && (
                <Grid container spacing={2} justifyContent="center">
                  {item.answer.map((answerItem, answerIdx) => (
                    <Grid item xs={12} md={6} key={answerIdx}>
                      <AnswerButton variant="outlined" color="primary" onClick={() => handleResponse(answerItem)}>
                        {answerItem}
                      </AnswerButton>
                    </Grid>
                  ))}
                </Grid>
              )}
              {idx == 11 && (
                <div>
                  <Box sx={{ width: 300 }}>
                    <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
                      <Typography variant="body1">사람</Typography>
                      <MSlider
                        aria-label="importance"
                        defaultValue={50}
                        valueLabelDisplay="auto"
                        shiftStep={30}
                        step={10}
                        marks
                        min={0}
                        max={100}
                      />
                      <Typography variant="body1">집</Typography>
                    </Stack>
                  </Box>
                </div>
              )}
              {item.nextButton && (
                <Box mt={2} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <NavigationButton
                    variant="text"
                    color="primary"
                    onClick={handleNext}
                    disabled={index === data.length - 1}
                  >
                    다음
                  </NavigationButton>
                </Box>
              )}
            </QuestionContainer>
          ))}
          <QuestionContainer>
            <Typography variant="h6">
              <br />
              <br />
              🥳 설문을 완료했어요! <br />
              마이페이지에서 내 정보를 <br />
              추가적으로 입력할 수 있어요
            </Typography>
            <br />
            <Button>집보러가기</Button>
          </QuestionContainer>
        </Slider>
      </Box>
    </Box>
  );
};

export default Survey;
