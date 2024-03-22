import csv

file = open('../data/naver_data_final_utf8.csv', 'r', encoding='UTF8')
fReader = csv.reader(file)
data_csv = []
for line in fReader:
    data = [line[10],line[11],line[12],line[13],line[14],
            line[15],line[16],line[17],line[7],line[18],
            line[9],line[8],line[19],line[20],line[0]]
    data_csv.append(data)
file.close()
print(data_csv)


newFile = open('../data/naver_home_option.csv', 'w', encoding='UTF8', newline='')
writer = csv.writer(newFile)
writer.writerows(data_csv)
newFile.close()
