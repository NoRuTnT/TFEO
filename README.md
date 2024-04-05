# 🏠 스물다섯 여든하나 (빅데이터 추천 기반 대학생 - 어르신 주거 연계 통합 서비스)

# 🏠 서비스 개요

### ✏ 서비스 설명

- '스물다섯 여든하나'는 대학생, 어르신들의 성향과 집 옵션을 기반으로 한 추천 알고리즘을 적용해 룸 쉐어링 신청부터 추천 그리고 계약서 작성까지 한번에 진행할 수 있도록 하는
대학생 - 어르신 주거 연계 통합 서비스입니다. 
- 컨텐츠 기반 필터링을 통한 맞춤 집 추천부터 계약서 생성 자동화를 통한 손 쉬운 계약 진행, 기존 활동 인증 체계를 개선한 서로의 니즈를 충족하는 기능을 제공함으로써
복잡했던 룸 쉐어링 사업의 시행을 간소화 하였습니다.

### 기획배경

한국보다 고령화 문제가 사회적 문제로 먼저 대두된 일본의 설문조사에서, 
독거 노인 중 78%가 외로움을 가장 큰 문제라고 뽑았습니다. 
설문조사 대상 일본 어르신들은 동일 세대와의 교류도 이 외로움을 달래기 위한 좋은 방법이지만, 손자 혹은 손녀 등 특히 다른 세대와 교류할 때 
조금 더 외로움 해소에 도움이 된다고 응답했습니다.

다음은 일본 학생 인터뷰 중 일부입니다.

"우리가 만난 어르신들은 젊은 세대들이 어르신들과 같은 눈높이에서 대화를 나누는 것만으로도 기뻐했습니다. 
기존의 요양보호사나 간병인들과는 또 다른 형태로 어르신들에게 다가갈 수 있는 서비스가 절실히 필요하다는 생각이 들었습니다."

현재 한국에서도 '디지털소외계층'이란 말을 통해 미루어볼 수 있듯이,
노년층이 빠른 디지털 전환 속도를 따라가지 못하고 젊은 세대와의 교류가 끊기는 경우가 다반사이며 
고령화로 인한 문제들이 수면 위로 드러나고 있습니다. 서울시는 '한지붕세대공감' 사업을 통해 약 10년간 학생들과 어르신들의 주거 연계 지원하고 있지만,
복잡한 사업 신청 절차와 학생들과 어르신들의 성향 매칭의 어려움으로 인해 큰 성공을 거두기 어려웠습니다. 

이에 우리 팀은 서울시가 진행하는 '한지붕세대공감' 정책 문제점을 개선한 이 서비스를 기획하게 되었습니다.

### 기존 서비스의 문제점

- 사업 신청 시, 집 정보 미공개로 인해 학생들이 선택할 수 있는 기회를 제공 받지 못하고 있습니다.
- 학생과 어르신의 성향을 반영한 매칭의 어려움으로 인해 학생과 어르신 간 갈등 상황이 빈번히 발생하고 있습니다.
- 코디네이터를 통한 복잡한 집 등록 절차로 인해 어르신들의 사업 참여율이 저조합니다.
- 계약 과정이 번거롭고 계약 이후의 지속적인 모니터링 환경이 부족합니다.
- 지자체마다 별도로 운영되고 있는 플랫폼으로 인해 관리가 효율적으로 이루어지지 않고 있습니다.

### ✏ 타겟

- 학기 중 대학 주변에 자취방을 구하기 어려운 대학생
- 보증금이 없는 저렴한 월세로 쾌적한 환경의 집에서 거주하고 싶은 대학생
- 텅빈 집에서 외로움을 느끼는 자가를 소유한 노년층
- 젊은 세대와 소통을 하고 싶은 노년층

### ✏ 기대 효과

- 성향을 반영한 매칭 및 추천을 통해 대학생과 노년층의 원만한 홈쉐어링
- 노년층의 우울감 해소 및 디지털정보격차 완화
- 청년 주거 비용 및 환경 문제 해결
- 지속적인 모니터링 환경 제공으로 홈쉐어링 시 발생할 수 있는 문제 상황 인지 및 조치
- 통합 플랫폼 구축으로 지자체별 사업 진행 혼선 방지

# 🏠 프로젝트 산출물

### ✏ 요구사항 정의서

- 아이디어 기획 및 구체화 단계에서 요구사항 정의
- 우선순위 지정 후 기능 확정

### ✏ Wireframe

- Figma 활용 UI/UX 디자인 진행
- 기능 develop

![캡처1](/uploads/7192ff87ce9583950f2eaeb560cb1376/캡처1.PNG)

### ✏ ER-Diagram

- ERD Cloud 활용

![캡처](/uploads/fb103e234abc95c5601571eaa02359df/캡처.PNG)

### ✏ System Architecture

- Jenkins CI/CD pipeline
- Nginx
- Docker

![인프라구조도](https://github.com/NoRuTnT/Dotori/assets/114069644/b8a661e2-85d4-4ac6-a863-0699a7eee73b)

# 🏠 프로젝트 진행

### ✏ Notion

- 프로젝트 관련 학습 내용과 논의 내용을 notion 에 작성하여 문서 관리

### ✏ Jira

- 프로젝트 일정 관리
- 이슈 발행 및 담당자 지정
  - 매주 스프린트 시작 전 백로그에 이슈 등록
  - 소요 시간 별 스토리 포인트 지정
  - 하위 작업 등록을 통한 세부 일정 관리
- 스프린트 번다운 차트 활용

### ✏ Git

- 팀 Notion에 Git 행동 강령과 Commit convention 작성, 공유

![캡처2](/uploads/b1f4623be4360145c8a76482844fe2c2/캡처2.PNG)

- 작업 브랜치 전략

```
master - develop - feature - backend - 기능
                           - frontend
                           - data
```

# 🏠 서비스 화면 및 기능 소개

### 👪 랜딩 및 로그인 페이지

### 🧓 메인 홈 페이지
#### 🧓 지도
- 지도 상 위치 및 헤더 필터, 상세 필터 기반 집 추천

![집추천1](/uploads/5b16b75d1a86f3bc4350e2f9a83ed280/집추천1.png)
![집추천2](/uploads/12793bf9311a22c83d0da170fa5a5120/집추천2.png)

#### 🧓 집 추천
- 집 리스트 지도와 연동

![집추천3](/uploads/51a5bcb48bef1c4bb70297ac952cdefd/집추천3.png)
![집추천4](/uploads/c5890160944adc9ab6c841d7d5a292cd/집추천4.png)

### 🧓 집 신청 및 집 상세 정보
- 집 옵션 및 호스트 정보 조회

![리드미1](https://github.com/NoRuTnT/Dotori/assets/114069644/22260ef8-9381-4dba-abb7-c6f502eea37d)
![리드미2](https://github.com/NoRuTnT/Dotori/assets/114069644/d01f48bd-27f7-4b08-b413-533c67e16c0a)

### 🧓 계약 진행
- 집 계약 신청

![리드미3](https://github.com/NoRuTnT/Dotori/assets/114069644/154abe0f-14cc-4945-8534-54fb31b030e4)
![리드미4](https://github.com/NoRuTnT/Dotori/assets/114069644/0ea3b694-c631-46b4-93ff-ea2ec539fb39)

- 계약서 확인

![리드미5](https://github.com/NoRuTnT/Dotori/assets/114069644/25ad16ee-353d-4d86-8a63-2e766bd80cf4)
![리드미6](https://github.com/NoRuTnT/Dotori/assets/114069644/47da2806-5def-48c1-9a31-3fc651b8da70)

![리드미7](https://github.com/NoRuTnT/Dotori/assets/114069644/5c679a92-7a62-4cd8-8085-dace39dbbe58)

-계약서 서명 및 생성

![리드미8](https://github.com/NoRuTnT/Dotori/assets/114069644/1914e68c-d39e-41a3-9154-063fae1be639)
![리드미9](https://github.com/NoRuTnT/Dotori/assets/114069644/54f63759-f7c7-4ec6-b3cc-7087452d4861)

- 계약 완료 및 계약서 파일 생성

![리드미10](https://github.com/NoRuTnT/Dotori/assets/114069644/95f26105-d9b4-4eb3-8145-aa4facc8f556)
![리드미11](https://github.com/NoRuTnT/Dotori/assets/114069644/0db8f6b7-3c9d-42e5-8911-4736bff73b42)

- 계약서 다운로드

![리드미12](https://github.com/NoRuTnT/Dotori/assets/114069644/458390af-3030-449b-8d5e-b3fd73c88f85)
![리드미13](https://github.com/NoRuTnT/Dotori/assets/114069644/565262ed-b9fe-4bfb-8ef9-6317558fa391)

### 🧓 활동 인증 및 보호자 알림
- 활동 내역 인증

![KakaoTalk_20240403_233139757_03](/uploads/044bc26257024b00a14345ee1dc897cc/KakaoTalk_20240403_233139757_03.jpg)
![KakaoTalk_20240403_233139757_04](/uploads/6d359e64ef09c11915fc15c3adf3dab3/KakaoTalk_20240403_233139757_04.jpg)

- 리뷰

![KakaoTalk_20240403_233139757_06](/uploads/4f6ab6f5f3fa9acbaab2afe4fbd30034/KakaoTalk_20240403_233139757_06.jpg)
![KakaoTalk_20240403_233139757_05](/uploads/1c4921b36545906eac0b2a9adee01818/KakaoTalk_20240403_233139757_05.jpg)

# 🏠 기술 스택

### 💡 사용 기술

### 💡 Version

| Teck stack |                       | version |
| ---------- |-----------------------| ------- |
| Frontend   | React                 | 18.2.0  |
|            | Typescript            | 4.4.2   |
|            | zustand               | 4.5.2   |
|            | webpack               | 5.6.0   |
| Data       | FastAPI               | 0.95.0  |
|            | uvicorn               | 0.21.1  |
| Backend    | SpringBoot            | 2.7.17  |
|            | Java (Amazon Coretto) | 11.0.22 |
| Database   | MySQL                 | 8.0.32  |
|            | MongoDB               | 5.0.25  |
|            | Redis                 |         |
| Infra      | Docker                |         |
|            | Docker Hub            |         |
|            | Nginx                 |         |
|            | AWS EC2               |         |
|            | Prometheus            |         |
|            | Grafana               |         |

# 🏠 데이터 분석

### 💡 데이터 수집, 전처리

- 데이터 크롤링 : 부동산 사이트 매물 데이터 수집
- 추천에 불필요한 정보 제거 : ex) 공인중개사 주소정보
- 결측치 제거 : ex) 시군구 주소정보 -> 더미 문자열로
[결측치가 제거(empty로 padding)된 데이터셋]
![image-1](/uploads/f2b209f3cebf28bda0dc532df14bc7ae/image-1.png)
- 획득 정보들의 자료형 정리 : ex) lat: float, address: str

총 1264개 데이터 수집

### 💡 추천 알고리즘

- 부동산은 계약 주기가 길기 때문에 (6개월 이상) 컨텐츠 기반 추천 알고리즘을 사용하기에 부적합 ⇒ 컨텐츠 기반 추천 알고리즘 고도화 추진

- 코사인 유사도 : 두 벡터간 각도 코사인값을 이용하여 측정된 벡터간의 유사한 정도
[출처:https://wikidocs.net/24603]
![image](/uploads/ffc5e9b0152e3cf02baab7cc012cce54/image.png)
1. host선호 정보와 member선호 정보의 종류로부터 특성을 정리하고 각각 벡터화
```python
def get_member_vector(member_personality):
    ...
    day = convert_bool_to_int(member_personality['daytime'])+convert_bool_to_int(member_personality['fast'])*weight
    ...
    member_vector = [day, night, smoke, extro, intro,
                     host_related, pet_lover, cold, hot]
    return np.array(member_vector)
```
2. 각각의 host벡터에 대해 member벡터와 코사인 유사도 계산
```python
from sklearn.metrics.pairwise import cosine_similarity
# 코사인 유사도 계산
similarity = cosine_similarity(host_vector.reshape(1,-1), member_vector.reshape(1,-1))
priorities.append([similarity[0][0], item['home_no']]) # 유사도와 인덱스 번호를 배열에 추가
```
3. 우선순위가 높은 순서대로 MongoDB에 다시 find() 수행
```python
    for lim, index in enumerate(priorities):
        if(lim >= SEARCH_LIMIT):
            break
        item = db.home.find({'home_no': index[1]}, {mongo_projection_query})
```
4. 획득한 결과를 client에 반환

### 💡 추천 서버구현

- FastAPI 웹서버 구현
- MongoDB 접근을 위한 pymongo lib 사용
- Frontend filter 조건 + 컨텐츠 추천 알고리즘 기반 추천 집 리스트 반환

### 💡 알고리즘 실행 성능 향상

- 최대 검색되는 요소의 개수를 200개 이내로 제한해서 json_data 용량 최소화
```python
SEARCH_LIMIT = 200
...
    for lim, index in enumerate(priorities):
        if(lim >= SEARCH_LIMIT):
            break
        (data_process_logic)
```
- 프론트엔드 코드처리에 필수적인 key-value 성분만 선별해서 추출 (MongoDB Projection 기능)
```python
item = db.home.find({'home_no': index[1]}, {'type': 1,
                             'smoke': 1,
                             'pet': 1,
                             'clean': 1,
                             ...
                             })
```
- 최적화 이전<br/>
  ![최적화이전](/uploads/05139fbce2aba5a30ea64134f52287fb/최적화이전.PNG)
- 최적화 이후<br/>
  ![최적화이후](/uploads/dd54a18e21175e1a3da4e8efde1cee80/최적화이후.PNG)
### 💡 AWS S3 활용 파일 처리


---

# 🏠 팀원 소개 (포지션 및 후기)
| 이름 | 포지션           | 프로젝트 후기 |
| ---------- | ---------- | ------- |
| 김태윤   | 팀장, BE 리더, FE        | 팀장으로 프로젝트에 참여하게 되었는데, 일정을 어느 정도 리드해줘야 하는 자리인데 그 점이 다소 미흡했던 거 같아 조금은 아쉬웠고, 모두에게 신경을 쓰지는 못했었다는 것도 아쉬웠습니다. 그렇지만 좋은 팀원들과 즐겁게 프로젝트 마무리할 수 있어서 좋았고, 리액트를 처음 사용해보게 되었는데 프런트엔드 개발도 많이 이해할 수 있어 유익한 시간이었습니다.  |
| 문준형     | Infra, BE    | 처음 인프라포지션을 진행하며 하고싶은 개발환경설정을 다 해본것같아 만족스러웠습니다. 설정을 자주변경하면서 팀원들이 개발에만 집중하게 해주지못한것같아 아쉬웠습니다. 짧은 6주의 개발기간동안 힘든 풀스택개발을 진행해준 팀원들에게 고맙다는 말을 전하고싶습니다.  |
| 박중현     | FE 리더       | 프론트엔드 팀장이지만 부족한 실력으로 인해 프론트엔드 개발이 많이 늦어졌는데 api 호출이나 상태관리에 능력이 뛰어난 팀원들 덕분에 개발을 잘 끝낸 것 같습니다. 저는 UI/UX 부분에 많은 노력을 들였는데, 발표 때 오류 없이 계획한 대로 진행되어서 기뻤습니다. 프론트엔드 개발자로서 갖춰야 하는 능력이 비단 눈에 보이는 영역 뿐만 아니라 백엔드에 대한 이해가 필요하다고 느꼈고 보다 워크플로우를 잘 알아야겠다는 생각을 했습니다. 빠른 상황판단과 역할 분배로 프로젝트를 잘 끝낼 수 있게 노력해준 팀원분들께 감사합니다.|
| 서해광     | Data 리더, FE, BE | 빅데이터 분석 부분을 더 빠르게 구현하고 프론트엔드에 집중하고 싶었는데 그러지 못해 미안한 마음이 있습니다. 고된 프로젝트 과정 가운데 힘든 내색 전혀하지 않고 즐거이 프로젝트를 같이한 다른 팀원분들께 감사하고 새로운 프레임워크, 데이터베이스를 적용하고 데이터를 가공하고 분석하는 능력을 기를 수 있어서 정말로 좋았습니다.  |
| 이민지     | FE, BE       | 풀스택으로 참여하면서 처음으로 리액트도 써보고 개발자로서 필요한 백엔드, 프론트엔드 역량을 키울 수 있었습니다. 특히 열정적인 팀원들과 함께하면서 열심히 하는 태도나 문제 해결 능력 등 많은 점을 배웠습니다. 프로젝트 하면서 어려운 점도 있었지만, 같이 논의하면서 극복할 수 있었고 이를 통해 성장할 수 있었습니다. 저희 서비스가 사회적 문제인 대학생 주거난과 노인 우울증을 해결하고 세대간 공감을 추구했기 때문에 더 뜻깊었던 것 같습니다. 완성도 있는 서비스를 만들 수 있어서 굉장히 만족스럽고 발표날까지 열심히 참여한 팀원들에게 수고했고 고맙다는 말 전하고 싶습니다.  |
| 이하은     | Data, BE, FE | 데이터셋이 없는 상황에서 추천 시스템 구현을 위한 빅데이터 셋을 모으고 가공하는 과정에서 전처리 및 크롤링과 관련한 파이썬 라이브러리들을 사용해보는 경험은 정말 뜻깊었습니다. react라는 새로운 프레임워크를 단시간에 적용해 프로젝트를 완성해야 하는 힘든 일정이었음에도 불구하고, 좋은 팀원들 덕분에 잘 끝낼 수 있었다고 생각합니다. 소통의 중요성을 다시한번 체감했고 새로운 기술을 빠르게 배워 적용하는 경험을 통해 많이 성장할 수 있어 좋았습니다. |
