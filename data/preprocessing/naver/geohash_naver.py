import json
import pandas as pd
import math
import requests
from bs4 import BeautifulSoup

def main():
    # 크롤링 시 걸리지 않는 개수
    cnt = 0
    # 결과리스트
    result_list = []
    # 크롤링 할 지역
    keywords = ["서초구"]
          # "광진구",
          # "성동구",
          # "성북구",
          # "동대문구",
          # "마포구",
          # "서대문구",
          # "은평구",
          # "강동구",
          # "송파구",
          # "관악구",
          # "동작구",
          # "서초구",
          # "영등포구",
          # "양천구",
          # "강서구",
          # "양천구",
          # "구로구",
          # "금천구",
          # "강남구",
          # "송파구",
          # "용산구",
          # "중구",
          # "종로구",
          # "중랑구",
          # "강북구",
          # "도봉구",
          # "노원구"

    for keyword in keywords:
        url = f"https://m.land.naver.com/search/result/{keyword}"
        res = requests.get(url, headers={'User-agent':'Mozilla/5.0'})
        res.raise_for_status()
        soup = (str)(BeautifulSoup(res.text, "lxml"))

        value = soup.split("filter: {")[1].split("}")[0].replace(" ", "").replace("'", "")

        lat = value.split("lat:")[1].split(",")[0]
        lon = value.split("lon:")[1].split(",")[0]
        z = value.split("z:")[1].split(",")[0]
        cortarNo = value.split("cortarNo:")[1].split(",")[0]
        rletTpCds = value.split("rletTpCds:")[1].split(",")[0]
        tradTpCds = value.split("tradTpCds:")[1].split()[0]

        # lat - btm : 37.550985 - 37.4331698 = 0.1178152
        # top - lat : 37.6686142 - 37.550985 = 0.1176292
        lat_margin = 0.118

        # lon - lft : 126.849534 - 126.7389841 = 0.1105499
        # rgt - lon : 126.9600839 - 126.849534 = 0.1105499
        lon_margin = 0.111

        btm = float(lat) - lat_margin
        lft = float(lon) - lon_margin
        top = float(lat) + lat_margin
        rgt = float(lon) + lon_margin

        # 최초 요청 시 디폴트 값으로 설정되어 있으나, 원하는 값으로 구성
        rletTpCds = "APT:OPST:VL:OR:DDDGG"  # 아파트, 오피스텔, 빌라, 원룸, 단독/다가구
        tradTpCds = "B2"  # 월세 매물 확인

        # clusterList?view 를 통한 그룹의 데이터를 가져온다.
        remaked_URL = f"https://m.land.naver.com/cluster/clusterList?view=atcl&cortarNo={cortarNo}&rletTpCd={rletTpCds}&tradTpCd={tradTpCds}&z={z}&lat={lat}&lon={lon}&btm={btm}&lft={lft}&top={top}&rgt={rgt}&wprcMax=1000&rprcMax=70"

        res2 = requests.get(remaked_URL, headers={'User-agent':'Mozilla/5.0'})
        json_str = json.loads(json.dumps(res2.json()))
        values = json_str['data']['ARTICLE']

        # 큰 원으로 구성되어 있는 전체 매물그룹(values)을 load 하여 한 그룹씩 세부 쿼리 진행
        for v in values:
            lgeo = v['lgeo']
            count = v['count']
            z2 = v['z']
            lat2 = v['lat']
            lon2 = v['lon']

            len_pages = count / 20 + 1
            for idx in range(1, math.ceil(len_pages)):
                remaked_URL2 = f"https://m.land.naver.com/cluster/ajax/articleList?itemId={lgeo}&mapKey=&lgeo={lgeo}&showR0=&rletTpCd={rletTpCds}&tradTpCd={tradTpCds}&z={z2}&lat={lat2}&lon={lon2}&totCnt={count}&cortarNo={cortarNo}&page={idx}"
                res3 = requests.get(remaked_URL2, headers={'User-agent':'Mozilla/5.0'})
                json_str = json.loads(json.dumps(res3.json()))
                atcls = json_str['body']
                for atcl in atcls:
                    result_list.append(atcl)


        df = pd.json_normalize(result_list)
        df.to_csv('result_naver.csv', mode='a', header=False, index=False, encoding='UTF-8')

if __name__ == "__main__":
    main()

