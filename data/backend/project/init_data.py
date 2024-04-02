# swaggerURL : 127.0.0.1:8000/docs

from fastapi import FastAPI
from pymongo import MongoClient
from pydantic import BaseModel
from typing import Union # 예제 구현용
from starlette.responses import JSONResponse
from enum import Enum
from bson.json_util import dumps

import uvicorn
import json
import traceback



app = FastAPI()
host = 'mongodb://tfeo:tfeo123@j10a707.p.ssafy.io:27017/?authSource=admin&authMechanism=DEFAULT'
port = 27017
# db = None

client = MongoClient(host, port)

db = client.test # 집 정보가 담겨있는 DB

class BuildingType(Enum):
    APT = 1        # 아파트
    OPST = 2       # 오피스텔
    VL = 3         # 빌라
    JT = 4         # 주택
    DDDGG = 5      # 단독, 다가구
    OR = 6         # 원룸
"""
ex)
class BuildingType(str, Enum):
    apartment = "아파트"
    house = "단독주택"
    office = "사무실"
"""


# class Item(BaseModel):
#     name: str
#     price: float
#     is_offer: Union[bool, None] = None

class Home(BaseModel):
    # 집
    home_no: int # 식별키
    host_name: str # 이름
    host_age : int # 호스트 나이
    # host_age: int #
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


# 추천이 적용되지 않은 전체 집 정보를 반환
@app.get("/select/all")
def get_all_list():
    data = db.items.find({},{'_id': False})
    # print(list(data))
    return list(data)

# 등록된 집 추가
# @app.post("/insert/")
# def insert_house(item: Item):
#     db.items.insert_one(item.dict())
#     return "complete"

# terminal
# python -m uvicorn main:app --reload

if __name__ == '__main__':
    print('FastAPI server')
    # init() # mongoDB 연결
