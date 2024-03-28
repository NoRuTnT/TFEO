import numpy as np

from sklearn.metrics.pairwise import cosine_distances

features = ['keywords', 'cast', 'genres', 'director']
client_vector = [] # 학생 정보를 추출해서 만든 벡터
host_vector = [] # host+주택에 대한 정보를 추출해서 만든 벡터



class Recommendation:
    def __init__(self):
        print('.')


# 코사인 기반 추천 알고리즘 구현
def get_most_fit_one():
    X = [[0, 0, 0], [1, 1, 1]]
    Y = [[1, 0, 0], [1, 1, 0]]
    XX = np.array([1, 3, 5, 7, 9]).reshape(1, -1)
    YY = np.array([9, 7, 5, 3, 1]).reshape(1, -1)
    # YY = np.array([[9, 7, 5, 3, 1], [9, 7, 5, 3, 1]])
    # print(cosine_distances(X, Y))
    print(cosine_distances(XX, YY))

    # 추천해주려는사용자_vector = [5, 5.2, 3]
    # 추천상품리스트_vector = [[1, 2, 3],[1, 2, 4],[2, 2, 2], [2, 3, 2]]

    ######################################################

    # 사용자 벡터와 상품 벡터
    user_vector = np.array([2, 3, 7])
    print(user_vector)
    item_vectors = np.array([[1, 3, 4], [2, 3, 4], [7, 7, 9]])

    s1 = np.array([1,1,1,0,1])
    s2 = np.array([1,1,0,1,1])
    s3 = np.array([1,2,2,0,1])


if __name__ == '__main__':
    get_most_fit_one()