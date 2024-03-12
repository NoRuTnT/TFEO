
# 강남구, 용산구, 송파구, 서초구는
# 기존 데이터 셋의 평균을 상회하는 매매가격 때문에
# 데이터 수집 대상에서 제회
seoul_rent_list = {
    "성동구" : [1000, 70],
    "마포구" : [900, 60],
    "광진구" : [900, 60],
    "양천구" : [900, 60],
    "동작구" : [800, 60],
    "종로구" : [800, 60],
    "강동구" : [800, 60],
    "영등포구" : [800, 60],
    "중구" : [800, 60],
    "강서구" : [700, 50],
    "서대문구" : [700, 40],
    "동대문구" : [600, 40],
    "은평구" : [600, 40],
    "성북구" : [600, 40],
    "노원구" : [600, 40],
    "관악구" : [600, 40],
    "구로구" : [600, 40],
    "중랑구" : [500, 30],
    "금천구" : [500, 30],
    "강북구" : [500, 30],
    "도봉구" : [500, 30]
}
seoul_geocode_list = {
	"동대문구": ["wydnp", "wydmg"],
	"도봉구": ["wydq6"],
	"노원구": ["wydq7", "wydq5", "wydqh"],
	"은평구": ["wydq0", "wydjz"],
	"성북구": ["wydq1", "wydmf"],
	"강북구": ["wydq4"],
	"강서구": ["wydjv", "wydjt", "wydjw"],
	"영등포구": ["wydjx", "wydjr"],
	"구로구": ["wydjm", "wydjq"],
	"금천구": ["wydjp"],
	"서대문구": ["wydmb"],
	"종로구": ["wydmc"],
	"중랑구": ["wydmu"],
	"마포구": ["wydm8"],
	"중구": ["wydm9"],
	"성동구": ["wydmd", "wydme"],
	"강동구": ["wydmt"],
	"동작구": ["wydm2", "wydm3"],
	"관악구": ["wydm0", "wydm1"],
}

def main():
    for gu in seoul_geocode_list:
        for geocode in gu.values():
            print(geocode)
        print("-------")

if __name__ == "__main__":
    main()


# # wydn : 가장 가장자리 하나의 격자(용두동)만 포함
# wydnp : 동대문구
# # wydq
# wydq6 : 도봉구
# wydq7 : 노원구
# wydq0 : 은평구
# wydq1 : 성북구
# wydq4 : 강북구
# wydq5 : 노원구
# wydqh : 노원구
# # wydj : 부천일대, 강서쪽 포함
# wydjv : 강서구
# wydjz : 은평구
# wydjt : 강서구
# wydjw : 강서구
# wydjx : 영등포구
# wydjm : 구로구
# wydjq : 구로구
# wydjr : 영등포구
# wydjp : 금천구
# # wydm : 서울 중심부
# wydmb : 서대문구
# wydmc : 종로구
# wydmf : 성북구
# wydmg : 동대문구
# wydmu : 중랑구
# wydm8 : 마포구
# wydm9 : 중구
# wydmd : 성동구
# wydme : 성동구
# wydms : 송파구
# wydmt : 강동구
# wydm2 : 동작구
# wydm3 : 동작구
# wydm6 : 강남구
# wydm7 : 송파구
# wydmk : 송파구
# wydm0 : 관악구
# wydm1 : 관악구
# wydm4 : 서초구
# wydm5 : 서초구
# wydmh : 강남구