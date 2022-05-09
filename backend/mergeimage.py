import glob
from PIL import Image

# OPTIONS
WIDTH = 100
HEIGHT= 120
COMBINED_WIDTH = WIDTH * 7
COMBINED_HEIGHT = HEIGHT * 7
Image.MAX_IMAGE_PIXELS = None


def get_directory():
    # THIS PART SHOULD BE MODIFIED FOR CLOUDINARY REST API
    # TODO:
    #       with cloudinary api, make a logic checking number of pictures collected
    print("importing pictures...")
    dir = "./pictures/"
    files = glob.glob(dir+"*.*")
    file_list = files
    if len(file_list)>49:
        file_list = file_list[:49]
    return file_list

def resize_pics(file_list):
    print("resizing pictures...")
    resized = []
    for dir in file_list:
        resized.append((Image.open(dir)).resize((WIDTH,HEIGHT)))
    return resized

def combine(resized_list):
    print("combining pictures...")
    comb_image = Image.new('RGB', (COMBINED_WIDTH, COMBINED_HEIGHT), (250, 250, 250))
    (row_cnt, col_cnt) = (0,0)
    for img in resized_list:
        curr_loc_x = row_cnt*WIDTH
        curr_loc_y = col_cnt*HEIGHT
        print(str(curr_loc_x) + ","+ str(curr_loc_y))
        comb_image.paste(img, (curr_loc_x, curr_loc_y))

        row_cnt += 1
        if row_cnt == 7:
            row_cnt = 0
            col_cnt += 1

    comb_image.save("./pictures/comb_image.jpg","JPEG")
    comb_image.show()


if __name__ == "__main__":
    file_list = get_directory()
    resized = resize_pics(file_list)
    combine(resized)
