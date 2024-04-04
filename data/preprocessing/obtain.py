# zig

# Geohash 기반 주택 정보 처리

from datetime import datetime
import pandas as pd
import json
import sys
import os
import csv # csv파일 저장
import requests
def main():
    csv_file_path = "/sample.csv"
    URL_format = ""

    response =requests.get("https://apis.zigbang.com/v2/search?leaseYn=N&q={서울특별시}&serviceType=원룸")
    items = response.json()
    print(items)
# https://apis.zigbang.com/v2/search?leaseYn=N&q={addr}&serviceType=원룸

if __name__ == "__main__":
    main()