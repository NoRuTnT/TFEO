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
host = 'localhost'
port = 27017
# db = None

###########
client = MongoClient(host, port)
db = client.example
"""
public enum BuildingType {
	APT,				// 아파트
	OPST,				// 오피스텔
	VL,					// 빌라
	JT,					// 주택
	DDDGG,				// 단독, 다가구
}
"""
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
def get_recommended_list():
    weight = 100 # 0-10사이의 값을 적당하게 mapping
    # 1. 입력으로 주어진 좌표 범위 내 주택만 filtering

    # Ex)
    # filtered = db.home.find({
    #     "lat": {$gte:30, $lt:70},
    #     "lng": {$gte:30, $lt:70},
    # })

    # 2. 필터 column 기준으로 필터링
    # 3. 추천 알고리즘 기반으로 sorting
    # 4. 우선순위가 높은 순서대로 json list 반환


    resp = {
        "name": "김태현",
        "grade": 4,
    }
    return resp



# 추천이 적용되지 않은 전체 집 정보를 반환
@app.get("/select/all")
def get_all_list():
    data = db.items.find({},{'_id': False})
    # print(list(data))
    return list(data)

# 등록된 집 추가
@app.post("/insert/")
def insert_house(item: Item):
    db.items.insert_one(item.dict())
    return "complete"

# 계약이 성사된 집 삭제
@app.delete("/delete/{item_name}")
def delete_house(item_name):
    db.items.delete_one({"name": item_name})
    dicted_item = None
    return "complete"
    # return JSONResponse(status_code="HTTP_204_NO_CONTENT")


def init():
    print("DB초기설정")

# 터미널창에
# python -m uvicorn main:app --reload
if __name__ == '__main__':
    # init() # mongoDB 연결
    uvicorn.run(app, host="127.0.0.1", port=8000, log_level="info") # FastAPI 서버 작동
