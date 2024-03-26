import random
import csv


home_image_schema = (
    ("home_image_no", "BIGINT"),
    ("home_image_url", "VARCHAR"),
    ("home_no", "BIGINT")
)

if __name__ == '__main__':
    print('home_image_url 더미데이터 생성')
    data_number = int(input())

    print('data생성 시작')
    # 주의
    # 이미 csv 데이터가 존재하는 상태에서 프로그램을 작동시키면
    # 아래에 추가로 더미데이터가 기입됨
    f = open('data_csv/home_image_url_info.csv', 'a', encoding='UTF-8', newline='')
    wr = csv.writer(f)
    for i in range(data_number):
        home_image_no = i+1
        home_image_url = '나중에 url형식에 맞게'
        home_no = home_image_no

        wr.writerow([home_image_no, home_image_url, home_no])
    f.close()

# host_personality_no : int
# smoke : bool
# pet : bool
# clean : bool
# daytime : bool
# nighttime : bool
# extrovert : bool
# introvert : bool
# cold : bool
# hot : bool
# no_touch : bool