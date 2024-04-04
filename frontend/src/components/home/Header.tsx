import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import DirectionsSubwayIcon from '@mui/icons-material/DirectionsSubway';
import ApartmentIcon from '@mui/icons-material/Apartment';
import PetsIcon from '@mui/icons-material/Pets';
import BlockIcon from '@mui/icons-material/Block';
import TuneIcon from '@mui/icons-material/Tune';
import '../../styles/home/Header.css';
import { useHomeStore } from '../../store/HomeStore';
import FilterModal from './FilterModal';

const Header: React.FC = () => {
  const theme = useTheme();
  const [modalOpen, setModalOpen] = useState(false);
  const { options, setFilterCondition, toggleFilter, filters, setVisibleHomes, isMapLoaded, setHeaderFilterChanged } =
    useHomeStore();

  useEffect(() => {
    if (isMapLoaded) {
      setHeaderFilterChanged(true);
    }
  }, [isMapLoaded, setVisibleHomes]);

  const getDescriptionStyle = (filter: boolean): React.CSSProperties => {
    return filter ? { fontWeight: 'bold' } : {};
  };

  const getIconStyle = (isActive: boolean): React.CSSProperties => ({
    fontSize: '30px',
    color: isActive ? '#000000' : theme.palette.primary.contrastText,
  });

  const headerFilterClick = (filterKey: string) => {
    toggleFilter(filterKey);
    setHeaderFilterChanged(true);
  };

  return (
    <header>
      <div className="criteria-container">
        <div className="element-container" onClick={() => headerFilterClick(filters[0].value)}>
          <AccountBalanceIcon style={getIconStyle(filters[0].choice)} />
          <span className="criteria-description" style={getDescriptionStyle(filters[0].choice)}>
            {filters[0].option}
          </span>
        </div>
        <div className="element-container" onClick={() => headerFilterClick(filters[1].value)}>
          <DirectionsSubwayIcon style={getIconStyle(filters[1].choice)} />
          <span className="criteria-description" style={getDescriptionStyle(filters[1].choice)}>
            {filters[1].option}
          </span>
        </div>
        <div className="element-container" onClick={() => headerFilterClick(filters[2].value)}>
          <ApartmentIcon style={getIconStyle(filters[2].choice)} />
          <span className="criteria-description" style={getDescriptionStyle(filters[2].choice)}>
            {filters[2].option}
          </span>
        </div>
        <div
          className="element-container"
          style={{ position: 'relative' }}
          onClick={() => headerFilterClick(filters[3].value)}
        >
          <BlockIcon style={getIconStyle(filters[3].choice)} />
          <PetsIcon
            style={{
              ...getIconStyle(filters[3].choice),
              position: 'absolute',
              width: '40%',
              height: '40%',
              left: 14, // 위치 조정이 필요할 수 있습니다.
              top: 5, // 위치 조정이 필요할 수 있습니다.
            }}
          />
          <span className="criteria-description" style={getDescriptionStyle(filters[3].choice)}>
            {filters[3].option}
          </span>
        </div>
        <div className="circle-border">
          <TuneIcon
            onClick={() => setModalOpen(true)}
            fontSize="medium"
            style={{ color: '#A0A0A0', cursor: 'pointer' }}
          />
        </div>
        {modalOpen && <FilterModal modalOpen={modalOpen} setModalOpen={setModalOpen} />}
      </div>
    </header>
  );
};

export default Header;
