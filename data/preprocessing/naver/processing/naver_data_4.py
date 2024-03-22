import csv
import random
from random import randrange
from kiwipiepy import Kiwi

file = open('../data/naver_3_utf8.csv', 'r', encoding='UTF8')
fReader = csv.reader(file)
data_csv = []
kiwi = Kiwi()

for line in fReader:
    data = []

    if line[0] == 'atclNm':
        data.append("type")                 # 0
        data.append("floor")                # 1
        data.append("rent")                 # 2
        data.append("spc1")                 # 3
        data.append("spc2")                 # 4
        data.append("lat")                  # 5
        data.append("lng")                  # 6
        # data.append("introduce")
        data.append("toilet")               # 7
        data.append("station")              # 8
        data.append("parking")              # 9
        # ---
        data.append("internet")             # 10
        data.append("gas")                  # 11
        data.append("washing_machine")      # 12
        data.append("air_conditioner")      # 13
        data.append("refrigerator")         # 14
        data.append("elevator")             # 15
        data.append("microwave")            # 16
        data.append("breakfast")            # 17
        data.append("heating")              # 18
        data.append("move_in_date")         # 19
        data.append("sink")                 # 20
        data.append("introduce")
        data_csv.append(data)
    else:
        # 매물 type
        data.append(line[0])

        # 층수
        data.append(line[1])

        # 월세
        data.append(line[2])

        # 전체 면적
        data.append(line[3])

        # 전용 면적
        data.append(line[4])

        # 위도
        data.append(line[5])

        # 경도
        data.append(line[6])

        # 화장실
        data.append(line[8])

        # 역세권
        data.append(line[9])

        # 주차 가능
        data.append(line[10])

        data.append(0)  # 10 인터넷
        data.append(0)  # 11
        data.append(0)  # 12
        data.append(0)  # 13
        data.append(0)  # 14
        data.append(0)  # 15
        data.append(0)  # 16
        data.append(0)  # 17
        data.append(0)  # 18
        data.append(0)  # 19
        data.append(0)  # 20
        data.append(line[7])

        # 태그 분석
        if line[7] =='':
            data[10] = randrange(0,2,1)
            data[11] = randrange(0,2,1)
            data[12] = randrange(0,2,1)
            data[13] = randrange(0,2,1)
            data[14] = randrange(0,2,1)
            data[15] = randrange(0,2,1)
            data[16] = randrange(0,2,1)
            data[17] = randrange(0,2,1)
            data[18] = randrange(0,2,1)
            data[19] = randrange(0,2,1)
            data[20] = randrange(0,2,1)
        else:
            tokens = kiwi.tokenize(line[7], split_complex=False)
            data[17] = randrange(0,2,1)
            for token in tokens:
                val = token.form
                if "풀" in val or "리모델링" in val or "신축":
                    data[7] = data[10] = data[11] = data[12] = data[13] = data[14] = data[15] = data[16] = data[19] = data[20] = 1
                if val == "인터넷":
                    data[10] = 1
                if "가스" in val or "난방" in val:
                    data[11] = data[18] = 1
                if "세탁" in val:
                    data[12] = 1
                if val == "에어컨" or "냉" in val:
                    data[13] = 1
                if val == "냉장고":
                    data[14] = 1
                if val == "엘리베이터" or val == "엘베":
                    data[15] = 1
                if val == "전자렌지" or val == "전자레인지":
                    data[16] = 1
                if "즉시" in val or ("입주" in val and "중순" not in val and "협의" not in val):
                    data[19] = 1
                if "씽크대" in val or "싱크대" in val:
                    data[20] = 1
                if "주차" in val:
                    data[9] = 1

        data_csv.append(data)





file.close()
print(data_csv)


newFile = open('../data/naver_4_utf8.csv', 'w', encoding='UTF8', newline='')
writer = csv.writer(newFile)
writer.writerows(data_csv)
newFile.close()
