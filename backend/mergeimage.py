import glob
import cloudinary
import cloudinary.uploader
import cloudinary.api
from PIL import Image
import sys
import json
import os
import urllib.request
import random

# OPTIONS
WIDTH = 100
HEIGHT= 120
COMBINED_WIDTH = WIDTH * 7
COMBINED_HEIGHT = HEIGHT * 7
Image.MAX_IMAGE_PIXELS = None


def get_directory():
    # 여기에 어떻게 희수님 클라우디너리에서 사진 49개 받아올지 짜야합니다. 지금은 그냥 로컬에 넣어놓은 사진으로 쓰는 중
    
    # 기존에 존재하던 파일들 삭제
    file_list = glob.glob("./pictures_cldnry/"+"*.*")
    for file in file_list:
        os.remove(file)
    
    # 클라우디너리 API로 계정의 asset 정보 받아오기.
    rsrcList = json.loads(json.dumps(cloudinary.api.resources(type = "upload"), sort_keys=True, indent=2))['resources']
    # print(json.dumps(resList, sort_keys=True, indent=2))
    # print(rsrcList[0])
    
    # 클라우디너리 계정 asset 정보를 통해 이미지 다운로드.
    for i in range(len(rsrcList)):
        img_url = rsrcList[i]['url']
        dirList = img_url.split('/')
        if dirList[7] == 'samples' or dirList[7] == 'export':
            continue
        img_name = dirList[7]
        # print(dirList)
        # print(img_name)
        urllib.request.urlretrieve(img_url, "./pictures_cldnry/" + img_name)
    
    # 다운받은 모든 사진들의 경로가 담긴 list
    file_list = glob.glob("./pictures_cldnry/"+"*.*")
    # print("file_list: " , file_list)
    
    # 사진이 49장보다 많으면 일부만 사용.
    if len(file_list)>49:
        file_list = file_list[:49]
    
    # 사진이 부족하면 랜덤으로 채워주는 기능
    if len(file_list)<49:
        list_add = [random.choice(file_list) for _ in range(49 - len(file_list))]
        file_list = file_list + list_add
    
    return file_list 

def resize_pics(file_list):
    # print("resizing pictures...")
    resized = []
    sum_name = ""
    for dir in file_list:
        resized.append((Image.open(dir)).resize((WIDTH,HEIGHT)))
        sum_name += os.path.split(dir)[1].replace(".png","").replace(".jpg","") + "_"
        # print(os.path.split(dir)[1] + "_")
    return resized, sum_name

def combine(resized_list):
    # print("combining pictures...")
    comb_image = Image.new('RGB', (COMBINED_WIDTH, COMBINED_HEIGHT), (250, 250, 250))
    (row_cnt, col_cnt) = (0,0)
    for img in resized_list:
        curr_loc_x = row_cnt*WIDTH
        curr_loc_y = col_cnt*HEIGHT
        # print(str(curr_loc_x) + ","+ str(curr_loc_y))
        comb_image.paste(img, (curr_loc_x, curr_loc_y))

        row_cnt += 1
        if row_cnt == 7:
            row_cnt = 0
            col_cnt += 1

    comb_image.save("./pictures_cldnry/export/comb_image.jpg","JPEG")
    # comb_image.show()
    
    # 사진 사용 후 전부 삭제
    file_list = glob.glob("./pictures_cldnry/"+"*.*")
    for file in file_list:
        os.remove(file)

def upload(path):
    # print("uploading the combined picture to cloudinary...")
    
    summary = cloudinary.uploader.upload(path, folder = 'export', use_filename = True)
    url = summary['url']
    return url


if __name__ == "__main__":
    cloudinary.config( 
        cloud_name = "daeyong", 
        api_key = "888595591856965", 
        api_secret = "ihOBwpo-C3IQcezVVAC0pZLoiOA" 
    )
    file_list = get_directory() # 파일들 리스트로 정리
    resized, res_name = resize_pics(file_list) # resize한 결과와 사진 이름
    combine(resized) # 사진 합치기
    
    res_url = upload("./pictures_cldnry/export/comb_image.jpg") # 클라우디너리에 업로드
    
    # 출력 내용. (노드에서 활용)
    print(res_url) 
    print(res_name)
