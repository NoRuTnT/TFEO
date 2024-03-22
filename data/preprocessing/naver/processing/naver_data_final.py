import csv
from random import randrange
from kiwipiepy import Kiwi

file = open('../data/naver_4_utf8.csv', 'r', encoding='UTF8')
fReader = csv.reader(file)
data_csv = []
kiwi = Kiwi()
idx = 0
for line in fReader:
    data = []

    if idx < 500 or idx > 507:
        data.append(line[0])                 # 0
        data.append(line[1])                # 1
        data.append(line[2])                 # 2
        data.append(line[3])                 # 3
        data.append(line[4])                 # 4
        data.append(line[5])                  # 5
        data.append(line[6])                  # 6
        # data.append("introduce")
        data.append(line[7])               # 7
        data.append(line[8])              # 8
        data.append(line[9])              # 9
        # ---
        data.append(line[10])             # 10
        data.append(line[11])                  # 11
        data.append(line[12])      # 12
        data.append(line[13])      # 13
        data.append(line[14])         # 14
        data.append(line[15])             # 15
        data.append(line[16])            # 16
        data.append(line[17])            # 17
        data.append(line[18])              # 18
        data.append(line[19])         # 19
        data.append(line[20])                 # 20
        data.append(line[21])
    else:
        data.append(line[0])  # 0
        data.append(line[1])  # 1
        data.append(line[2])  # 2
        data.append(line[3])  # 3
        data.append(line[4])  # 4
        data.append(line[5])  # 5
        data.append(line[6])  # 6
        # data.append("introduce")
        data.append(line[7])  # 7
        data.append(line[8])  # 8
        data.append(line[9])  # 9
        # ---
        data.append(line[10])  # 10
        data.append(line[11])  # 11
        data.append(line[12])  # 12
        data.append(line[13])  # 13
        data.append(line[14])  # 14
        data.append(line[15])  # 15
        data.append(line[16])  # 16
        data.append(line[17])  # 17
        data.append(line[18])  # 18
        data.append(line[19])  # 19
        data.append(line[20])  # 20
        data.append('')
    idx += 1
    if idx != 1:
        if data[3] == "-":
            data[3] = data[4]
        if float(data[3]) < float(data[4]):
            temp = data[3]
            data[3] = data[4]
            data[4] = temp

    data_csv.append(data)




file.close()
print(data_csv)


newFile = open('../data/naver_data_final_utf8.csv', 'w', encoding='UTF8', newline='')
writer = csv.writer(newFile)
writer.writerows(data_csv)
newFile.close()
