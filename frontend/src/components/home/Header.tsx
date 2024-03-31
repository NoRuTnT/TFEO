import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import DirectionsSubwayIcon from '@mui/icons-material/DirectionsSubway';
import ApartmentIcon from '@mui/icons-material/Apartment';
import PetsIcon from '@mui/icons-material/Pets';
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
  }, [isMapLoaded, setVisibleHomes]); // mapLoaded에 의존하는 useEffect

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

  const getDescriptionStyle = (filter: boolean): React.CSSProperties => {
    return filter ? { fontWeight: 'bold' } : {};
  };

  const getIconStyle = (isActive: boolean): React.CSSProperties => ({
    fontSize: '30px',
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

  const handleOptionClick = (value: string) => {
    toggleOption(value);
  };

  const handleTypeClick = (value: string) => {
    toggleType(value);
  };

  const handleSearchClick = () => {
    setModalOpen(false);
    const fetchData = async () => {
      try {
        // 성향 반영 추천 api
        const requestData = {
          search_condition: search_condition,
          member_personality: member_personality,
        };
        // http://j10a707.p.ssafy.io:8000/recommend
        const response = await RecommendAxios.post('/recommend', requestData);
        console.log(response.data);
        setHomes(response.data); // 상태 업데이트
        setIsMapLoaded(true); // 지도 로드 플래그 설정
      } catch (error) {
        console.error('집 리스트를 가져오는 데 실패했습니다 : ', error);
      }
    };
    fetchData();
  };

  const headerFilterClick = (filterKey: string) => {
    if (filterKey == 'school') {
      selectFilter({ school: !school });
      // 학교 근처 필터링
      const homeBySchool = visibleHomes.filter((home) => home.distance < 5);
      setVisibleHomes(homeBySchool);
      console.log('학교 근처 필터링', homeBySchool);
      console.log('homes', homes);
      console.log('visiblehomes', visibleHomes);
    } else if (filterKey == 'subway') {
      selectFilter({ subway: !subway });
      // 역세권 필터링
      const homesByStation = visibleHomes.filter((home) => home.station === 1);
      setVisibleHomes(homesByStation);
      toggleOption('station');
      console.log('아파트 필터링', homesByStation);
      console.log('homes', homes);
      console.log('visiblehomes', visibleHomes);
    } else if (filterKey == 'apartment') {
      selectFilter({ apartment: !apartment });
      const homesByType = visibleHomes.filter((home) => home.type === 'APT');
      setVisibleHomes(homesByType);
      console.log('아파트 필터링', homesByType);
      console.log('homes', homes);
      console.log('visiblehomes', visibleHomes);
    } else if (filterKey == 'pets') {
      selectFilter({ pets: !pets });
      const homesByPet = visibleHomes.filter((home) => home.pet === 1);
      setVisibleHomes(homesByPet);
      console.log('반려동물 필터링', homesByPet);
      console.log('homes', homes);
      console.log('visibleHomes', visibleHomes);
    }
  };

  const searchFilterClick = () => {
    setModalOpen(true);
    setSearchCondition({
      internet: false,
      gas: false,
      washing_machine: false,
      air_conditioner: false,
      refrigerator: false,
      elevator: false,
      microwave: false,
      toilet: false,
      breakfast: false,
      heating: false,
      parking: false,
      station: false,
      move_in_date: false,
      sink: false,
      APT: false,
      OPST: false,
      VL: false,
      JT: false,
      DDDGG: false,
      OR: false,
      rent_max: 100,
      rent_min: 0,
      lat: 37.609641,
      lng: 126.997697,
    });
  };

  return (
    <header>
      <div className="criteria-container">
        <div className="element-container" onClick={() => headerFilterClick('school')}>
          <AccountBalanceIcon style={getIconStyle(school)} />
          <span className="criteria-description" style={getDescriptionStyle(school)}>
            학교 근처
          </span>
        </div>
        <div className="element-container" onClick={() => headerFilterClick('subway')}>
          <DirectionsSubwayIcon style={getIconStyle(subway)} />
          <span className="criteria-description" style={getDescriptionStyle(subway)}>
            역세권
          </span>
        </div>
        <div className="element-container" onClick={() => headerFilterClick('apartment')}>
          <ApartmentIcon style={getIconStyle(apartment)} />
          <span className="criteria-description" style={getDescriptionStyle(apartment)}>
            아파트
          </span>
        </div>
        <div className="element-container" onClick={() => headerFilterClick('pets')}>
          <PetsIcon style={getIconStyle(pets)} />
          <span className="criteria-description" style={getDescriptionStyle(pets)}>
            반려동물
          </span>
        </div>
        <div className="circle-border">
          <TuneIcon onClick={searchFilterClick} fontSize="medium" style={{ color: '#A0A0A0', cursor: 'pointer' }} />
        </div>
        {modalOpen && <FilterModal modalOpen={modalOpen} setModalOpen={setModalOpen} />}
      </div>
    </header>
  );
};

export default Header;
