import json
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

if __name__ == "__main__":
    seoul_geocode_json = json.dumps(seoul_geocode_list, indent=4, ensure_ascii=False)
    print(seoul_geocode_json)
    # main()