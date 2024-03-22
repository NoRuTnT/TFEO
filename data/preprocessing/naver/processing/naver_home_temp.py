import csv

file = open('../data/naver_home_ansi.csv', 'r', encoding='ANSI')
fReader = csv.reader(file)
data_csv = []
for line in fReader:
    data_csv.append(line)
file.close()
print(data_csv)


newFile = open('../data/naver_home_utf8.csv', 'w', encoding='UTF8', newline='')
writer = csv.writer(newFile)
writer.writerows(data_csv)
newFile.close()
