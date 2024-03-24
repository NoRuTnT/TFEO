
from fastapi import FastAPI
from pymongo import MongoClient
from pydantic import BaseModel
from typing import Union # 예제 구현용
from starlette.responses import JSONResponse
from enum import Enum
from bson.json_util import dumps
from faker import Faker

import uvicorn
import json
import traceback
import pandas as pd
import csv
import random


class BuildingType(Enum):
    APT = 1
    OPST = 2
    VL = 3
    JT = 4
    DDDGG = 5

gender = ['M', 'F']
bank = ['국민', '우리', '신한',
        '하나', '농협', '기업',
        '씨티', 'SC제일', '우체국',
        '산업', '토스', '부산',
        '경남', '대구', '전북',
        '광주', '수협', '제주',
        '케이', '카카오']




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

host = 'localhost'
port = 27017
client = MongoClient(host, port)
db = client.test # home이라는 collection이 들어있는 DB는 test!


def merge_naver_home_csv():
    df1 = pd.read_csv('CSV_Data/naver_home_option.csv' , encoding='CP949') # CSV 파일 읽기
    df2 = pd.read_csv('CSV_Data/naver_home_utf8.csv', encoding='CP949')
    merge_df = pd.concat([df1, df2], axis=1) # column을 기준으로 df를 하나로 합치기
    merge_df.to_csv('CSV_Data/naver_home_merged.csv', index=False) # 합친 df를 csv로 저장



def init_MongoDB_Naver():
    print('MongoDB에 내용 입력')
    df = pd.read_csv('CSV_Data/naver_home_merged.csv', encoding='UTF-8')
    # 인코딩 열때는 반드시 UTF-8로 열어야 에러 발생 없음
    json_list = []
    fake = Faker('ko_KR')
    Faker.seed()
    with open('CSV_Data/naver_home_merged.csv', 'r', encoding='utf-8-sig') as f:
        csvReader = csv.DictReader(f)

        for idx, rows in enumerate(csvReader):
            json_data = {}
            # 집별 옵션
            json_data['internet'] = True if rows['internet']==1 else False
            json_data['gas'] = True if rows['gas']==1 else False
            json_data['washing_machine'] = True if rows['washing_machine']==1 else False
            json_data['air_conditioner'] = True if rows['air_conditioner']==1 else False
            json_data['refrigerator'] = True if rows['refrigerator']==1 else False
            json_data['elevator'] = True if rows['elevator']==1 else False
            json_data['microwave'] = True if rows['microwave']==1 else False
            json_data['breakfast'] = True if rows['breakfast']==1 else False
            json_data['toilet'] = True if rows['toilet']==1 else False
            json_data['heating'] = True if rows['heating']==1 else False
            json_data['parking'] = True if rows['parking']==1 else False
            json_data['station'] = True if rows['station']==1 else False
            json_data['move_in_date'] = True if rows['move_in_date']==1 else False
            json_data['sink'] = True if rows['sink']==1 else False
            json_data['type'] = rows['type'].strip()
            # 호스트
            json_data['smoke'] = random.randint(0, 1) >= 0.5
            json_data['pet'] = random.randint(0, 1) >= 0.5
            json_data['clean'] = random.randint(0, 1) >= 0.5
            json_data['daytime'] = random.randint(0, 1) >= 0.5
            json_data['nighttime'] = random.randint(0, 1) >= 0.5
            json_data['extrovert'] = random.randint(0, 1) >= 0.5
            json_data['introvert'] = random.randint(0, 1) >= 0.5
            json_data['cold'] = random.randint(0, 1) >= 0.5
            json_data['hot'] = random.randint(0, 1) >= 0.5
            json_data['no_touch'] = random.randint(0, 1) >= 0.5

            # 집
            json_data['home_no'] = idx
            json_data['host_name'] = fake.name()  # 이름
            json_data['host_age'] = random.randint(65, 100)  # 나이
            json_data['host_phone'] = fake.phone_number()
            json_data['host_gender'] = random.choice(gender)[0]  # 성별 (M/F)
            json_data['guardian_name'] = fake.name()  # 보호자 이름
            json_data['guardian_phone'] = fake.phone_number()  # 보호자 전화번호
            json_data['relation'] = '자녀'  # 보호자와 호스트와의 관계
            json_data['host_register_no'] = fake.ssn()  # 주민등록번호
            json_data['host_account_no'] = 'xx-xxxxx-xxx' #  계좌번호 -> 추후 format에 맞게 교체
            json_data['host_bank'] = random.choice(bank) # 계좌은행
            json_data['address'] = rows['address'].strip()  # 주소
            r = int(int(rows['rent'].strip()))
            json_data['rent'] = r  # 월세
            # json_data['lat']  = rows['lat'].strip()  # 위도
            json_data['lat']  = float(rows['lat'])  # 위도
            # json_data['lng']  = rows['lng'].strip()  # 경도
            json_data['lng']  = float(rows['lng'])  # 경도
            json_data['noneRegisterMember'] = random.randint(0, 1) >= 0.5  # 비회원등록여부
            json_data['introduce'] = rows['introduce'].strip()  # 주소
            json_data['host_personality_no'] = idx  # 식별키
            json_data['home_option_no'] = idx  # 식별자

            # 집 사진
            json_data['home_image_no'] = idx
            json_data['home_image_url'] = 'home_image_url'

            # 호스트 사진
            json_data['host_image_no'] = idx
            json_data['host_image_url'] = 'host_image_url'

            json_list.append(json_data)
        db.home.insert_many(json_list)

if __name__ == '__main__':
    # merge_naver_home_csv()
    init_MongoDB_Naver()
