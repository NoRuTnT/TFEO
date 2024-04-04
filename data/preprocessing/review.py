import requests
import json

def main():
    get_review()

def get_review():
    # id = 80
    id = 6692
    url = "https://apis.zigbang.com/property/apartments/{}/reviews/v1".format(id)
    resp = requests.get(url)
    items = resp.json()
    items_str = json.dumps(items, indent=4)
    items_str = items_str.encode().decode("unicode_escape")
    print(items_str)
if __name__ == "__main__":
    main()