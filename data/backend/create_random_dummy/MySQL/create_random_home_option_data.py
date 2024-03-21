import random
import csv


host_schema = (
    ("id", "INT"),
    ("username", "VARCHAR(255)"),
    ("age", "INT"),
    ("email", "VARCHAR(255)")
)





# intro_extro = ['Extroversion', 'Introversion']
# intro_extro_weight = [52.1, 47.8]



boolean = [True, False]

# 출처 : 2022 국가지표체계
smoking_weight = [17.7, 82.3] # 흡연 | 비흡연
# 출처 : 2022 농림축산식품부
pet_weight = [25.4, 74.6]
clean_weight = [0.5, 0.5]
daytime_weight = [0.5, 0.5]
nighttime_weight = [0.5, 0.5]
# 출처 : 2022 어세스타 자료 (E/I)
intro_weight = [47.8, 52.1]
extro_weight = [52.1, 47.8]
cold_weight = [0.5, 0.5]
hot_weight = [0.5, 0.5]
no_touch_weight = [0.5, 0.5]

# host 나이 기준은 얼마?? (보통은)60세 이상으로

if __name__ == '__main__':
    print('집별 옵션 데이터 생성')
    data_number = int(input())

    print('data생성 시작')
    # 주의
    # 이미 csv 데이터가 존재하는 상태에서 프로그램을 작동시키면
    # 아래에 추가로 더미데이터가 기입됨
    f = open('host_info.csv', 'a', encoding='UTF-8', newline='')
    wr = csv.writer(f)
    for i in range(data_number):
        host_personality_no = i+1
        smoke = random.choices(boolean, weights=smoking_weight)
        pet= random.choices(boolean, weights=pet_weight)
        clean = random.choices(boolean, weights=clean_weight)
        daytime = random.choices(boolean, weights=daytime_weight)
        nighttime = random.choices(boolean, weights=nighttime_weight)
        extrovert = random.choices(boolean, weights=extro_weight)
        introvert = random.choices(boolean, weights=intro_weight)
        cold = random.choices(boolean, weights=cold_weight)
        hot = random.choices(boolean, weights=hot_weight)
        no_touch = random.choices(boolean, weights=no_touch_weight)
        wr.writerow([host_personality_no, smoke[0],
                     pet[0], clean[0], daytime[0], nighttime[0],
                     extrovert[0], introvert[0], cold[0], hot[0],
                     no_touch[0]])
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