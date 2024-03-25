import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import DirectionsSubwayIcon from '@mui/icons-material/DirectionsSubway';
import ApartmentIcon from '@mui/icons-material/Apartment';
import PetsIcon from '@mui/icons-material/Pets';
import TuneIcon from '@mui/icons-material/Tune';
import '../../styles/home/Header.css';

type CriteriaName = 'School' | 'Subway' | 'Apartment' | 'Pets';

const Footer: React.FC = () => {
  const theme = useTheme();

  const [colorToggled, setColorToggled] = useState<Record<CriteriaName, boolean>>({
    School: false,
    Subway: false,
    Apartment: false,
    Pets: false,
  });

  const handleToggleColor = (criteriaName: CriteriaName) => {
    setColorToggled((prevState) => ({
      ...prevState,
      [criteriaName]: !prevState[criteriaName],
    }));
  };

  const getDescriptionStyle = (criteriaName: CriteriaName): React.CSSProperties => {
    return colorToggled[criteriaName] ? { fontWeight: 'bold' } : {};
  };

  const getIconStyle = (isActive: boolean): React.CSSProperties => ({
    fontSize: '45px',
    color: isActive ? '#000000' : theme.palette.primary.contrastText,
  });

  return (
    <header>
      <div className="criteria-container">
        <div className="element-container" onClick={() => handleToggleColor('School')}>
          <AccountBalanceIcon style={getIconStyle(colorToggled.School)} />
          <span className="criteria-description" style={getDescriptionStyle('School')}>
            학교 근처
          </span>
        </div>
        <div className="element-container" onClick={() => handleToggleColor('Subway')}>
          <DirectionsSubwayIcon style={getIconStyle(colorToggled.Subway)} />
          <span className="criteria-description" style={getDescriptionStyle('Subway')}>
            역세권
          </span>
        </div>
        <div className="element-container" onClick={() => handleToggleColor('Apartment')}>
          <ApartmentIcon style={getIconStyle(colorToggled.Apartment)} />
          <span className="criteria-description" style={getDescriptionStyle('Apartment')}>
            아파트
          </span>
        </div>
        <div className="element-container" onClick={() => handleToggleColor('Pets')}>
          <PetsIcon style={getIconStyle(colorToggled.Pets)} />
          <span className="criteria-description" style={getDescriptionStyle('Pets')}>
            반려동물
          </span>
        </div>
        <div className="circle-border">
          <TuneIcon fontSize="medium" style={{ color: '#A0A0A0', cursor: 'pointer' }} />
        </div>
      </div>
    </header>
  );
};

export default Footer;
