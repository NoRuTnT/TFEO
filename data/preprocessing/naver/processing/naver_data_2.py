import csv
from random import randrange

file = open('../data/naver_1_utf8.csv', 'r', encoding='UTF8')
fReader = csv.reader(file)
data_csv = []

for line in fReader:
    data = []

    if line[0] == 'atclNm':
        data.append(line[0])
        data.append(line[2])
        data.append(line[3])
        data.append(line[4])
        data.append(line[5])
        data.append(line[6])
        data.append(line[7])
        data.append(line[8])
        data.append(line[9])
        data_csv.append(data)
    else:
        # 매물 type
        if line[0] == "일반원룸":
            data.append("OR")
        elif line[0] == "빌라":
            data.append("VL")
        elif line[0] == "단독" or line[0] == "다가구":
            data.append("DDDGG")
        elif line[0] == "오피스텔":
            data.append("OPST")
        else:
            if line[1] == "원룸":
                data.append("OR")
            elif line[1] == "단독/다가구":
                data.append("DDDGG")
            elif line[1] == "빌라":
                data.append("VL")
            elif line[1] == "오피스텔":
                data.append("OPST")
            else:
                data.append("APT")

        # 매물 층수 (상세 주소)
        c = line[2].split('/')[0]
        if (c == '저'):
            data.append(randrange(1, 3, 1))
        elif (c == '중'):
            data.append(randrange(3, 5, 1))
        elif (c == '고'):
            data.append(randrange(5, 7, 1))
        else:
            data.append(c)


        # 월세
        data.append(line[3])

        # 전체 면적
        data.append(line[4])

        # 전용 면적
        data.append(line[5])

        # 위도
        data.append(line[6])

        # 경도
        data.append(line[7])

        # 소개
        data.append(line[8])

        # 태그 리스트
        data.append(line[9])

        data_csv.append(data)





file.close()
print(data_csv)


newFile = open('../data/naver_2_ansi.csv', 'w', encoding='ANSI', newline='')
writer = csv.writer(newFile)
writer.writerows(data_csv)
newFile.close()
