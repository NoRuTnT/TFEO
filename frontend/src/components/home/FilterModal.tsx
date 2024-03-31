import React, { useState, useEffect } from 'react';
import '../../styles/home/Header.css';
import styled from '@emotion/styled';
import { Slider, Box, Typography, Button, Grid } from '@mui/material';
import { RecommendAxios } from '../../api/RecommendAxios';
import { useHomeStore } from '../../store/HomeStore';

interface FilterModalProps {
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
}

const FilterModal: React.FC<FilterModalProps> = ({ modalOpen, setModalOpen }) => {
  const [range, setRange] = React.useState<number[]>([0, 1000000]);
  const {
    search_condition,
    setSearchCondition,
    marks,
    options,
    types,
    toggleRentRange,
    toggleOption,
    toggleType,
    setSearchFilterChanged,
  } = useHomeStore();
  const [newSearchCondition, setNewSearchCondition] = useState(search_condition);
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
  const handleChange = (event: Event, newRange: number | number[]) => {
    setRange(newRange as number[]);
    toggleRentRange(newRange as number[]);
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

  useEffect(() => {
    return () => {
      console.log('unmount');
      setSearchFilterChanged(true);
    };
  }, []);

  return (
    <ModalContainer>
      <ModalContent>
        <Box sx={style}>
          <Typography sx={{ textAlign: 'left' }} id="modal-modal-title" variant="h6" component="h2">
            가격 범위
          </Typography>
          <Slider
            getAriaLabel={() => 'Price range'}
            value={range}
            onChange={handleChange}
            marks={marks}
            min={marks[0].value}
            max={marks[1].value}
            valueLabelDisplay="on"
            // getAriaValueText={valuetext}
          />
          <Typography sx={{ textAlign: 'left' }} id="modal-modal-title" variant="h6" component="h2">
            집 옵션
          </Typography>
          <Grid container spacing={1}>
            {options.map((option) => (
              <Grid item xs={6} key={option.option}>
                <Button
                  onClick={() => handleOptionClick(option.value, option.choice)}
                  style={{ width: '120px', height: '40px' }}
                  variant={option.choice ? 'contained' : 'outlined'}
                >
                  {option.option}
                </Button>
              </Grid>
            ))}
          </Grid>
          <Typography sx={{ textAlign: 'left' }} id="modal-modal-title" variant="h6" component="h2">
            집 타입
          </Typography>
          <Grid container spacing={1}>
            {types.map((type) => (
              <Grid item xs={6} key={type.type}>
                <Button
                  onClick={() => handleTypeClick(type.value, type.choice)}
                  style={{ width: '120px', height: '40px' }}
                  variant={type.choice ? 'contained' : 'outlined'}
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
