import json
import pandas as pd
import math
import requests
from bs4 import BeautifulSoup

def main():
    # 결과 리스트 (크롤링한 json 데이터를 저장하고 있는 결과 리스트)
    result_list = []
    # 크롤링 할 지역 (네이버 접근 제한 이슈로 한 번에 1600개까지만 조회 가능 -> 적절히 수정해서 사용할 것)
    keywords = ["관악구"]

    # -- 여기부터 하면 됨
    # 중구: 800
    # 60
    # 강서구: 700
    # 50
    
    # -- 여기부터 ㄱㄱ
    # 관악구: 600
    # 40
    # 구로구: 600
    # 40
    # 중랑구: 500
    # 30
    # 금천구: 500
    # 30
    # 강북구: 500
    # 30
    # 도봉구: 500
    # 30
    try:
        for keyword in keywords:
            # 네이버 접근 제한 이슈로 접근 경로 우회를 위해 url, headers 설정
            url = f"https://m.land.naver.com/search/result/{keyword}"
            res = requests.get(url, headers={'User-agent':'Mozilla/5.0'})
            res.raise_for_status()
            soup = (str)(BeautifulSoup(res.text, "lxml"))

            # 해당 지역의 클러스터 리스트를 조회합니다.
            value = soup.split("filter: {")[1].split("}")[0].replace(" ", "").replace("'", "")

            lat = value.split("lat:")[1].split(",")[0]      # 위도
            lon = value.split("lon:")[1].split(",")[0]      # 경도
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

            rletTpCds = "APT:OPST:VL:OR:DDDGG"  # 아파트, 오피스텔, 빌라, 원룸, 단독/다가구 매물
            tradTpCds = "B2"  # 월세 매물

            wprcMax = 600  # 보증금 1000만원 이하
            rprcMax = 40    # 월세 70만원 이하

            # 클러스터 리스트 그룹의 데이터를 가져옵니다.
            remaked_URL = f"https://m.land.naver.com/cluster/clusterList?view=atcl&cortarNo={cortarNo}&rletTpCd={rletTpCds}&tradTpCd={tradTpCds}&z={z}&lat={lat}&lon={lon}&btm={btm}&lft={lft}&top={top}&rgt={rgt}&wprcMax={wprcMax}&rprcMax={rprcMax}"

            res2 = requests.get(remaked_URL, headers={'User-agent':'Mozilla/5.0'})
            json_str = json.loads(json.dumps(res2.json()))
            values = json_str['data']['ARTICLE']

            # 큰 원으로 구성되어 있는 전체 매물그룹(values)을 load 하여 한 그룹씩 세부 쿼리를 진행합니다.
            cnt = 0
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
                        if atcl['prc'] > 600: continue
                        if atcl['rentPrc'] > 40: continue
                        result_list.append(atcl)

            # pandas 모듈을 이용해 크롤링한 결과를 dataframe 형식으로 변환합니다.
            df = pd.json_normalize(result_list)
            # csv 파일에 데이터를 저장합니다. (수정모드)
            df.to_csv('naver_crawling.csv', mode='a', header=False, index=False, encoding='UTF-8')

    except:
        # pandas 모듈을 이용해 크롤링한 결과를 dataframe 형식으로 변환합니다.
        df = pd.json_normalize(result_list)
        # csv 파일에 데이터를 저장합니다. (수정모드)
        df.to_csv('naver_crawling.csv', mode='a', header=False, index=False, encoding='UTF-8')



if __name__ == "__main__":
    main()

