import csv
import requests

# kakao api (도로명주소)
url = "https://dapi.kakao.com/v2/local/geo/coord2address.json"
REST_API_KEY = "b5d75b7ac5b0138157e2ee46717e396c"
headers = {"Authorization": "KakaoAK {}".format(REST_API_KEY)}

file = open('../data/naver_home_utf8.csv', 'r', encoding='UTF8')
fReader = csv.reader(file)
data_csv = []
header = ["si","sgg","emd","ro","detail","rent","lat","lng","introduce","address"]
data_csv.append(header)
idx = 0
for line in fReader:
    data = [''] * 10
    if idx == 0:
        idx += 1
        continue
    idx += 1
    params = {
        "x": line[7],
        "y": line[6],
        "input_coord": "WGS84"
    }
    response = requests.get(url, params=params, headers=headers)
    documents = response.json().get("documents")[0]
    print(documents)
    if len(documents) > 0:
        road_address = documents.get("road_address")
        if road_address is None:
            data_csv.append(line)
        else:
            data[0] = line[0]
            data[1] = line[1]
            data[2] = line[2]
            data[3] = line[3]
            data[9] = documents.get("address").get("address_name")
            data[4] = line[4]
            data[5] = line[5]
            data[6] = line[6]
            data[7] = line[7]
            data[8] = line[8]
            data_csv.append(data)
file.close()
print(data_csv)


newFile = open('../data/naver_home_ansi.csv', 'w', encoding='ANSI', newline='')
writer = csv.writer(newFile)
writer.writerows(data_csv)
newFile.close()