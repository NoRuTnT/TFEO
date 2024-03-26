import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

from sklearn.metrics.pairwise import cosine_distances
from sklearn.feature_extraction.text import TfidfVectorizer

features = ['keywords', 'cast', 'genres', 'director']
client_vector = [] # 학생 정보를 추출해서 만든 벡터
host_vector = [] # host+주택에 대한 정보를 추출해서 만든 벡터

# 코사인 기반 추천 알고리즘 구현
def get_most_fit_one():
    X = [[0, 0, 0], [1, 1, 1]]
    Y = [[1, 0, 0], [1, 1, 0]]
    print(cosine_distances(X, Y))






if __name__ == '__main__':
    get_most_fit_one()