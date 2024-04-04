from datetime import datetime
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
import numpy as np
import csv
import random


class BuildingType(Enum):
    APT = 1
    OPST = 2
    VL = 3
    JT = 4
    DDDGG = 5

class MemberRoleType(Enum):
    MEMBER = 1
    UNAUTHORIZED_MEMBER = 2
    MANAGER = 3

PICTURE_NUMBER = 117 # dummy 사진의 개수, 120->117

member_role = ['USER', 'UNAUTHORIZED_MEMBER']

gender = ['M', 'F']
bank = ['국민', '우리', '신한',
        '하나', '농협', '기업',
        '씨티', 'SC제일', '우체국',
        '산업', '토스', '부산',
        '경남', '대구', '전북',
        '광주', '수협', '제주',
        '케이', '카카오']
bank_num_dict = {'국민': '001', '우리': '002', '신한': '003',
                 '하나': '004', '농협': '005', '기업': '006',
                 '씨티': '007', 'SC제일': '008', '우체국': '009',
                 '산업': '011', '토스': '012', '부산': '013',
                 '경남': '014', '대구': '015', '전북': '016',
                 '광주': '017', '수협': '018', '제주': '020',
                 '케이': '023', '카카오': '090'}
boolean = [False, True]

fake = Faker('ko_KR')
Faker.seed()

class Home(BaseModel):
    # 집
    home_no: int # 식별키
    host_name: str # 이름
    host_age: int # 나이
    host_phone: str # 전화번호
    host_gender: str # 성별 (M/F)
    guardian_name: str # 보호자 이름
    guardian_phone: str # 보호자 전화번호
    relation: str # 보호자와 호스트와의 관계
    host_register_no: str # 주민등록번호
    host_account_no: str # 계좌번호
    host_bank: str # 계좌은행
    address: str # 주소

    si: str
    sgg: str
    emd: str
    ro: str

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


host = 'localhost' # https://j10a707.p.ssafy.io/
port = 27017
client = MongoClient(host, port)
db = client.test # home이라는 collection이 들어있는 DB는 test!

# sample_data = 177장
gender_str = 'MUFFFMMMMFFFUUUFUFUFMUMUMMUUFUUUUUUUUUMUUUUUUMMUMUUUUUMMUUUMUUUUMMFFFMFFFFMUFFMFMFFFUMMMMMUMUUMFMMFFUUUMMMFMMMMUUUUFU'
gender_list = list(gender_str)

def merge_naver_home_csv():
    df1 = pd.read_csv('CSV_Data/naver_home_option.csv' , encoding='CP949') # CSV 파일 읽기
    df2 = pd.read_csv('CSV_Data/naver_home_utf8.csv', encoding='CP949')
    merge_df = pd.concat([df1, df2], axis=1) # column을 기준으로 df를 하나로 합치기
    merge_df.to_csv('CSV_Data/naver_home_merged.csv', index=False) # 합친 df를 csv로 저장


# For MySQL
home_columns = ['home_no', 'host_name', 'host_age', 'host_phone',
                'host_gender', 'guardian_name', 'guardian_phone',
                'relation', 'host_register_no', 'host_account_no',
                'host_bank', 'rent', 'lat', 'lng',
                 'introduce', 'host_personality_no',
                'home_option_no', 'si', 'sgg', 'emd', 'ro', 'detail', 'register_member_role'] # 시,군,구,도로명->추가 ('si', 'sgg', 'emd', 'ro') # address, role 제거
host_personality_columns = ['host_personality_no', 'smoke', 'pet',
                            'clean', 'daytime', 'nighttime', 'extrovert',
                            'introvert', 'cold', 'hot', 'no_touch']
home_option_columns = ['home_option_no', 'internet', 'gas',
                       'washing_machine', 'air_conditioner', 'refrigerator',
                       'elevator', 'microwave', 'breakfast', 'toilet',
                       'heating', 'parking', 'station', 'move_in_date',
                       'sink', 'type']
home_image_columns = ['home_image_no', 'home_image_url', 'home_no']
host_image_columns = ['host_image_no', 'home_no', 'host_image_url']
def init_MongoDB_Naver():
    print('MongoDB에 내용 입력')
    df = pd.read_csv('CSV_Data/naver_home_merged.csv', encoding='UTF-8')
    # 인코딩 열때는 반드시 UTF-8로 열어야 에러 발생 없음
    json_list = []
    host_vector_json_list = []
    # fake = Faker('ko_KR')
    # Faker.seed()
    # MySQL에 들어갈 csv파일 작성
    # (1) 집
    # df_home = pd.DataFrame(data='데이터', columns=home_columns)
    df_home = pd.DataFrame(columns=home_columns)
    # (2) 호스트 성향조사
    # df_host_personality = pd.DataFrame(data='데이터', columns=host_personality_columns)
    df_host_personality = pd.DataFrame(columns=host_personality_columns)
    # (3) 집별 옵션
    # df_home_option = pd.DataFrame(data='데이터', columns=home_option_columns)
    df_home_option = pd.DataFrame(columns=home_option_columns)
    # (4) 집 사진
    # df_home_image = pd.DataFrame(data='데이터', columns=home_image_columns)
    df_home_image = pd.DataFrame(columns=home_image_columns)
    # (5) 호스트 사진
    # df_host_image = pd.DataFrame(data='데이터', columns=host_image_columns)
    df_host_image = pd.DataFrame(columns=host_image_columns)


    picture_index = 1

    with open('CSV_Data/naver_home_merged.csv', 'r', encoding='utf-8-sig') as f: # -sig
        csvReader = csv.DictReader(f)

        for idx, rows in enumerate(csvReader):
            json_data = {}

            # 집별 옵션
            # json_data['internet'] = True if rows['internet']==1 else False

            json_data['internet'] = int(rows['internet'])
            json_data['gas'] = int(rows['gas'])
            json_data['washing_machine'] = int(rows['washing_machine'])
            json_data['air_conditioner'] = int(rows['air_conditioner'])
            json_data['refrigerator'] = int(rows['refrigerator'])
            json_data['elevator'] = int(rows['elevator'])
            json_data['microwave'] = int(rows['microwave'])
            json_data['breakfast'] = int(rows['breakfast'])
            json_data['toilet'] = int(rows['toilet'])
            json_data['heating'] = int(rows['heating'])
            json_data['parking'] = int(rows['parking'])
            json_data['station'] = int(rows['station'])
            json_data['move_in_date'] = int(rows['move_in_date'])
            json_data['sink'] = int(rows['sink'])
            json_data['type'] = rows['type'].strip()

            new_row = {'home_option_no': idx+1, 'internet': json_data['internet'],
                       'gas': json_data['gas'], 'washing_machine': json_data['washing_machine'],
                       'air_conditioner': json_data['air_conditioner'],
                       'refrigerator': json_data['refrigerator'],
                       'elevator': json_data['elevator'],
                       'microwave': json_data['microwave'],
                       'breakfast': json_data['breakfast'],
                       'toilet': json_data['toilet'],
                       'heating': json_data['heating'],
                       'parking': json_data['parking'],
                       'station': json_data['station'],
                       'move_in_date': json_data['move_in_date'],
                       'sink': json_data['sink'],
                       'type': json_data['type'],
                       }
            df_home_option = df_home_option._append(new_row, ignore_index=True)
            # append(new_row, ignore_index=True)
            # df = df.append(new_row, ignore_index=True)
            # new_row = {'Name': 'John', 'Age': 30, 'City': 'New York'}

            # 호스트
            # json_data['smoke'] = random.randint(0, 1) >= 0.5
            json_data['smoke'] = random.randint(0, 1)
            json_data['pet'] = random.randint(0, 1)
            json_data['clean'] = random.randint(0, 1)
            json_data['daytime'] = random.randint(0, 1)
            json_data['nighttime'] = json_data['daytime'] ^ 1
            json_data['extrovert'] = random.randint(0, 1)
            json_data['introvert'] = json_data['extrovert'] ^ 1
            json_data['cold'] = random.randint(0, 1)
            json_data['hot'] = random.randint(0, 1)
            json_data['no_touch'] = random.randint(0, 1)

            new_row = {
                'host_personality_no': idx+1,
                'smoke': json_data['smoke'],
                'pet': json_data['pet'],
                'clean': json_data['clean'],
                'daytime': json_data['daytime'],
                'nighttime': json_data['nighttime'],
                'extrovert': json_data['extrovert'],
                'introvert': json_data['introvert'],
                'cold': json_data['cold'],
                'hot': json_data['hot'],
                'no_touch': json_data['no_touch'],
            }
            host_personality_json_info = {
                'smoke': json_data['smoke'],
                'pet': json_data['pet'],
                'clean': json_data['clean'],
                'daytime': json_data['daytime'],
                'nighttime': json_data['nighttime'],
                'extrovert': json_data['extrovert'],
                'introvert': json_data['introvert'],
                'cold': json_data['cold'],
                'hot': json_data['hot'],
                'no_touch': json_data['no_touch'],
            }
            df_host_personality = df_host_personality._append(new_row, ignore_index=True)
            # 집
            json_data['home_no'] = idx+1
            json_data['host_age'] = random.randint(65, 100)  # 나이
            # json_data['host_phone'] = fake.phone_number() # 데이터 포맷에 맞게 변경
            json_data['host_phone'] = get_random_phone_number()
            # json_data['host_gender'] = random.choice(gender)[0]  # 성별 (M/F)
            json_data['host_gender'] = get_gender(gender_list[idx%PICTURE_NUMBER])  # 성별 (M/F)
            json_data['host_name'] = get_name(json_data['host_gender'])  # 이름
            json_data['guardian_name'] = fake.name()  # 보호자 이름
            # json_data['guardian_phone'] = fake.phone_number()  # 보호자 전화번호 # 데이터 포맷에 맞게 변경
            json_data['guardian_phone'] = get_random_phone_number()
            json_data['relation'] = '자녀'  # 보호자와 호스트와의 관계
            json_data['host_register_no'] = fake.ssn()  # 주민등록번호
            json_data['host_bank'] = random.choice(bank) # 계좌은행
            json_data['host_account_no'] = get_bank_account_number(json_data['host_bank']) # 계좌번호
            json_data['address'] = rows['address'].strip()  # 주소
            r = int(int(rows['rent'].strip()))
            json_data['rent'] = r  # 월세
            # json_data['lat']  = rows['lat'].strip()  # 위도
            json_data['lat']  = float(rows['lat'])  # 위도
            # json_data['lng']  = rows['lng'].strip()  # 경도
            json_data['lng']  = float(rows['lng'])  # 경도
            json_data['register_member_role'] = random.choice(list(member_role))  # 비회원등록여부
            json_data['introduce'] = rows['introduce'].strip()  # 주소
            json_data['host_personality_no'] = idx+1  # 식별키
            json_data['home_option_no'] = idx+1  # 식별자

            # merged 파일안에 결측치 문제는 이미 해결된 것으로 보임
            json_data['si'] = rows['si'].strip()
            json_data['sgg'] = rows['sgg'].strip()
            json_data['emd'] = rows['emd'].strip()
            json_data['ro'] = rows['ro'].strip()

            new_row = {
                'home_no': json_data['home_no'],
                'host_name': json_data['host_name'],
                'host_age': json_data['host_age'],
                'host_phone': json_data['host_phone'],
                'host_gender': json_data['host_gender'],
                'guardian_name': json_data['guardian_name'],
                'guardian_phone': json_data['guardian_phone'],
                'relation': json_data['relation'],
                'host_register_no': json_data['host_register_no'],
                'host_account_no': json_data['host_account_no'],
                'host_bank': json_data['host_bank'],
                # 'address': json_data['address'],
                'rent': json_data['rent'],
                'lat': json_data['lat'],
                'lng': json_data['lng'],
                'register_member_role': json_data['register_member_role'], # role -> register_member_role
                'introduce': json_data['introduce'],
                'host_personality_no': json_data['host_personality_no'],
                'home_option_no': json_data['home_option_no'],
                'si': json_data['si'],
                'sgg': json_data['sgg'],
                'emd': json_data['emd'],
                'ro': json_data['ro'],
                'detail': 'empty'
            }
            df_home = df_home._append(new_row, ignore_index=True)

            # 집 사진은 각 매물마다 3장씩 추가할 것
            # 집 사진
            json_data['home_image_no'] = idx+1

            image_list = []
            for i in range(1, 4):
                new_row = {
                'home_no': json_data['home_no'], # FK
                # 'home_image_no': json_data['home_image_no'],
                'home_image_no': picture_index,
                # 'home_image_url': json_data['home_image_url'],
                'home_image_url': '/homeImage/{}/{}.jpg'.format(idx%360+1,f"{i:02}"), # 'http://' + idx + '/' + i
                }
                image_list.append(new_row)
                picture_index+=1
                df_home_image = df_home_image._append(new_row, ignore_index=True)

            json_data['home_image'] = image_list

            # 호스트 사진
            json_data['host_image_no'] = idx+1
            json_data['host_image_url'] = '/hostImage/{}.jpg'.format(idx%PICTURE_NUMBER+1) # 'host_image_url'
            new_row = {
                'host_image_no': json_data['host_image_no'],
                'home_no': json_data['home_no'],
                'host_image_url': json_data['host_image_url'],
            }
            df_host_image = df_host_image._append(new_row, ignore_index=True)

            # host_vector 관련 정보를 json_data에 추가
            # host_vector_no는 home_no로 대체
            host_vector_json = get_host_vector_json(host_personality_json_info)
            json_data['host_vector'] = host_vector_json
            json_list.append(json_data)

        df_home_option.to_csv('MySQL/home_option.csv', index=False, encoding='utf-8')
        df_home.to_csv('MySQL/home.csv', index=False, encoding='utf-8')
        df_host_personality.to_csv('MySQL/host_personality.csv', index=False, encoding='utf-8')

        df_home_image.to_csv('MySQL/home_image.csv', index=False, encoding='utf-8')
        df_host_image.to_csv('MySQL/host_image.csv', index=False, encoding='utf-8')

        db.home.insert_many(json_list)


# json 입력
def get_host_vector_json(host_personality):
    # print('빅데이터의 벡터화')
    """
    <노인>
    주간지수, 야간지수, 흡연지수, 외향, 내향, 매너있는 호스트, 동물애호가, 추위잘탐, 더위잘탐
    """
    # index = 12
    day_element = convert_bool_to_int(host_personality['daytime'])
    night_element = convert_bool_to_int(host_personality['nighttime'])
    smoke_element = convert_bool_to_int(host_personality['smoke'])
    extro_element = convert_bool_to_int(host_personality['extrovert'])
    intro_element = convert_bool_to_int(host_personality['introvert'])
    mannered_element = convert_bool_to_int(host_personality['clean'])+convert_bool_to_int(host_personality['no_touch'])
    pet_lover_element = convert_bool_to_int(host_personality['pet'])
    cold_element = convert_bool_to_int(host_personality['cold'])
    hot_element = convert_bool_to_int(host_personality['hot'])

    member_vector_json = {
        'day_element': day_element,
        'night_element': night_element,
        'smoke_element': smoke_element,
        'extro_element': extro_element,
        'intro_element': intro_element,
        'mannered_element': mannered_element,
        'pet_lover_element': pet_lover_element,
        'cold_element': cold_element,
        'hot_element': hot_element
    }
    return member_vector_json

# 성별에 맞는 이름 출력
def get_name(gender):
    if gender=='F':
        return fake.name_female()
    return fake.name_male()

def get_gender(char):
    if char=='U':
        return random.choices('MF')[0]
    return char

def get_random_phone_number():
    phone_num = '010'
    nums = ['0','1','2','3','4','5','6','7','8','9']
    for i in range(8):
        phone_num += random.choice(nums)
    return phone_num

def get_bank_account_number(bank_name):
    bank_code = bank_num_dict[bank_name]
    account_number = ''.join(random.choices('0123456789', k=12))
    return bank_code + '-' +account_number

def convert_bool_to_int(bool):
    if(bool==True):
        return 1
    return 0

# 결측치 채우기 위해 구현
def null_empty_fill_func(obj):
    if(obj==None or obj==''):
        return 'empty'
    return obj

if __name__ == '__main__':
    # merge_naver_home_csv()
    init_MongoDB_Naver()
    # print(type(datetime.today().year)) # 'int'
