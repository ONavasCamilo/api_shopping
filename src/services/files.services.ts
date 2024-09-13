import ProductModel from "../repositories/product.repository";
import { UploadApiResponse, v2 as cloudinary } from "cloudinary";
import toStream from "buffer-to-stream";

export const filesUploadImageService = async (
  id: string,
  file: Express.Multer.File
) => {
  const existProduct = await ProductModel.findOneBy({ id });
  if (!existProduct) throw new Error("Id de producto inexistente");
  if (
    existProduct.imgUrl &&
    existProduct.imgUrl.includes("res.cloudinary.com")
  ) {
    const publicId = existProduct.imgUrl.split("/").pop()?.split(".")[0];
    if (publicId) {
      await cloudinary.uploader.destroy(`ecommerce_shopping/${publicId}`);
    }
  }
  const response: UploadApiResponse = await new Promise((resolve, reject) => {
    const upload = cloudinary.uploader.upload_stream(
      { resource_type: "auto", folder: "ecommerce_shopping" },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result as UploadApiResponse);
        }
      }
    );
    toStream(file.buffer).pipe(upload);
  });
  await ProductModel.update(id, {
    imgUrl: response.secure_url,
  });
  const foundProduct = await ProductModel.findOne({
    where: { id },
    relations: {
      category: true,
    },
  });
  return foundProduct;
};
