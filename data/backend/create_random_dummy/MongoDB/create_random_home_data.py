import random
import csv
import enum


from faker import Faker


class BuildingType(enum.Enum):
    APT = 0
    OPST = 1
    VL = 2
    JT = 3
    DDDGG = 4
    OR = 5
"""
class Home(BaseModel):
    # 집
    home_no: int # 식별키
    host_name: str # 이름
    price: float # 나이
    host_phone: str # 전화번호
    host_gender: str # 성별 (M/F)
    guardian_name: str # 보호자 이름
    guardian_phone: str # 보호자 전화번호
    relation: str # 보호자와 호스트와의 관계
    host_register_no: str # 주민등록번호
    host_account_no: str # 계좌번호
    host_bank: str # 계좌은행
    address: str # 주소
    rent: int # 임대료
    lat: float # 위도
    lng: float # 경도
    noneRegisterMember: bool # 비회원등록여부
    introduce: str # 소개
    host_personality_no: int # 식별키
    home_option_no: int # 식별자
    maintenance_fee: int # 관리비
    image_url: str # 이미지 URL (저장된 서버 URL)
    # 호스트
    smoke: bool  # 흡연 여부
    pet: bool  # 반려동물 여부
    clean: bool  # 청결한걸 좋아함
    daytime: bool  # 아침형
    nighttime: bool  # 저녁형
    extrovert: bool  # 외향적
    introvert: bool  # 내향적
    cold: bool  # 추위잘타는
    hot: bool  # 더위잘타는
    no_touch: bool  # 간섭안하는
    # 집별 옵션
    internet: bool  # 인터넷 여부
    gas: bool  # 가스레인지 여부
    washing_machine: bool  # 세탁기 여부
    air_conditioner: bool  # 에어컨 여부
    refrigerator: bool  # 냉장고 여부
    elevator: bool  # 엘리베이터 여부
    microwave: bool  # 전자레인지 여부
    toilet: bool  # 개인화장실 여부
    breakfast: bool  # 조식 여부
    heating: bool  # 난방 여부
    parking: bool  # 주차 여부
    station: bool  # 역세권 여부
    move_in_date: bool  # 즉시입주가능 여부
    sink: bool  # 싱크대 여부
    type: BuildingType  # 건축물 종류(ENUM)
"""




# intro_extro = ['Extroversion', 'Introversion']
# intro_extro_weight = [52.1, 47.8]



boolean = [True, False]
gender = ['M', 'F']
bank = ['국민', '우리', '신한',
        '하나', '농협', '기업',
        '씨티', 'SC제일', '우체국',
        '산업', '토스', '부산',
        '경남', '대구', '전북',
        '광주', '수협', '제주',
        '케이', '카카오']
# 출처 : 2022 국가지표체계
smoking_weight = [17.7, 82.3] # 흡연 | 비흡연
# 출처 : 2022 농림축산식품부
pet_weight = [25.4, 74.6]
clean_weight = [0.5, 0.5]
daytime_weight = [0.5, 0.5]
nighttime_weight = [0.5, 0.5]
# 출처 : 2022 어세스타 자료 (E/I)
intro_weight = [47.8, 52.1]
extro_weight = [52.1, 47.8]
cold_weight = [0.5, 0.5]
hot_weight = [0.5, 0.5]
no_touch_weight = [0.5, 0.5]

# host 나이 기준은 얼마?? (보통은)60세 이상으로

if __name__ == '__main__':
    print('MongoDB 초기 집 데이터 산출[csv]')
    data_number = 1500 # -> 나중에 매물 전체 개수로 바꾸기!
    offset = 1264 # 네이버부동산 매물 개수
    print('data생성 시작')
    # 주의
    # 이미 csv 데이터가 존재하는 상태에서 프로그램을 작동시키면
    # 아래에 추가로 더미데이터가 기입됨
    f = open('data_csv/home_info.csv', 'a', encoding='UTF-8', newline='')
    wr = csv.writer(f)
    fake = Faker('ko_KR')
    Faker.seed()
    for i in range(data_number):
        host_no = i+offset
        host_name = fake.name() # 이름
        host_age = random.randint(65, 100) # 65세부터 100세까지
        host_phone = fake.phone_number()
        host_gender = random.choice(gender)[0]
        guardian_name = fake.name() # 보호자 이름
        guardian_phone = fake.phone_number() # 보호자 전화번호
        relation = '자녀'
        host_register_no = fake.ssn() # 주민등록번호
        # 생년월일 고려해야되나...
        # 그럴거면 맨 뒷자리 성별까지 일일이 문자열 뜯어서 고쳐야 됨.
        host_account_no = 'xx-xxxxx-xxx' # 추후 format에 맞게 교체
        host_bank = random.choice(bank)
        address = '서울시 강남구 ??동' # 주소 (이후 매물 데이터에서 획득)
        rent = 70 # 임대료 (이후 매물 데이터에서 획득)
        lat = 37 # 위도 (이후 매물 데이터에서 획득)
        lng = 127 # 경도 (이후 매물 데이터에서 획득)
        noneRegisterMember = random.choice(boolean) # 비회원등록여부
        introduce = '좋은 집' # 소개 (넣을 데이터가 없으면 빈 문자열로 남겨야)
        host_personality_no = i+offset # 식별키
        host_option_no = i+offset # 식별자
        ##############
        # 집별 옵션
        ##############
        internet = False # 인터넷 여부
        gas = False # 가스레인지 여부
        washing_machine = False # 세탁기 여부
        air_conditioner = False # 에어컨 여부
        refrigerator = True # 냉장고 여부
        elevator = False # 엘리베이터 여부
        microwave = False # 전자레인지 여부
        toilet = True # 개인화장실 여부
        breakfast = True # 조식 여부
        heating = True # 난방 여부
        parking = False # 주차 여부
        station = True # 역세권 여부
        move_in_date = True # 즉시입주가능 여부
        sink = True # 싱크대 여부
        type = random.choice(list(BuildingType)) # 건축물 종류 (상단 enum 형태 정의하기)

        smoke = random.choices(boolean, weights=smoking_weight)
        pet= random.choices(boolean, weights=pet_weight)
        clean = random.choices(boolean, weights=clean_weight)
        daytime = random.choices(boolean, weights=daytime_weight)
        nighttime = random.choices(boolean, weights=nighttime_weight)
        extrovert = random.choices(boolean, weights=extro_weight)
        introvert = random.choices(boolean, weights=intro_weight)
        cold = random.choices(boolean, weights=cold_weight)
        hot = random.choices(boolean, weights=hot_weight)
        no_touch = random.choices(boolean, weights=no_touch_weight)

        home_no = host_no
        home_image_no = home_no
        home_image_url = '이후에 format 수정'


        wr.writerow([host_no, host_name, host_age, host_phone,
                     host_gender, guardian_name, guardian_phone,
                     relation, host_register_no, host_account_no, host_bank,
                     address, rent, lat, lng, noneRegisterMember, introduce,
                     host_personality_no, host_option_no, internet, gas, washing_machine,
                     air_conditioner, refrigerator, elevator, microwave,
                     toilet, breakfast, heating, parking, station,
                     move_in_date, sink, type, smoke[0], pet[0], clean[0], daytime[0],
                     nighttime[0], extrovert[0], introvert[0], cold[0], hot[0],
                     no_touch[0], home_no, home_image_no, home_image_url])
    f.close()

# host_personality_no : int
# smoke : bool
# pet : bool
# clean : bool
# daytime : bool
# nighttime : bool
# extrovert : bool
# introvert : bool
# cold : bool
# hot : bool
# no_touch : bool