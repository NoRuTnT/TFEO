# 70이하의 월세 매물만 탐색
import pandas as pd
import requests
import json
import os
import csv


# 인천과 경기북부 영역까지 넉넉하게 계산한 코드
seoul_geocode_list = ["wydn","wydq","wydj","wydm"]
geocode_char = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
                'p', 'r', 'x', 'z', 'n', 'q', 'w', 'y', 'j', 'm',
                't', 'v', 'h', 'k', 's', 'u', 'e', 'g', 'd', 'f',
                'c', 'b']


# naver부동산 기준
# 일부 column 같은 경우 기준 통합 절차가 필요
house_columns = (
    "atclNm",  # 주택이름
    "atclStatCd",  # 지역코드
    "rletTpCd", # 건축물 종류
    "uprRletTpCd", # 아직 미정
    "rletTpNm", # 건축물 종류 이름
    "tradTpCd", # 건축물 거래 형태 코드
    "tradTpNm", # 건축물 거래 형태 이름
    "flrInfo", # 층수
    "prc", # 보증금
    "rentPrc", # 월세
    "spc1", # 사용 면적
    "spc2", # 총 면적
    "direction", # 창 방향
    "atclCfmYmd", # 등록일자
    "lat", # 위도
    "lng", # 경도
    "atclFetrDesc", # 매물 소개
    "tagList", # 매물 태그
)





# geohash grid방식에 따라 특정 지역구 정보가 포함되지 않을 수 있음
# 다른 dataset 정보를 취합해서 보완!
geo_json = {
	"data": [
		{
		"region": "성동구",
		"price": [1000, 70],
		"geocode": ["wydmd", "wydme"],
		},
        {
        "region": "마포구",
        "price": [900, 60],
        "geocode": ["wydm8"],
        },
        {
        "region": "광진구",
        "price": [900, 60],
        "geocode": [],
        },
        {
        "region": "양천구",
        "price": [900, 60],
        "geocode": [],
        },
        {
        "region": "동작구",
        "price": [800, 60],
        "geocode": ["wydm2", "wydm3"],
        },
        {
        "region": "종로구",
        "price": [800, 60],
        "geocode": ["wydmc"],
        },
        {
        "region": "강동구",
        "price": [800, 60],
        "geocode": ["wydmt"],
        },
        {
        "region": "영등포구",
        "price": [800, 60],
        "geocode": ["wydjx", "wydjr"],
        },
        {
        "region": "중구",
        "price": [800, 60],
        "geocode": ["wydm9"],
        },
        {
        "region": "강서구",
        "price": [700, 50],
        "geocode": ["wydjv", "wydjt", "wydjw"],
        },
        {
        "region": "서대문구",
        "price": [700, 40],
        "geocode": ["wydmb"],
        },
        {
        "region": "동대문구",
        "price": [600, 40],
        "geocode": ["wydnp", "wydmg"],
        },
        {
        "region": "은평구",
        "price": [600, 40],
        "geocode": ["wydq0", "wydjz"],
        },
        {
        "region": "성북구",
        "price": [600, 40],
        "geocode": ["wydq1", "wydmf"],
        },
        {
        "region": "노원구",
        "price": [600, 40],
        "geocode": ["wydq7", "wydq5", "wydqh"],
        },
        {
        "region": "관악구",
        "price": [600, 40],
        "geocode": ["wydm0", "wydm1"],
        },
        {
        "region": "구로구",
        "price": [600, 40],
        "geocode": ["wydjm", "wydjq"],
        },
        {
        "region": "중랑구",
        "price": [500, 30],
        "geocode": ["wydmu"],
        },
        {
        "region": "금천구",
        "price": [500, 30],
        "geocode": ["wydjp"],
        },
        {
        "region": "강북구",
        "price": [500, 30],
        "geocode": ["wydq4"],
        },
        {
        "region": "도봉구",
        "price": [500, 30],
        "geocode": ["wydq6"],
        },
    ]
}

# 참고 : https://jamdol.tistory.com/91
apart_gu_code = [11110, 11140, 11200, 11215, 11230, 11260,
                 11290,11305, 11320, 11350, 11380, 11410,
                 11440, 11470, 11500, 11530, 11545, 11560,
                 11590, 11620, 11740]


def main():
    # print(geo_json["data"])
    for gu in geo_json["data"]:
        for geohash in gu["geocode"]:
            print(geohash)
    get_review()


# 아파트 맨 나중에 완성
# details 파일 정상 파싱 안됨!!
# 추후 수정 필요!!
# 단지 번호 관련해서 mapping 포맷이 다르다.
def get_aparts():
    # 충분한 매물 데이터 확보로
    # 아파트 매물 정보 획득은 더 이상 진행하지 않는다.
    pass
    url = "https://www.zigbang.com/_next/data/ZHqQnhZil26j9bfVZPk6o/home/apt_danjis_detail.json?area_danji_id=17983"
    user_agent = "Mozilla/5.0 (Windows; U; Windows NT 5.1;)"
    resp = requests.get(url, headers={"User-Agent": user_agent})
    json_data = resp.json()
    print_json_info(json_data)



    print("아파트 정보 탐색 시작!")
    aparts_list = []  # 위도, 경도, 아파트id정보
    aparts_id_list = []  # 아파트id정보

    ##########

    # gu_code -> apart고유 id 획득
    # -> 매물 정보획득

    # for gu_code in apart_gu_code:
    #     url = "https://apis.zigbang.com/property/biglab/apartments/list?type=local&id={localId}"
    #     req = requests.get(url.format(localId=guId))
    #     info = req.json()
    #
    #     result = info['ids']
    #     print(info['count'])

    ##########

    # url = "https://apis.zigbang.com/v2/aparts/items?domain=zigbang&rentMin=0&rentMax=70&salesTypes%5B0%5D=월세&geohash={wydm}"
    url = "https://apis.zigbang.com/v2/aparts/items?geohash={geohash}&rentMin=0&rentMax={rentMax}&salesTypes%5B0%5D=%EC%9B%94%EC%84%B8&domain=zigbang&checkAnyItemWithoutFilter=true"

    # file_url = 'data/aparts.json'
    # with open(file_url, 'a', encoding='UTF-8') as f:
    #     f.write('[')
    #     for idx1, gu in enumerate(geo_json["data"]):
    #         for idx2, geohash in enumerate(gu["geocode"]):
    #             print('현재 탐색중인 지역구 코드: ', geohash)
    #             response = requests.get(url.format(geohash=geohash, depositMax=gu["price"][0], rentMax=gu["price"][1]))
    #             json_data = response.json()
    #
    #             df = pd.json_normalize(json_data)
    #
    #             print(df)
    #
    #             for item in json_data["items"]:
    #                 aparts_list.append(item)
    #                 aparts_id_list.append(item["itemId"])
    #
    #             for idx3, officetel_id in enumerate(aparts_id_list):
    #                 detail_url = "https://apis.zigbang.com/v3/items/{}?version=&domain=zigbang".format(officetel_id)
    #                 res = requests.get(detail_url)
    #                 json_res = res.json()
    #
    #                 print(idx3)
    #                 # print_json_info(json_res)
    #                 # 건물의 종류마다 오류가 다르게 발생하는 이유는
    #                 # 특정 특수문자에서 발생하는 인코딩 오류로 추정됨
    #
    #                 # df = pd.json_normalize(json_res)
    #                 # df.to_csv('data/officetelDetail.csv', mode='a', index=False, header=not os.path.exists('data/officetelDetail.csv'),
    #                 #           encoding="utf-8-sig")
    #
    #                 json.dump(json_res, f, indent=4, ensure_ascii=False)
    #                 # 맨 마지막 json이 아닌 경우
    #                 if(idx1 != len(geo_json["data"])-1 or idx2 != len(gu["geocode"])-1 or idx3 != len(officetel_id_list)-1):
    #                     f.write(',')
    #                 f.write('\n')
    #     # , 제거
    #     f.write(']')
    #     f.close()






    # for geocode in seoul_geocode_list:
    #     for char in geocode_char:
    #         print("현재 탐색중인 geocode: ", geocode + char)
    #         response = requests.get(url.format(geohash=geocode + char, rentMax=70))
    #         json_data = response.json()
    #         df = pd.json_normalize(json_data)
    #
    #         print(df)
    #         df.to_csv('data/apartsInfo.csv', mode='a', index=False, header=not os.path.exists('data/apartsInfo.csv'),
    #                   encoding="CP949")
    #
    #         for item in json_data["vrItems"]: # items -> vrItems
    #             aparts_list.append(item)
    #             aparts_id_list.append(item["areaDanjiId"])
    #
    #         print(aparts_id_list)
    #         # areaDanjiId
    #         for aparts_id in aparts_id_list:
    #             detail_url = "https://apis.zigbang.com/v3/items/{}?version=&domain=zigbang".format(aparts_id)
    #             res = requests.get(detail_url)
    #             json_res = res.json()
    #             print("--------------------------")
    #             print(json_res)
    #             df = pd.json_normalize(json_res)
    #             df.to_csv('data/apartsDetail.csv', mode='a', index=False, header=not os.path.exists('data/apartsDetail.csv'),
    #                       encoding="utf-8-sig")

def get_villa():
    print("빌라정보 탐색 시작!")
    villa_list= [] # 위도, 경도, 빌라id정보
    villa_id_list = [] # 빌라id정보
    villas = [] # 빌라의 상세정보

    # 아래부터 진짜 코드 구현
    url = "https://apis.zigbang.com/v2/items/villa?geohash={geohash}&depositMin=0&depositMax={depositMax}&rentMin=0&rentMax={rentMax}&salesTypes%5B0%5D=%EC%9B%94%EC%84%B8&domain=zigbang&checkAnyItemWithoutFilter=true"

    file_url = 'data/villa.json'
    with open(file_url, 'a', encoding='UTF-8') as f:
        f.write('[')
        for idx1, gu in enumerate(geo_json["data"]):
            for idx2, geohash in enumerate(gu["geocode"]):
                # print("현재 탐색중인 geocode: ", geocode + char)
                print('현재 탐색중인 지역구 코드: ', geohash)
                response = requests.get(url.format(geohash=geohash, depositMax=gu["price"][0], rentMax=gu["price"][1]))
                json_data = response.json()

                df = pd.json_normalize(json_data)

                print(df)

                for item in json_data["items"]:
                    villa_list.append(item)
                    villa_id_list.append(item["itemId"])

                for idx3, villa_id in enumerate(villa_id_list):
                    # print('-------------------')
                    # print('officetel_id:', officetel_id)
                    # print('-------------------')
                    detail_url = "https://apis.zigbang.com/v3/items/{}?version=&domain=zigbang".format(villa_id)
                    res = requests.get(detail_url)
                    json_res = res.json()

                    print(idx3)
                    json.dump(json_res, f, indent=4, ensure_ascii=False)
                    # 맨 마지막 json이 아닌 경우
                    if (idx1 != len(geo_json["data"]) - 1 or idx2 != len(gu["geocode"]) - 1 or idx3 != len(
                            villa_id_list) - 1):
                        f.write(',')
                    f.write('\n')
        # , 제거
        f.write(']')
        f.close()


def get_oneroom():
    print("원룸정보 탐색 시작!")
    oneroom_list = []  # 위도, 경도, 빌라id정보
    oneroom_id_list = []  # 빌라id정보

    url = "https://apis.zigbang.com/v2/items/oneroom?depositMin=0&depositMax={depositMax}&rentMin=0&rentMax={rentMax}&salesTypes%5B0%5D=%EC%9B%94%EC%84%B8&geohash={geohash}&domain=zigbang&checkAnyItemWithoutFilter=true&withBuildings=true"

    file_url = 'data/oneroom.json'
    with open(file_url, 'a', encoding='UTF-8') as f:
        f.write('[')
        for idx1, gu in enumerate(geo_json["data"]):
            for idx2, geohash in enumerate(gu["geocode"]):
                # print("현재 탐색중인 geocode: ", geocode + char)
                print('현재 탐색중인 지역구 코드: ', geohash)
                response = requests.get(url.format(geohash=geohash, depositMax=gu["price"][0], rentMax=gu["price"][1]))
                json_data = response.json()

                df = pd.json_normalize(json_data)

                print(df)

                for item in json_data["items"]:
                    oneroom_list.append(item)
                    oneroom_id_list.append(item["itemId"])

                for idx3, oneroom_id in enumerate(oneroom_id_list):
                    detail_url = "https://apis.zigbang.com/v3/items/{}?version=&domain=zigbang".format(oneroom_id)
                    res = requests.get(detail_url)
                    json_res = res.json()

                    print(idx3)

                    json.dump(json_res, f, indent=4, ensure_ascii=False)
                    # 맨 마지막 json이 아닌 경우
                    if(idx1 != len(geo_json["data"])-1 or idx2 != len(gu["geocode"])-1 or idx3 != len(oneroom_id_list)-1):
                        f.write(',')
                    f.write('\n')
        # , 제거
        f.write(']')
        f.close()



def get_officetel():

    print("오피스텔정보 탐색 시작!")
    officetel_list = []  # 위도, 경도, 오피스텔id정보
    officetel_id_list = []  # 오피스텔id정보

    # 아래부터 진짜 코드 구현
    url = "https://apis.zigbang.com/v2/items/officetel?depositMin=0&depositMax={depositMax}&rentMin=0&rentMax={rentMax}&salesTypes%5B0%5D=%EC%9B%94%EC%84%B8&geohash={geohash}&domain=zigbang&checkAnyItemWithoutFilter=true&withBuildings=true"

    file_url = 'data/officetel.json'
    with open(file_url, 'a', encoding='UTF-8') as f:
        f.write('[')
        for idx1, gu in enumerate(geo_json["data"]):
            for idx2, geohash in enumerate(gu["geocode"]):
                # print("현재 탐색중인 geocode: ", geocode + char)
                print('현재 탐색중인 지역구 코드: ', geohash)
                response = requests.get(url.format(geohash=geohash, depositMax=gu["price"][0], rentMax=gu["price"][1]))
                json_data = response.json()

                df = pd.json_normalize(json_data)

                print(df)

                for item in json_data["items"]:
                    officetel_list.append(item)
                    officetel_id_list.append(item["itemId"])

                for idx3, officetel_id in enumerate(officetel_id_list):
                    # print('-------------------')
                    # print('officetel_id:', officetel_id)
                    # print('-------------------')
                    detail_url = "https://apis.zigbang.com/v3/items/{}?version=&domain=zigbang".format(officetel_id)
                    res = requests.get(detail_url)
                    json_res = res.json()

                    print(idx3)
                    # print_json_info(json_res)
                    # 건물의 종류마다 오류가 다르게 발생하는 이유는
                    # 특정 특수문자에서 발생하는 인코딩 오류로 추정됨

                    # df = pd.json_normalize(json_res)
                    # df.to_csv('data/officetelDetail.csv', mode='a', index=False, header=not os.path.exists('data/officetelDetail.csv'),
                    #           encoding="utf-8-sig")

                    json.dump(json_res, f, indent=4, ensure_ascii=False)
                    # 맨 마지막 json이 아닌 경우
                    if(idx1 != len(geo_json["data"])-1 or idx2 != len(gu["geocode"])-1 or idx3 != len(officetel_id_list)-1):
                        f.write(',')
                    f.write('\n')
        # , 제거
        f.write(']')
        f.close()

def get_review():
    # id = 80
    id = 6692
    url = "https://apis.zigbang.com/property/apartments/{}/reviews/v1".format(id)
    resp = requests.get(url)
    items = resp.json()
    items_str = json.dumps(items, indent=4)
    items_str = items_str.encode().decode("unicode_escape")
    print(items_str)

def print_json_info(json_info):
    items_info = json.dumps(json_info, indent=4)
    items_info = items_info.encode().decode("unicode_escape")
    print(items_info)

if __name__ == "__main__":
    print("직방 매물 정보를 크롤링")
    # main()
    # get_aparts()
    # get_villa()
    # get_officetel()
    get_oneroom()
