import requests
import pandas as pd

all_houses = []  # 모든 데이터를 저장할 리스트

# pageIndex를 1부터 20까지 증가시키면서 데이터 요청
for pageIndex in range(1, 21):
    url = f'https://api.peterpanz.com/houses/area?zoomLevel=10&center=%7B%22y%22:37.4714536,%22_lat%22:37.4714536,%22x%22:126.9565359,%22_lng%22:126.9565359%7D&dong=&gungu=&filter=latitude:37.107082~37.8340576%7C%7Clongitude:126.7292562~127.1838156%7C%7CcheckMonth:999~700000%7C%7CcontractType;%5B%22%EC%9B%94%EC%84%B8%22%5D%7C%7CbuildingType;%5B%22%EB%B9%8C%EB%9D%BC/%EC%A3%BC%ED%83%9D%22%5D&&pageSize=90&pageIndex={pageIndex}&order_id=1710141379&search=&filter_version=5.1&response_version=5.2&order_by=random'
    response = requests.get(url)
    json_data = response.json()

    # 'houses' 키 아래 있는 데이터 추출 (JSON 구조에 따라 경로를 조정해야 할 수 있음)
    # 이 예에서는 'withoutFee' -> 'image' 경로를 예상하고 있지만, 실제 경로는 API 응답 구조에 따라 다를 수 있습니다.
    houses = json_data.get("houses", {}).get("withoutFee", {}).get("image", [])
    if houses:
        all_houses.extend(houses)
    else:
        break  # 데이터가 없으면 반복 중단

# pandas DataFrame으로 변환
df = pd.json_normalize(all_houses)

# 일부 중요한 컬럼을 선택하여 CSV 파일로 저장 (필요한 컬럼에 따라 변경 가능)
df.to_csv('houses.csv', index=False, encoding='utf-8-sig')

print("CSV 파일 저장 완료")
