import { IHomeOption } from '../interfaces/HomeInterface';

export function getHomeOptionTags(homeOption: IHomeOption) {
  const homeOptionList: string[] = [];
  if (!homeOption) return homeOptionList;
  const homeOptionName: { [key: string]: string } = {
    internet: '인터넷',
    gas: '가스',
    washingMachine: '세탁기',
    airConditioner: '에어컨',
    refrigerator: '냉장고',
    elevator: '엘리베이터',
    microwave: '전자레인지',
    breakfast: '아침 식사',
    toilet: '개인화장실',
    parking: '주차가능',
    station: '역세권',
    moveInDate: '즉시입주',
    sink: '싱크대',
  };
  const homeTypeName: { [key: string]: string } = {
    APT: '아파트',
    OPST: '오피스텔',
    VL: '빌라',
    JT: '주택',
    DDDGG: '단독다가구',
    OR: '원룸',
  };
  // true인 속성들의 키(key)를 저장할 배열
  const trueKeys: string[] = [];

  // 객체의 속성들을 순회하면서 true인 속성들의 키(key)를 배열에 추가
  for (const key in homeOption) {
    if ((homeOption.hasOwnProperty(key) && typeof homeOption[key] === 'number', homeOption[key] === 1)) {
      trueKeys.push(key);
    }
    if (homeOption.hasOwnProperty(key) && key === 'type') {
      const typeName = homeTypeName[homeOption[key]];
      if (typeName) {
        homeOptionList.push(typeName);
      }
    }
  }

  trueKeys.forEach((key) => {
    const homeOptionNameValue = homeOptionName[key];
    if (homeOptionNameValue) {
      homeOptionList.push(homeOptionNameValue);
    }
  });
  return homeOptionList;
}
