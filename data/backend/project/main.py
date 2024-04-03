# swaggerURL : 127.0.0.1:8000/docs

from fastapi import FastAPI, HTTPException
from pymongo import MongoClient
from pydantic import BaseModel
from typing import Union # 예제 구현용
from typing import Optional

from starlette.middleware.cors import CORSMiddleware
from starlette.responses import JSONResponse
from enum import Enum
from bson.json_util import dumps
from faker import Faker

from recommend_house import Recommendation
from sklearn.metrics.pairwise import cosine_similarity

from bson import json_util

import numpy as np
import uvicorn
import json
import traceback
import math
import time

app = FastAPI()
host = 'mongodb://tfeo:tfeo123@j10a707.p.ssafy.io:27017/?authSource=admin&authMechanism=DEFAULT'
port = 27017
TEST_NUMBER = 10 # 수행시간의 평균을 계산하기 위한 수행횟수
# db = None

# origins에는 protocal, domain, port만 등록한다.
origins = [
    # "http://192.168.0.13:3000", # url을 등록해도 되고
    # "http://70.12.246.99:3000",
    "*" # private 영역에서 사용한다면 *로 모든 접근을 허용할 수 있다.
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True, # cookie 포함 여부를 설정한다. 기본은 False
    allow_methods=["*"],    # 허용할 method를 설정할 수 있으며, 기본값은 'GET'이다.
    allow_headers=["*"],	# 허용할 http header 목록을 설정할 수 있으며 Content-Type, Accept, Accept-Language, Content-Language은 항상 허용된다.
)


###########
client = MongoClient(host, port)
# db = client.example
db = client.test # 집 정보가 담겨있는 DB


"""
public enum BuildingType {
	APT,				// 아파트
	OPST,				// 오피스텔
	VL,					// 빌라
	JT,					// 주택
	DDDGG,				// 단독, 다가구
}
"""

gender = ['M', 'F']
bank = ['국민', '우리', '신한',
        '하나', '농협', '기업',
        '씨티', 'SC제일', '우체국',
        '산업', '토스', '부산',
        '경남', '대구', '전북',
        '광주', '수협', '제주',
        '케이', '카카오']

class BuildingType(Enum):
    APT = 1
    OPST = 2
    VL = 3
    JT = 4
    DDDGG = 5
"""
ex)
class BuildingType(str, Enum):
    apartment = "아파트"
    house = "단독주택"
    office = "사무실"
"""

class Item(BaseModel):
    name: str
    price: float
    is_offer: Union[bool, None] = None
##########################################

# MySQL DB에서 식별키로 연결된 집, 호스트 table을
# MongoDB에서는 하나의 collection으로 묶어서 관리
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
    internet: bool # 인터넷 여부
    gas: bool # 가스레인지 여부
    washing_machine: bool # 세탁기 여부
    air_conditioner: bool # 에어컨 여부
    refrigerator: bool # 냉장고 여부
    elevator: bool # 엘리베이터 여부
    microwave: bool # 전자레인지 여부
    breakfast: bool # 조식 여부
    toilet: bool # 개인화장실 여부
    heating: bool # 난방 여부
    parking: bool # 주차 여부
    station: bool # 역세권 여부
    move_in_date: bool
    sink: bool # 싱크대
    type: BuildingType  # 건축물 종류(ENUM)
    # 집 사진
    home_image_no: int
    home_image_url: str
    # 호스트 사진
    host_image_no: int
    host_image_url: str


###############################
# 아래부터 검색에 필요한 3개의 DTO #
###############################

# 둘 중에 하나 선택

class Search_Condition(BaseModel): # 검색 조건, 피그마 기반으로 작성
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

    # 건축물 종류
    APT: bool
    OPST: bool
    VL: bool
    JT: bool
    DDDGG: bool
    OR: bool

    rent_max: int # 최고 가격
    rent_min: int # 최저 가격

    lat: float # member가 다니는 학교의 위도정보
    lng: float # member가 다니는 학교의 경도정보

class Home_Option(BaseModel): # 집별 옵션
    home_option_no: int # 식별자
    internet: bool # 인터넷 여부
    gas: bool # 가스레인지 여부
    washing_machine: bool # 세탁기 여부
    air_conditioner: bool # 에어컨 여부
    refrigerator: bool # 냉장고 여부
    elevator: bool # 엘리베이터 여부
    microwave: bool # 전자레인지 여부
    toilet: bool # 개인화장실 여부
    breakfast: bool # 조식 여부
    heating: bool # 난방 여부
    parking: bool # 주차 여부
    station: bool # 역세권 여부
    move_in_date: bool # 즉시입주가능 여부
    sink: bool # 싱크대 여부
    type: BuildingType # 건축물 종류(ENUM)

class Member_Personality(BaseModel): # 집추천 설문내용 DTO
    member_personality_no: int # 식별키
    daytime: bool # 주간형
    nighttime: bool # 야간형
    fast: bool # 빠른 귀가
    late: bool # 늦은 귀가
    dinner: bool # 함께 저녁
    smoke: bool # 흡연
    drink: bool # 술 자주 마시는
    outside: bool # 집을 잘 비우는
    inside: bool # 집돌이/집순이
    quiet: bool # 조용한
    live_long: bool # 장기거주
    live_short: bool # 단기거주
    pet: bool # 반려동물
    cold: bool # 추위잘타는
    hot: bool # 더위잘타는
    host_house_prefer: int # 호스트 집 선호도

class Host_Personality(BaseModel):
    host_personality_no: int  # 식별키
    smoke: bool # 흡연 여부
    pet: bool # 반려동물 여부
    clean: bool # 청결한걸 좋아함
    daytime: bool # 아침형
    nighttime: bool # 저녁형
    extrovert: bool # 외향적
    introvert: bool # 내향적
    cold: bool # 추위잘타는
    hot: bool # 더위잘타는
    no_touch: bool # 간섭안하는

# 클라이언트 필터링 조건
class Filter_Condition(BaseModel):
    school: bool # 학교 근처
    subway: bool # 역세권
    apartment: bool # 아파트
    pets: bool # 반려동물

# 성능 최적화를 위해 200개 까지만 추천
SEARCH_LIMIT = 200
# 학교에 가까운지에 대한 거리 기준(km단위)
SCHOOL_LIMIT = 3

# 추천 알고리즘에 따라 추천 결과를 반환
@app.post("/recommend")
def filter_by_search_condition(search_condition: Search_Condition, filter_condition: Filter_Condition, member_personality: Optional[Member_Personality]=None):
    ## 특정 가전제품, 편의 시설에 대해서만 check하는 방법 ##
    # s_c 가 false 이면 그냥 전부 채택
    # s_c 가 true 이면 s_c가 있는 것만 선택됨
    # -> (~s_c)AND(매물 대상)

    # 1. 입력으로 주어진 좌표 범위 내 주택만 filtering # 불필요해짐
    # Ex)
    # filtered = db.home.find({
    #     "lat": {$gte:30, $lt:70},
    #     "lng": {$gte:30, $lt:70},
    # })
    # 2. 필터 column 기준으로 필터링
    # (이 과정에서 vector cosine 유사도 연산)
    # 3. 추천 알고리즘 기반으로 sorting
    # 4. 우선순위가 높은 순서대로 json list 반환

    building_option_list = []
    apart_flag = False # 아파트 포함 여부 확인
    if search_condition.APT or filter_condition.apartment:
        building_option_list.append('APT')
    # filter_condition 과 search_condtion에서 아파트가 둘 중 하나라도 true이면
    # 선택되도록 로직 변경
    if search_condition.OPST:
        building_option_list.append('OPST')
    if search_condition.VL:
        building_option_list.append('VL')
    if search_condition.JT:
        building_option_list.append('JT')
    if search_condition.DDDGG:
        building_option_list.append('DDDGG')
    if search_condition.OR:
        building_option_list.append('OR')


    if(len(building_option_list)==0):
        building_option_list = ['APT', 'OPST', 'VL', 'JT', 'DDDGG', 'OR']
    # filter_condition 과 search_condtion에서 아파트가 둘 중 하나라도 true이면
    # 선택되도록 로직 변경
    # if(filter_condition.apartment and (not ('APT' in building_option_list))):
    #     building_option_list.append('APT')
    # print(building_option_list)
    internet_list = get_permit_list(search_condition.internet)
    gas_list = get_permit_list(search_condition.gas)
    washing_machine_list = get_permit_list(search_condition.washing_machine)
    air_conditioner_list = get_permit_list(search_condition.air_conditioner)
    refrigerator_list = get_permit_list(search_condition.refrigerator)
    elevator_list = get_permit_list(search_condition.elevator)
    microwave_list = get_permit_list(search_condition.microwave)
    toilet_list = get_permit_list(search_condition.toilet)
    breakfast_list = get_permit_list(search_condition.breakfast)
    heating_list = get_permit_list(search_condition.heating)
    parking_list = get_permit_list(search_condition.parking)
    station_list = get_permit_list(search_condition.station)
    move_in_date_list = get_permit_list(search_condition.move_in_date)

    pet_list = [0]
    # true -> 반려동물이 없는 집만 선택
    # false -> 반려동물
    if not filter_condition.pets:
        pet_list.append(1)
    # type: BuildingType  # 건축물 종류(ENUM)
    data = db.home.find({'rent': {'$gte': search_condition.rent_min, '$lte': search_condition.rent_max}, # 월세 범위 내 검색
                        'internet': {'$in':internet_list},
                        'gas': {'$in':gas_list},
                        'washing_machine': {'$in':washing_machine_list},
                        'air_conditioner': {'$in':air_conditioner_list},
                        'refrigerator': {'$in':refrigerator_list},
                        'elevator': {'$in':elevator_list},
                        'microwave': {'$in':microwave_list},
                        'toilet': {'$in':toilet_list},
                        'breakfast': {'$in':breakfast_list},
                        'heating': {'$in':heating_list},
                        'parking': {'$in':parking_list},
                        'station': {'$in':station_list},
                        'move_in_date': {'$in':move_in_date_list},
                        'type': {'$in':building_option_list},
                        'pet': {'$in':pet_list}, # pet 필터링 내용 추가
                         }, {'type': 1,
                             'smoke': 1,
                             'pet': 1,
                             'clean': 1,
                             'daytime': 1,
                             'nighttime': 1,
                             'extrovert': 1,
                             'introvert': 1,
                             'cold': 1,
                             'hot': 1,
                             'no_touch': 1,
                             'host_name': 1,
                             'host_age': 1,
                             'host_gender': 1,
                             'address': 1,
                             'rent': 1,
                             'lat': 1,
                             'lng': 1,
                             'home_image': 1,
                             'host_image_url': 1,
                             # 아래 항목은 output에 존재하지 않아도 filter조건때문에 필요
                             'station': 1,
                             'host_vector': 1,
                             'home_no': 1,
                             })
    # 입력받은 대학의 위도,경도 좌표값을 가져옴
    univ_lat = search_condition.lat
    univ_lng = search_condition.lng

    # print(data)
    data_list = []
    for doc in data:
        doc = dumps(doc)
        doc_json = json.loads(doc)
        # print(doc_json) # 추출된 전체 결과를 확인할 때 사용
        # 사용자의 대학 위치 정보와 건물 위치 정보를 기준으로 거리 계산
        distance = get_min_length(univ_lat, univ_lng, doc_json['lat'], doc_json['lng'])
        doc_json['distance'] = distance
        data_list.append(doc_json)
    # 프론트엔드 4가지 조건에 맞게 필터링하는 과정
    # print("확인된 내용물의 개수는??", len(data_list))
    data_list_filtered = []

    # 아파트 조건은 db에서 query할 때 미리 거른다.
    for data in data_list:
        # if ((data['distance']<=SCHOOL_LIMIT and filter_condition.school) or not filter_condition.school) and ((data['station']==1 and filter_condition.subway) or not filter_condition.subway) and ((data['pet']==1 and filter_condition.pets) or not filter_condition.pets):
        # 반려동물 필터링 로직 수정
        if ((data['distance']<=SCHOOL_LIMIT and filter_condition.school) or not filter_condition.school) and ((data['station']==1 and filter_condition.subway) or not filter_condition.subway):
            data_list_filtered.append(data)

    data_list = data_list_filtered
    """
    학생성향이 들어오지 않은 경우
    추천 알고리즘 적용 안하고 필터링 결과만 반환
    """
    if(member_personality is None):
        data_list = data_list[:SEARCH_LIMIT] # 최대 200개까지 출력
        for item in data_list:
            # 추천알고리즘이 적용된 결과와 json 반환 format을 맞춰준다
            # 불필요한 값 제거
            del item['host_vector']
            del item['station']
        # print('client에 반환되는 요소의 개수 ', len(data_list))
        return data_list


    # print(len(data_list))
    # print(data_list)

    data_json = json.dumps(data_list, default=str, ensure_ascii=False)
    data_json = data_json.replace("\"", "")

    # weight = member_personality.host_house_prefer  # 0-10사이의 값을 적당하게 mapping

    # prefer = 0
    # if(member_personality.host_house_prefer>=5):
    #     prefer=1
    # 임시 json 객체
    member_personality_json_info = {
        'member_personality_no': member_personality.member_personality_no,
        'daytime': member_personality.daytime,
        'nighttime': member_personality.nighttime,
        'fast': member_personality.fast,
        'late': member_personality.late,
        'dinner': member_personality.dinner,
        'smoke': member_personality.smoke,
        'drink': member_personality.drink,
        'outside': member_personality.outside,
        'inside': member_personality.inside,
        'quiet': member_personality.quiet,
        'live_long': member_personality.live_long,
        'live_short': member_personality.live_short,
        'pet': member_personality.pet,
        'cold': member_personality.cold,
        'hot': member_personality.hot,
        'host_house_prefer': member_personality.host_house_prefer, # int
    }
    member_vector = get_member_vector(member_personality_json_info)
    # print('vector-format')
    # print(member_vector)

    cosine_values = []

    # 코사인 유사도와 home 인덱스 정보를 담고 있는 배열
    priorities = []
    # 이제 data를 for문으로 돌면서 하나씩 vector로 변환하고 코사인 유사도를 계산함
    for item in data_list:
        vector_json = item['host_vector'] # 벡터 관련 성분 json만 가져옴
        host_vector = []
        for value in vector_json.values():
            host_vector.append(value)
        host_vector=np.array(host_vector)

        similarity = cosine_similarity(host_vector.reshape(1,-1), member_vector.reshape(1,-1))
        # 끝에다 붙여준다.
        priorities.append([similarity[0][0], item['home_no']])

    # print('구한 결과 벡터 list임')
    # print(priorities)

    #  유사도를 기준으로 내림차순 정렬
    priorities.sort(key=lambda x:x[0], reverse=True)

    # print('정렬 결과 벡터 list임')
    # print(priorities)
    # print(data_json) # json 정보 본문

    output_list = [] # 최종적으로 추천된 부동산 내용들의 list, 필요시 원하는 성분들만 추출해서 사용
    for lim, index in enumerate(priorities):
        if(lim >= SEARCH_LIMIT):
            break
        item = db.home.find({'home_no': index[1]}, {'type': 1,
                             'smoke': 1,
                             'pet': 1,
                             'clean': 1,
                             'daytime': 1,
                             'nighttime': 1,
                             'extrovert': 1,
                             'introvert': 1,
                             'cold': 1,
                             'hot': 1,
                             'no_touch': 1,
                             'home_no': 1,
                             'host_name': 1,
                             'host_age': 1,
                             'host_gender': 1,
                             'address': 1,
                             'rent': 1,
                             'lat': 1,
                             'lng': 1,
                             'home_image': 1,
                             'host_image_url': 1})
        for doc in item:
            doc = dumps(doc)
            item_json = json.loads(doc)
            distance = get_min_length(univ_lat, univ_lng, item_json['lat'], item_json['lng'])
            item_json['distance'] = distance
            output_list.append(item_json)
    # weight = member_personality.host_house_prefer  # 0-10사이의 값을 적당하게 mapping
    # print(output_list)
    # print('client에 반환되는 요소의 개수 ', len(output_list))
    return output_list

# 등록된 집 추가
@app.post("/insert/")
def insert_item(item: Home):
    # db.home.insert_one(item.dict())

    # vector json을 생성해서 덧붙인 뒤
    # MongoDB에 추가
    """
    MAX(home_id)+1
    """
    vector = get_host_vector(item)
    db.home.insert_one(item.dict())

    return "complete"

# 계약이 성사된 집 삭제
# @app.delete("/delete/{home_no}")
@app.delete("/delete")
def delete_house(home_no):
    print(home_no)
    home_no = int(home_no)
    db.home.delete_one({'home_no': home_no})
    return "complete"
    # return JSONResponse(status_code="HTTP_204_NO_CONTENT")

# find().limit(7) # 7개로 출력할 횟수 제한

"""이미지 URL debug 용"""
@app.get("/select/get-url-list/{home_no}")
def get_one_home(home_no: int):
    data = db.home.find({'home_no': home_no},{
        "home_image": 1,
    })
    data_list = []
    for doc in data:
        data_list.append(doc)
    # data_list = [doc for doc in data]

    print(len(data_list))
    print(data_list)

    ## data_list에서 추천 알고리즘 적용
    index_list = []

    # data_list = data_list[:3]  # 3개만 추출

    # data_list = {"data": data_list}
    data_json = json.dumps(data_list, default=str, ensure_ascii=False)
    data_json = data_json.replace("\"", "")
    # return 'OK'
    return data_json

"""np.array형태로 반환함"""
def get_member_vector(member_personality):
    # print('빅데이터의 벡터화')
    """
    <대학생>
    주간지수, 야간지수, 흡연지수, 외향, 내향, 호스트 습관의 중요함, 동물애호가, 추위잘탐, 더위잘탐
    """
    # host_house_prefer ->
    # 0 : 나는 무조건 사람만 본다
    # 10 : 나는 집 상태만 본다
    weight = 1 - member_personality['host_house_prefer']*0.1 # 0.0 ~ 1.0
    # 추천 알고리즘의 성능이 오히려 저하될 경우 *weight 삭제!
    day = convert_bool_to_int(member_personality['daytime'])+convert_bool_to_int(member_personality['fast'])*weight
    night = convert_bool_to_int(member_personality['nighttime'])+convert_bool_to_int(member_personality['late'])*weight
    smoke = convert_bool_to_int(member_personality['smoke'])*weight
    extro = convert_bool_to_int(member_personality['outside'])*weight
    intro = convert_bool_to_int(member_personality['inside'])+convert_bool_to_int(member_personality['quiet'])*weight
    host_related = convert_bool_to_int(member_personality['live_long'])*weight
    pet_lover = convert_bool_to_int(member_personality['pet'])*weight
    cold = convert_bool_to_int(member_personality['cold'])*weight
    hot = convert_bool_to_int(member_personality['hot'])*weight
    member_vector = [day, night, smoke, extro, intro,
                     host_related, pet_lover, cold, hot]

    return np.array(member_vector)


def get_permit_list(b):
    if(b==False):
        return [0, 1]
    return [1]

# Host_Personality 정보에서 벡터 추출
def get_host_vector(host_personality: Host_Personality):
    """
    <노인>
    주간지수, 야간지수, 흡연지수, 외향, 내향, 매너있는 호스트, 동물애호가, 추위잘탐, 더위잘탐
    """
    index = 12
    day = convert_bool_to_int(host_personality.daytime)
    night = convert_bool_to_int(host_personality.nighttime)
    smoke = convert_bool_to_int(host_personality.smoke)
    extro = convert_bool_to_int(host_personality.extrovert)
    intro = convert_bool_to_int(host_personality.introvert)
    mannered = convert_bool_to_int(host_personality.clean)+convert_bool_to_int(host_personality.no_touch)
    pet_lover = convert_bool_to_int(host_personality.pet)
    cold = convert_bool_to_int(host_personality.cold)
    hot = convert_bool_to_int(host_personality.hot)
    member_vector = [index, day, night, smoke, extro, intro,
                     mannered, pet_lover, cold, hot]
    return member_vector
    # return np.array(member_vector)

# 0,1 입력을 False,True 형태로 반환
def convert_bool_to_int(bool):
    if(bool==True):
        return 1
    return 0

# 하버사인 공식으로 계산한 위도경도 좌표 사이의 거리 결과 반환(km)
def get_min_length(lat1, lng1, lat2, lng2):
    return 6371 * math.acos(
        math.cos(math.radians(lat2)) * math.cos(math.radians(lat1)) * math.cos(math.radians(lng1) - math.radians(lng2))
        + math.sin(math.radians(lat2)) * math.sin(math.radians(lat1)))

def init():
    print("DB초기설정")

# 터미널창에
# python -m uvicorn main:app --reload
if __name__ == '__main__':
    # init() # mongoDB 연결
    uvicorn.run(app, host="127.0.0.1", port=8000, log_level="info") # FastAPI 서버 작동
