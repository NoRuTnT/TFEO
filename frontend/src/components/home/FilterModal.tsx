import React, { useState, useEffect } from 'react';
import '../../styles/home/Header.css';
import styled from '@emotion/styled';
import { Slider, Box, Typography, Button, Grid } from '@mui/material';
import { RecommendAxios } from '../../api/RecommendAxios';
import { useHomeStore } from '../../store/HomeStore';
import { debounce } from 'lodash';

interface FilterModalProps {
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
}

const FilterModal: React.FC<FilterModalProps> = ({ modalOpen, setModalOpen }) => {
  const [range, setRange] = React.useState<number[]>([0, 1000000]);
  const {
    search_condition,
    filter_condition,
    member_personality,
    setSearchCondition,
    marks,
    options,
    types,
    toggleRentRange,
    toggleOption,
    toggleType,
    setSearchFilterChanged,
    setHomes,
    setHeaderFilterChanged,
  } = useHomeStore();
  const [newSearchCondition, setNewSearchCondition] = useState(search_condition);
  const [buttonClicked, setButtonClicked] = useState(false); // State to track button click

  const ModalContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  `;

  const ModalContent = styled.div`
    background-color: white;
    padding: 20px;
    border-radius: 8px;
  `;

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };
  const debouncedSetRange = React.useCallback(
    debounce((newRange: number[]) => {
      setRange(newRange);
      toggleRentRange(newRange);
    }, 300),
    [],
  ); // 300ms 디바운싱

  const handleChange = (event: Event, newRange: number | number[]) => {
    debouncedSetRange(newRange as number[]);
  };

  const handleButtonClick = () => {
    setSearchCondition(newSearchCondition);
    setModalOpen(false);
  };

  const handleOptionClick = (optionName: string, optionChoice: boolean) => {
    toggleOption(optionName);
    setNewSearchCondition((prevState) => ({
      ...prevState,
      [optionName]: !optionChoice,
    }));
  };

  const handleTypeClick = (typeName: string, typeChoice: boolean) => {
    toggleType(typeName);
    setNewSearchCondition((prevState) => ({
      ...prevState,
      [typeName]: !typeChoice,
    }));
  };

  const fetchData = async () => {
    try {
      const requestData = {
        filter_condition: filter_condition,
        search_condition: search_condition,
        member_personality: member_personality,
      };
      console.log('요청 : ', requestData);
      const response = await RecommendAxios.post('/recommend', requestData);
      setHomes(response.data);
      console.log('응답 : ', response.data);
      setHeaderFilterChanged(false);
    } catch (error) {
      console.error('집 리스트 조회 실패 : ', error);
    }
  };

  useEffect(() => {
    setRange([search_condition.rent_min, search_condition.rent_max]);
    return () => {
      setHeaderFilterChanged(true);
    };
  }, []);

  return (
    <ModalContainer>
      <ModalContent>
        <Box sx={style}>
          <Typography
            sx={{ textAlign: 'left', marginBottom: '35px' }}
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            가격 범위
          </Typography>
          <div style={{ position: 'relative', margin: 'auto', width: '90%' }}>
            <Slider
              aria-label="Price range"
              defaultValue={[0, 100]} // 초기 최소 및 최대 범위 설정
              valueLabelDisplay="on"
              step={1}
              min={0}
              max={100}
              // onChange={handleChange} // 범위 변경 시 호출될 함수
            />
          </div>
          <div style={{ position: 'absolute', right: '40px', top: '135px' }}>만원</div>
          <Typography
            sx={{ textAlign: 'left', marginTop: '10px', marginBottom: '10px' }}
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            집 옵션
          </Typography>
          <Grid container spacing={1}>
            {options.map((option) => (
              <Grid item xs={4} key={option.option}>
                <Button
                  onClick={() => {
                    handleOptionClick(option.value, option.choice);
                    setButtonClicked(true); // Set button clicked state to true
                  }}
                  style={{
                    width: '105px',
                    height: '50px',
                    border: buttonClicked && option.choice ? '1px solid #E07068' : '1px solid black',
                    backgroundColor: buttonClicked && option.choice ? '#E07068' : 'white',
                    color: buttonClicked && option.choice ? 'white' : 'black',
                  }}
                >
                  {option.option}
                </Button>
              </Grid>
            ))}
          </Grid>
          <Typography
            sx={{ textAlign: 'left', marginTop: '15px', marginBottom: '10px' }}
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            집 타입
          </Typography>
          <Grid container spacing={1}>
            {types.map((type) => (
              <Grid item xs={4} key={type.type}>
                <Button
                  onClick={() => {
                    handleTypeClick(type.value, type.choice);
                    setButtonClicked(true); // Set button clicked state to true
                  }}
                  style={{
                    width: '105px',
                    height: '50px',
                    border: buttonClicked && type.choice ? '1px solid #E07068' : '1px solid black',
                    backgroundColor: buttonClicked && type.choice ? '#E07068' : 'white',
                    color: buttonClicked && type.choice ? 'white' : 'black',
                  }}
                >
                  {type.type}
                </Button>
              </Grid>
            ))}
          </Grid>
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
            <Button onClick={handleButtonClick} color="primary">
              확인
            </Button>
          </Box>
        </Box>
      </ModalContent>
    </ModalContainer>
  );
};

export default FilterModal;
