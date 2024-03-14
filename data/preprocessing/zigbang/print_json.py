import pandas as pd
import requests
import json
import os
import csv


def print_function():
    URL="https://apis.zigbang.com/v3/items/40144219?version=&domain=zigbang"
    resp = requests.get(URL)
    json_data = resp.json()
    items_info = json.dumps(json_data, indent=4)
    items_info = items_info.encode().decode("unicode_escape")
    print(items_info)

if __name__ == '__main__':
    print_function()