import csv
import requests

# kakao api (도로명주소)
url = "https://dapi.kakao.com/v2/local/geo/coord2address.json"
REST_API_KEY = "b5d75b7ac5b0138157e2ee46717e396c"
headers = {"Authorization": "KakaoAK {}".format(REST_API_KEY)}

file = open('../data/naver_data_final_utf8.csv', 'r', encoding='UTF8')
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
        "x": line[6],
        "y": line[5],
        "input_coord": "WGS84"
    }
    response = requests.get(url, params=params, headers=headers)
    documents = response.json().get("documents")[0]
    print(documents)
    if len(documents) > 0:
        road_address = documents.get("road_address")
        if road_address is None:
            address = documents.get("address").get("address_name")
            data[0] = address.get("region_1depth_name")
            data[1] = address.get("region_2depth_name")
            data[2] = address.get("region_3depth_name")
            data[9] = address.get("address_name")
        else:
            data[0] = road_address.get("region_1depth_name")
            data[1] = road_address.get("region_2depth_name")
            data[2] = road_address.get("region_3depth_name")
            data[3] = road_address.get("road_name") + " " + road_address.get("main_building_no")
            data[9] = road_address.get("address_name")
    data[4] = line[1]
    data[5] = line[2]
    data[6] = line[5]
    data[7] = line[6]
    data[8] = line[21]
    data_csv.append(data)
file.close()
print(data_csv)


newFile = open('../data/naver_home_utf8=.csv', 'w', encoding='UTF8', newline='')
writer = csv.writer(newFile)
writer.writerows(data_csv)
newFile.close()
