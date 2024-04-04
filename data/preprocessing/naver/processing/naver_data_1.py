import csv

file = open('../data/naver_crawling.csv', 'r', encoding='UTF8')
fReader = csv.reader(file)
data_csv = []

for line in fReader:
    data = []
    data.append(line[2])  # 건축물 종류
    data.append(line[6])  # 건축물 종류
    data.append(line[10]) # 층수
    data.append(line[12]) # 월세
    data.append(line[14]) # 전체 면적
    data.append(line[15]) # 실제 면적

    if line[18] == 'lat':
        data.append(line[18])  # 위도 21
        data.append(line[19])  # 경도 22
        data.append(line[20])  # 소개 23
        data.append(line[21])  # 태그 리스트 24
        data_csv.append(data)
    else:
        try:
            float(line[18])
            data.append(line[18])  # 위도 21
            data.append(line[19])  # 경도 22
            data.append(line[20])  # 소개 23
            data.append(line[21])  # 태그 리스트 24
        except:
            data.append(line[21])  # 위도 21
            data.append(line[22])  # 경도 22
            data.append(line[23])  # 소개 23
            data.append(line[24])  # 태그 리스트 24
        data_csv.append(data)





file.close()
print(data_csv)


newFile = open('../data/naver_1_utf8.csv', 'w', encoding='UTF8', newline='')
writer = csv.writer(newFile)
writer.writerows(data_csv)
newFile.close()