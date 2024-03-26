import json

# officetel_url = 'data/officetel.json'  # 오피스텔 정보 json파일 저장 위치
officetel_url = 'data/oneroom_cpy.json'  # 오피스텔 정보 json파일 저장 위치



list = ['data/officetel.json', 'data/oneroom.json' 'data/aparts.json', 'data/villa.json']

if __name__ == '__main__':
    with open(officetel_url, "r", encoding='UTF-8') as f:
        j_str = f.read()
        data = json.loads(j_str)
        print(len(data))
        # print(data)
