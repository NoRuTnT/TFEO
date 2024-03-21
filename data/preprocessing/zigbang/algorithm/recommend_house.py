import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

from sklearn.metrics.pairwise import cosine_distances
from sklearn.feature_extraction.text import TfidfVectorizer

features = ['keywords', 'cast', 'genres', 'director']

# 코사인 기반 추천 알고리즘 구현
def get_most_fit_one():
    X = [[0, 0, 0], [1, 1, 1]]
    Y = [[1, 0, 0], [1, 1, 0]]
    Z = [[1, 1, 1], [1, 1, 1]]
    W = [[1, 1, 1], [1, 1, 1]]
    print(cosine_distances(X, Y))
    print(cosine_distances(Z, W))









if __name__ == '__main__':
    get_most_fit_one()