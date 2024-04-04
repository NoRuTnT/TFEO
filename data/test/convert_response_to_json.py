import requests
import json

def convert(request_url):
    req=requests.get(request_url)
    items=req.json()
    json_str = json.dumps(items, indent=4)
    json_str = json_str.encode().decode("unicode_escape") # 인코딩 형식 변환
    print(json_str)

def main():
    # 여기에 API 호출을 위한 URL request를 입력
    url = "https://apis.zigbang.com/v2/aparts/items?domain=zigbang&geohash={wydm}"
    url2 = "https://apis.zigbang.com/apt/locals/prices/on-danjis?minPynArea=10%ED%8F%89%EC%9D%B4%ED%95%98&maxPynArea=60%ED%8F%89%EB%8C%80%EC%9D%B4%EC%83%81&geohash=wydm3"
    url3 = "https://apis.zigbang.com/v2/aparts/items?domain=zigbang&geohash=wydm"
    # convert(url)
    # convert(url2)
    convert(url3)

if __name__ == "__main__":
    main()