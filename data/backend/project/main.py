# swaggerURL : 127.0.0.1:8000/docs

from fastapi import FastAPI
import uvicorn

from pymongo import MongoClient
import traceback

app = FastAPI()
host = 'localhost'
port = 27017
db = None

def init():
    print("DB초기설정")
    try:
        client = MongoClient(
            host=host,
            port=port
        )
        db = client['example'] # db이름을 입력
        print("DB 연결성공!")
        print(list(db.food.find({})))
    except Exception as e:
        print(traceback.format_exc())
    # finally:
    #     client.close()
    #     print("MongoDB Closed")

@app.get("/")
def root():
    return {"message": "HelloWorld"}

@app.get("/home")
def home():
    return {"message": "home"}

@app.get("/test1")
def get_test():
    return "123"
# 터미널창에
# python -m uvicorn main:app --reload
if __name__ == '__main__':
    init()
    uvicorn.run(app, host="127.0.0.1", port=8000, log_level="info")
