import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import DirectionsSubwayIcon from '@mui/icons-material/DirectionsSubway';
import ApartmentIcon from '@mui/icons-material/Apartment';
import PetsIcon from '@mui/icons-material/Pets';
import TuneIcon from '@mui/icons-material/Tune';
import '../../styles/home/Header.css';
import styled from '@emotion/styled';
import { Modal, Slider, Box, Typography, Button, Grid } from '@mui/material';

const Footer: React.FC = () => {
  const theme = useTheme();
  const { school, subway, apartment, pets, selectFilter } = useHomeStore();

  const getDescriptionStyle = (filter: boolean): React.CSSProperties => {
    return filter ? { fontWeight: 'bold' } : {};
  const marks = [
    {
      value: 0,
      label: '0만원',
    },
    {
      value: 100,
      label: '100만원',
    },
  ];

  const [options, setOptions] = useState<{ option: string; value: string; choice: boolean }[]>([
    { option: '인터넷', value: 'internet', choice: false },
    { option: '가스레인지', value: 'gas', choice: false },
    { option: '세탁기', value: 'washing_machine', choice: false },
    { option: '냉장고', value: 'refrigerator', choice: false },
    { option: '에어컨', value: 'air_conditioner', choice: false },
    { option: '엘리베이터', value: 'elevator', choice: false },
    { option: '전자레인지', value: 'microwave', choice: false },
    { option: '개인화장실', value: 'toilet', choice: false },
    { option: '조식', value: 'breakfast', choice: false },
    { option: '난방', value: 'heating', choice: false },
    { option: '주차', value: 'parking', choice: false },
    { option: '싱크대', value: 'sink', choice: false },
  ]);

  const [types, setTypes] = useState<{ type: string; value: string; choice: boolean }[]>([
    { type: '아파트', value: 'apt', choice: false },
    { type: '빌라', value: 'vl', choice: false },
    { type: '오피스', value: 'opst', choice: false },
    { type: '원룸', value: 'oneroom', choice: false },
  ]);

  const handleToggleColor = (criteriaName: CriteriaName) => {
    setColorToggled((prevState) => ({
      ...prevState,
      [criteriaName]: !prevState[criteriaName],
    }));

    setOptions((prevOptions) =>
      prevOptions.map((option) => (option.value === criteriaName ? { ...option, choice: !option.choice } : option)),
    );
    setTypes((prevTypes) =>
      prevTypes.map((type) => (type.value === criteriaName ? { ...type, choice: !type.choice } : type)),
    );
  };

  const getDescriptionStyle = (criteriaName: CriteriaName): React.CSSProperties => {
    return colorToggled[criteriaName] ? { fontWeight: 'bold' } : {};
  };

  const getIconStyle = (isActive: boolean): React.CSSProperties => ({
    fontSize: '45px',
    color: isActive ? '#000000' : theme.palette.primary.contrastText,
  });

  const [modalOpen, setModalOpen] = useState(false);

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

  const [value, setValue] = React.useState<number[]>([0, 1000000]);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  return (
    <header>
      <div className="criteria-container">
        <div className="element-container" onClick={() => selectFilter({ school: !school })}>
          <AccountBalanceIcon style={getIconStyle(school)} />
          <span className="criteria-description" style={getDescriptionStyle(school)}>
            학교 근처
          </span>
        </div>
        <div className="element-container" onClick={() => selectFilter({ subway: !subway })}>
          <DirectionsSubwayIcon style={getIconStyle(subway)} />
          <span className="criteria-description" style={getDescriptionStyle(subway)}>
            역세권
          </span>
        </div>
        <div className="element-container" onClick={() => selectFilter({ apartment: !apartment })}>
          <ApartmentIcon style={getIconStyle(apartment)} />
          <span className="criteria-description" style={getDescriptionStyle(apartment)}>
            아파트
          </span>
        </div>
        <div className="element-container" onClick={() => selectFilter({ pets: !pets })}>
          <PetsIcon style={getIconStyle(pets)} />
          <span className="criteria-description" style={getDescriptionStyle(pets)}>
            반려동물
          </span>
        </div>
        <div className="circle-border">
          <TuneIcon fontSize="medium" style={{ color: '#A0A0A0', cursor: 'pointer' }} />
        </div>
        {modalOpen && (
          <ModalContainer>
            <ModalContent>
              <Box sx={style}>
                <Typography sx={{ textAlign: 'left' }} id="modal-modal-title" variant="h6" component="h2">
                  가격 범위
                </Typography>
                <Slider
                  getAriaLabel={() => 'Price range'}
                  value={value}
                  onChange={handleChange}
                  marks={marks}
                  min={0}
                  max={100}
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
                        onClick={() => handleToggleColor(option.value as CriteriaName)}
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
                        onClick={() => handleToggleColor(type.value as CriteriaName)}
                        style={{ width: '120px', height: '40px' }}
                        variant={type.choice ? 'contained' : 'outlined'}
                      >
                        {type.type}
                      </Button>
                    </Grid>
                  ))}
                </Grid>
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                  <Button onClick={() => setModalOpen(false)} color="primary">
                    확인
                  </Button>
                </Box>
              </Box>
            </ModalContent>
          </ModalContainer>
        )}
      </div>
    </header>
  );
};

export default Header;
