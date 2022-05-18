import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "sample",
  api_key: "",
  api_secret: "",
  secure: true,
});

const path = process.argv[2];
const name = process.argv[3];

const upload = (path) => {
  cloudinary.uploader.upload(path, function (error, result) {
    console.log(result, error);
  });
};
