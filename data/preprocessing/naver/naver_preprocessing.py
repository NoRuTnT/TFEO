import csv
import mysqlDbQuery


# dbConn = mysqlDbQuery.mysqlDbConnection('root', '1q2w3e', '127.0.0.1', 3306, 'sample')
# cursor = dbConn.cursor()

file = open('./naver_home_option.csv','r',encoding='UTF8')
fReader = csv.reader(file)

for line in fReader:
    # 건축물 종류 3번째 칼럼
    if line[2] == "일반원룸": line[2] = "OR"
    elif line[2] == "빌라": line[2] = "VL"
    elif line[2] == "단독" or line[2] == "다가구": line[2] = "DDDGG"
    elif line[2] == "오피스텔": line[2] = "OPST"
    else:
        if line[6] == "원룸": line[2] = "OR"
        elif line[6] == "단독/다가구": line[2] = "DDDGG"
        elif line[6] == "빌라": line[2] = "VL"
        elif line[6] == "오피스텔": line[2] = "OPST"
        else: line[2] = "APT"

    # 보증금 prc 12

    # 월세 rentPrc13

    # 위도 lat 19
    # 경도 lng 20
    # 소개 atclFetrDesc 21


# file.close()

# dbConn.commit()
# cursor.close()
# mysqlDbQuery.mysqlDbClose(dbConn)