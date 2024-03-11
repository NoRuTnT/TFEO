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
def main():
    get_review()


# details 파일 정상 파싱 안됨!!
# 추후 수정 필요!!
# 단지 번호 관련해서 mapping 포맷이 다르다.
def get_aparts():
    # aparts_id_list = []
    # url = "https://apis.zigbang.com/v2/aparts/items?domain=zigbang&rentMin=0&rentMax=70&salesTypes%5B0%5D=월세&geohash={wydm}"
    # req = requests.get(url)
    # items = req.json()
    # # print(items)
    # # JSON을 인덴트하여 출력
    # json_str = json.dumps(items, indent=4)
    # json_str = json_str.encode().decode("unicode_escape")
    # print(len(items))
    # print(json_str)

    print("아파트 정보 탐색 시작!")
    aparts_list = []  # 위도, 경도, 아파트id정보
    aparts_id_list = []  # 아파트id정보
    aparts_detail = []  # 아파트의 상세정보

    # 아래부터 진짜 코드 구현
    # url = "https://apis.zigbang.com/v2/aparts/items?domain=zigbang&rentMin=0&rentMax=70&salesTypes%5B0%5D=월세&geohash={wydm}"
    url = "https://apis.zigbang.com/v2/aparts/items?geohash={geohash}&rentMin=0&rentMax={rentMax}&salesTypes%5B0%5D=%EC%9B%94%EC%84%B8&domain=zigbang&checkAnyItemWithoutFilter=true"
    for geocode in seoul_geocode_list:
        for char in geocode_char:
            print("현재 탐색중인 geocode: ", geocode + char)
            response = requests.get(url.format(geohash=geocode + char, rentMax=70))
            json_data = response.json()
            df = pd.json_normalize(json_data)

            print(df)
            df.to_csv('apartsInfo.csv', mode='a', index=False, header=not os.path.exists('apartsInfo.csv'),
                      encoding="CP949")

            for item in json_data["vrItems"]: # items -> vrItems
                aparts_list.append(item)
                aparts_id_list.append(item["areaDanjiId"])

            print(aparts_id_list)
            # areaDanjiId
            for aparts_id in aparts_id_list:
                detail_url = "https://apis.zigbang.com/v3/items/{}?version=&domain=zigbang".format(aparts_id)
                res = requests.get(detail_url)
                json_res = res.json()
                print("--------------------------")
                print(json_res)
                df = pd.json_normalize(json_res)
                df.to_csv('apartsDetail.csv', mode='a', index=False, header=not os.path.exists('apartsDetail.csv'),
                          encoding="utf-8-sig")

def get_villa():
    print("빌라정보 탐색 시작!")
    villa_list= [] # 위도, 경도, 빌라id정보
    villa_id_list = [] # 빌라id정보
    villa_detail = [] # 빌라의 상세정보

    # 아래부터 진짜 코드 구현
    url = "https://apis.zigbang.com/v2/items/villa?geohash={geohash}&rentMin=0&rentMax={rentMax}&salesTypes%5B0%5D=%EC%9B%94%EC%84%B8&domain=zigbang&checkAnyItemWithoutFilter=true"
    for geocode in seoul_geocode_list:
        for char in geocode_char:
            print("현재 탐색중인 geocode: ", geocode+char)
            response = requests.get(url.format(geohash=geocode+char, rentMax=70))
            json_data = response.json()

            df = pd.json_normalize(json_data)

            print(df)
            # df.to_csv('villaInfo.csv', index=False, encoding="CP949")
            df.to_csv('villaInfo.csv', mode='a', index=False, header=not os.path.exists('villaInfo.csv'),
                      encoding="CP949")

            for item in json_data["items"]:
                villa_list.append(item)
                villa_id_list.append(item["itemId"])


            for villa_id in villa_id_list:
                detail_url = "https://apis.zigbang.com/v3/items/{}?version=&domain=zigbang".format(villa_id)
                res = requests.get(detail_url)
                json_res = res.json()

                df = pd.json_normalize(json_res)
                df.to_csv('villaDetail.csv', mode='a', index=False, header=not os.path.exists('villaDetail.csv'),
                          encoding="utf-8-sig")

def get_oneroom():
    print("원룸정보 탐색 시작!")
    oneroom_list = []  # 위도, 경도, 빌라id정보
    oneroom_id_list = []  # 빌라id정보
    oneroom_detail = []  # 빌라의 상세정보

    # 아래부터 진짜 코드 구현
    url = "https://apis.zigbang.com/v2/items/oneroom?geohash={geohash}&depositMin=0&depositMax={depositMax}&rentMin=0&rentMax={rentMax}&salesTypes%5B0%5D=%EC%9B%94%EC%84%B8&domain=zigbang&checkAnyItemWithoutFilter=true"
    for geocode in seoul_geocode_list:
        for char in geocode_char:
            print("현재 탐색중인 geocode: ", geocode + char)
            response = requests.get(url.format(geohash=geocode + char, depositMax=1000, rentMax=70))
            json_data = response.json()

            df = pd.json_normalize(json_data)

            print(df)
            df.to_csv('oneroomInfo.csv', mode='a', index=False, header=not os.path.exists('oneroomInfo.csv'),
                      encoding="CP949")

            for item in json_data["items"]:
                oneroom_list.append(item)
                oneroom_id_list.append(item["itemId"])

            for oneroom_id in oneroom_id_list:
                detail_url = "https://apis.zigbang.com/v3/items/{}?version=&domain=zigbang".format(oneroom_id)
                res = requests.get(detail_url)
                json_res = res.json()

                print_json_info(json_res)

                df = pd.json_normalize(json_res)
                df.to_csv('villaDetail.csv', mode='a', index=False, header=not os.path.exists('villaDetail.csv'),
                          encoding="utf-8-sig")

def get_officetel():

    print("오피스텔정보 탐색 시작!")
    officetel_list = []  # 위도, 경도, 오피스텔id정보
    officetel_id_list = []  # 오피스텔id정보
    officetel_detail = []  # 오피스텔의 상세정보

    # 아래부터 진짜 코드 구현
    url = "https://apis.zigbang.com/v2/items/officetel?depositMin=0&depositMax={depositMax}&rentMin=0&rentMax={rentMax}&salesTypes%5B0%5D=%EC%9B%94%EC%84%B8&geohash={geohash}&domain=zigbang&checkAnyItemWithoutFilter=true&withBuildings=true"
    for geocode in seoul_geocode_list:
        for char in geocode_char:
            print("현재 탐색중인 geocode: ", geocode + char)
            response = requests.get(url.format(depositMax=1000, rentMax=70, geohash=geocode + char))
            json_data = response.json()

            df = pd.json_normalize(json_data)

            print(df)
            df.to_csv('officetelInfo.csv', mode='a', index=False, header=not os.path.exists('officetelInfo.csv'),
                      encoding="CP949")

            for item in json_data["items"]:
                officetel_list.append(item)
                officetel_id_list.append(item["itemId"])

            for officetel_id in officetel_id_list:
                detail_url = "https://apis.zigbang.com/v3/items/{}?version=&domain=zigbang".format(officetel_id)
                res = requests.get(detail_url)
                json_res = res.json()

                # print_json_info(json_res)
                # 건물의 종류마다 오류가 다르게 발생하는 이유는
                # 특정 특수문자에서 발생하는 인코딩 오류로 추정됨

                df = pd.json_normalize(json_res)
                df.to_csv('officetelDetail.csv', mode='a', index=False, header=not os.path.exists('officetelDetail.csv'),
                          encoding="utf-8-sig")


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
    get_aparts()
    # get_villa()
    # get_officetel()


    # get_oneroom()
    # "https://apis.zigbang.com/v3/items/40014490?version=&domain=zigbang"

    # json_str = json.dumps(json_res, indent=4, ensure_ascii=False) # 한글 문자열 인코딩 맞춰서 출력
    # print(json_str)