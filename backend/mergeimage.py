import glob
import cloudinary
import cloudinary.uploader
import cloudinary.api
from PIL import Image
import sys

# OPTIONS
WIDTH = 100
HEIGHT= 120
COMBINED_WIDTH = WIDTH * 7
COMBINED_HEIGHT = HEIGHT * 7
Image.MAX_IMAGE_PIXELS = None


def get_directory():
    # 여기에 어떻게 희수님 클라우디너리에서 사진 49개 받아올지 짜야합니다. 지금은 그냥 로컬에 넣어놓은 사진으로 쓰는 중
    dir = "./pictures/"
    files = glob.glob(dir+"*.*")
    file_list = files
    if len(file_list)>49:
        file_list = file_list[:49]
    return file_list 

def resize_pics(file_list):
    # print("resizing pictures...")
    resized = []
    sum_name = ""
    for dir in file_list:
        resized.append((Image.open(dir)).resize((WIDTH,HEIGHT)))
        sum_name += dir.strip()+"_"
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

    comb_image.save("./pictures/comb_image.jpg","JPEG")
    # comb_image.show()

def upload(path):
    # print("uploading the combined picture to cloudinary...")
    cloudinary.config( 
        cloud_name = "daeyong", 
        api_key = "888595591856965", 
        api_secret = "ihOBwpo-C3IQcezVVAC0pZLoiOA" 
    )
    summary = cloudinary.uploader.upload(path)
    url = summary['url']
    return url


if __name__ == "__main__":
 
    file_list = get_directory() # 파일들 리스트로 정리
    resized, res_name = resize_pics(file_list) # resize한 결과와 사진 이름
    combine(resized) # 사진 합치기
    res_url = upload("./pictures/comb_image.jpg") # 클라우디너리에 업로드
    res_name = res_name.replace("./pictures/", "").replace(".jpg","") # 사진 이름 가공
    print(res_url) # 출력해야지만 노드에서 받아서 활용함
    print(res_name)
