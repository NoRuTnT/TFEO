import csv

file = open('../data/naver_home_utf8.csv', 'r', encoding='UTF8')
fReader = csv.reader(file)
data_csv = []
for line in fReader:
    data_csv.append(line)
file.close()
print(data_csv)


newFile = open('../data/naver_home_ansi.csv', 'w', encoding='ANSI', newline='')
writer = csv.writer(newFile)
writer.writerows(data_csv)
newFile.close()
