import requests
import json

def main():
    seoul_north = 37.701749
    url = "https://apis.zigbang.com/v2/aparts/items?domain=zigbang&geohash={wydm}"
    req = requests.get(url)
    items = req.json()
    # print(items)
    # JSON을 인덴트하여 출력
    json_str = json.dumps(items, indent=4)
    print(len(items))
    print(json_str)

if __name__ == "__main__":
    main()

