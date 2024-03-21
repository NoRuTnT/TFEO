import csv
from random import randrange

file = open('../data/naver_2_utf8.csv', 'r', encoding='UTF8')
fReader = csv.reader(file)
data_csv = []

for line in fReader:
    data = []

    if line[0] == 'atclNm':
        data.append(line[0])
        data.append(line[1])
        data.append(line[2])
        data.append(line[3])
        data.append(line[4])
        data.append(line[5])
        data.append(line[6])
        data.append(line[7])
        data.append("toilet")       # 8
        data.append("station")      # 9
        data.append("parking")      # 10

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

        # 소개
        data.append(line[7])

        # 태그 분석
        if line[8] =='':
            data.append(0)
            data.append(0)
            data.append(0)
        else:
            tags = line[8].split("['")[1].split("']")[0].split("', '")
            print(tags)
            # 개인화장실여부
            if '화장실한개' in tags:
                data.append(1)
            else:
                data.append(0)

            # 역세권여부
            if '역세권' in tags:
                data.append(1)
            else:
                data.append(0)

            # 주차가능여부
            if '소형평수' in tags:
                data.append(1)
            else:
                data.append(0)

        data_csv.append(data)





file.close()
print(data_csv)


newFile = open('../data/naver_3_utf8.csv', 'w', encoding='UTF8', newline='')
writer = csv.writer(newFile)
writer.writerows(data_csv)
newFile.close()
