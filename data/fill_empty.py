
import pandas as pd


if __name__ == '__main__':
    print('결측치 문제 해결')


    df = pd.read_csv('backend/CSV_Data/naver_home_utf8.csv', encoding='UTF-8')
    df_filled = df.fillna('empty')
    df_filled.to_csv('backend/CSV_Data/naver_home_utf8.csv', index=False)

    df = pd.read_csv('backend/CSV_Data/naver_home_option.csv', encoding='UTF-8')
    df_filled = df.fillna('empty')
    df_filled.to_csv('backend/CSV_Data/naver_home_option.csv', index=False)

    df = pd.read_csv('backend/CSV_Data/naver_home_merged.csv', encoding='UTF-8')
    df_filled = df.fillna('empty')
    df_filled.to_csv('backend/CSV_Data/naver_home_merged.csv', index=False)

    # df = pd.read_csv('backend/CSV_Data/naver_home_merged.csv', encoding='UTF-8')
    # print(df)
    # for idx in enumerate(df):
    #     print(df.loc[idx])