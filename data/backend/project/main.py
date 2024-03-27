# swaggerURL : 127.0.0.1:8000/docs

from fastapi import FastAPI
from pymongo import MongoClient
from pydantic import BaseModel
from typing import Union # 예제 구현용
from starlette.responses import JSONResponse
from enum import Enum
from bson.json_util import dumps
from faker import Faker
from recommend_house import Recommendation

from bson import json_util

import uvicorn
import json
import traceback



app = FastAPI()
host = 'localhost'
port = 27017
# db = None

###########
client = MongoClient(host, port)
# db = client.example # 과일이름 crud 예시
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
# 아래부터 검색에 필요한 2개의 DTO #
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
    quite: bool # 조용한
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

##########################################

# @app.get("/")
# def root():
#     return {"message": "HelloWorld"}
#
# @app.get("/home")
# def home():
#     return {"message": "home"}

@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}

@app.put("/items/{item_id}")
def update_item(item_id: int, item: Item):
    # db.items.update({"$set":{"name": item.name, "price": item.price}})
    return "updated"

"""
# 집 정보 update(가장 후 순위, 거의 사용하지 않음)
@app.put("/update")
def update_house():
    return "없뎃"
"""

## 비회원 추천 getMapping API 추가로 개발해야 됨 ##





# 사용자 맞춤형 추천이 반영된 결과를 반환
@app.get("/recommend")
def get_recommended_list(home_option: Home_Option, member_personality: Member_Personality):




    weight = member_personality.host_house_prefer # 0-10사이의 값을 적당하게 mapping
    print(weight)
    # 1. 입력으로 주어진 좌표 범위 내 주택만 filtering

    # Ex)
    # filtered = db.home.find({
    #     "lat": {$gte:30, $lt:70},
    #     "lng": {$gte:30, $lt:70},
    # })

    # 2. 필터 column 기준으로 필터링
    # (이 과정에서 vector cosine 유사도 연산)

    # 3. 추천 알고리즘 기반으로 sorting
    # 4. 우선순위가 높은 순서대로 json list 반환


    resp = {
        "name": "김태현",
        "grade": 4,
    }
    return resp


@app.post("/testing/test")
def filter_by_search_condition(search_condition: Search_Condition):
    ## 특정 가전제품, 편의 시설에 대해서만 check하는 방법 ##
    # s_c 가 false 이면 그냥 전부 채택
    # s_c 가 true 이면 s_c가 있는 것만 선택됨
    # -> (~s_c)AND(매물 대상)

    # { $ and: [
    #     { $ or: [{조건1}, {조건2}]},
    # { $ or: [{조건3}, {조건4}]}
    # ]}

    # APT: bool
    # OPST: bool
    # VL: bool
    # JT: bool
    # DDDGG: bool
    # OR: bool

    building_option_list = []
    if search_condition.APT:
        building_option_list.append('APT')
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

    print(building_option_list)

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
                         })
    print(data)
    data_list = []
    for doc in data:
        data_list.append(doc)
    # data_list = [doc for doc in data]

    print(len(data_list))
    print(data_list)

    ## data_list에서 추천 알고리즘 적용용
    index_list = []



   # data_list = data_list[:3]  # 3개만 추출
    data_json = json.dumps(data_list, default=str, ensure_ascii=False)
    data_json = data_json.replace("\"", "")
    # return 'OK'
    return data_json


##############################
# 사용자 맞춤형 추천이 반영된 결과를 반환
# @app.get("/recommend")
# def get_recommended_list(search_condition: Search_Condition, member_personality: Member_Personality):
#
#     weight = member_personality.host_house_prefer # 0-10사이의 값을 적당하게 mapping
#     print(weight)
#     return None
##############################


# 추천이 적용되지 않은 전체 집 정보를 반환
@app.get("/select/all")
def get_all_list():
    # data = db.items.find({},{'_id': False})
    data = db.home.find({},{'_id': False})

    data_list = [doc for doc in data]
    data_list = data_list[:1] # 1개만 추출
    data_json = json.dumps(data_list, default=str, ensure_ascii=False)
    data_json = data_json.replace("\"","")
    return data_json

# 등록된 아이템 추가
@app.post("/insert-item/")
def insert_item(item: Item):
    db.home.insert_one(item.dict())
    return "complete"

# 등록된 집 추가
@app.post("/insert/")
def insert_item(item: Home):
    # db.items.insert_one(item.dict())
    vector = get_host_vector(item)
    db.home.insert_one(item.dict())
    # 벡터화 해서 insert

    return "complete"

# 계약이 성사된 집 삭제
@app.delete("/delete/{host_no}")
def delete_house(host_no):
    db.home.delete_one({"home_no": host_no})
    dicted_item = None
    # 벡터값 collection에서도 삭제한다.
    db.host_vector.delete_one({'host_vector_no': host_no})
    return "complete"
    # return JSONResponse(status_code="HTTP_204_NO_CONTENT")

# # 계약이 성사된 집 삭제
# @app.delete("/delete/{item_name}")
# def delete_house(item_name):
#     db.items.delete_one({"name": item_name})
#     dicted_item = None
#     # 벡터값 collection에서도 삭제한다.
#     db.host_vector.delete_one({})
#     return "complete"
#     # return JSONResponse(status_code="HTTP_204_NO_CONTENT")



# for test
@app.get("/select/one/{home_no}")
def get_one_home(home_no: int, q: Union[Home, None] = None):
    data = db.home.find({'home_no': home_no})
    # data = db.home.find({'home_no': 12},{'_id': False})
    # print(data)
    # print(list(data)[0])


    # find().limit(7) # 7개로 출력할 횟수 제한


    return data.dict()


"""이미지 URL 테스트 용"""
@app.get("/select/get-url-list/{home_no}")
def get_one_home(home_no: int):
    data = db.home.find({'home_no': home_no},{
        # "id": 0,
        # "internet": 0,
        # "gas": 0,
        # "washing_machine": 0,
        # "air_conditioner": 0,
        # "refrigerator": 0,
        # "elevator": 0,
        # "microwave": 0,
        # "breakfast": 0,
        # "toilet": 0,
        # "heating": 0,
        # "parking": 0,
        # "station": 0,
        # "move_in_date": 0,
        # "sink": 0,
        # "type": 0,
        # "smoke": 0,
        # "pet": 0,
        # "clean": 0,
        # "daytime": 0,
        # "nighttime": 0,
        # "extrovert": 0,
        # "introvert": 0,
        # "cold": 0,
        # "hot": 0,
        # "no_touch": 0,
        # "home_no": 0,
        # "host_name": 0,
        # "host_age": 0,
        # "host_phone": 0,
        # "host_gender": 0,
        # "guardian_name": 0,
        # "guardian_phone": 0,
        # "relation": 0,
        # "host_register_no": 0,
        # "host_account_no": 0,
        # "host_bank": 0,
        # "address": 0,
        # "rent": 0,
        # "lat": 0,
        # "lng": 0,
        # "role": 0,
        # "introduce": 0,
        # "host_personality_no": 0,
        # "home_option_no": 0,
        # "si": 0,
        # "sgg": 0,
        # "emd": 0,
        # "ro": 0,
        # "home_image_no": 0,
        "home_image": 1,
        # "host_image_no": 0,
        # "host_image_url": 0
    })
    data_list = []
    for doc in data:
        data_list.append(doc)
    # data_list = [doc for doc in data]

    print(len(data_list))
    print(data_list)

    ## data_list에서 추천 알고리즘 적용용
    index_list = []

    # data_list = data_list[:3]  # 3개만 추출

    data_list = {"data": data_list}
    data_json = json.dumps(data_list, default=str, ensure_ascii=False)
    data_json = data_json.replace("\"", "")
    # return 'OK'
    return data_json

# @app.get("/items/{item_id}")
# def read_item(item_id: int, q: Union[str, None] = None):
#     return {"item_id": item_id, "q": q}


# 호스트+집 정보를 벡터화 시키는 과정이 필요하고
# insert가 들어올 때마다 이를 갱신하는 과정이 필요함


def get_member_vector(member_personality: Member_Personality):
    print('빅데이터의 벡터화')
    """
    <대학생>
    주간지수, 야간지수, 흡연지수, 외향, 내향, 호스트 습관의 중요함, 동물애호가, 추위잘탐, 더위잘탐
    """
    index = 12
    day = convert_bool_to_int(member_personality.daytime)+convert_bool_to_int(member_personality.fast)
    night = convert_bool_to_int(member_personality.nighttime)+convert_bool_to_int(member_personality.late)
    smoke = convert_bool_to_int(member_personality.smoke)
    extro = convert_bool_to_int(member_personality.outside)
    intro = convert_bool_to_int(member_personality.inside)+convert_bool_to_int(member_personality.quite)
    host_related = convert_bool_to_int(member_personality.live_long)
    pet_lover = convert_bool_to_int(member_personality.pet)
    cold = convert_bool_to_int(member_personality.cold)
    hot = convert_bool_to_int(member_personality.hot)
    member_vector = [index, day, night, smoke, extro, intro,
                     host_related, pet_lover, cold, hot]

    return member_vector


def get_permit_list(b):
    if(b==False):
        return [0, 1]
    return [1]

def get_host_vector(host_personality: Host_Personality):
    print('빅데이터의 벡터화')
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

def convert_bool_to_int(bool):
    if(bool==True):
        return 1
    return 0

def get_recommended_list():
    print('리스트')


def init():
    print("DB초기설정")

# 터미널창에
# python -m uvicorn main:app --reload
if __name__ == '__main__':
    # init() # mongoDB 연결
    uvicorn.run(app, host="127.0.0.1", port=8000, log_level="info") # FastAPI 서버 작동
