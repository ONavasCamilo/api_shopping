import CreateProductDto from "../dto/createProduct.dto";
import UpdateProductDto from "../dto/updateProduct.dto";
import CategoryModel from "../repositories/category.repository";
import ProductModel from "../repositories/product.repository";
import { UploadApiResponse, v2 as cloudinary } from "cloudinary";
import toStream from "buffer-to-stream";

export const getAllProductsService = async (category: any) => {
  const products = await ProductModel.find({
    where: { isActive: true, },
    relations: {
      category: true,
    },
  });
  if (category) {
    return products.filter((producto) => producto.category.name === category)
  }
  return products;
};

export const getOneProductService = async (id: string) => {
  const product = await ProductModel.findOne({
    where: { id, isActive: true },
    relations: {
      category: true,
    },
  });
  return product;
};

export const updateProductService = async (
  id: string,
  updateProductBody: UpdateProductDto
) => {
  const existProduct = await ProductModel.findOne({
    where: { id, isActive: true },
    relations: {
      category: true,
    },
  });
  if (!existProduct) throw new Error("Id de producto inexistente");
  await ProductModel.update(id, updateProductBody);
  const updateProduct = await ProductModel.findOne({
    where: { id, isActive: true },
    relations: {
      category: true,
    },
  });
  return updateProduct;
};

export const createProductService = async (
  product: CreateProductDto,
  file: Express.Multer.File
) => {
  const categories = await CategoryModel.find();
  const category = categories.find(
    (category) => category.name === product.category
  );
  if (!category) throw new Error("Categoria no encontrada");

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
  const newProduct = ProductModel.create({
    ...product,
    category,
    imgUrl: response.secure_url,
  });
  await ProductModel.save(newProduct);
  return newProduct;
};

export const updateImageService = async (
  id: string,
  file: Express.Multer.File
) => {
  const existProduct = await ProductModel.findOne({
    where: { id, isActive: true },
  });
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
    where: { id, isActive: true },
    relations: {
      category: true,
    },
  });
  return foundProduct;
};

export const deleteProductService = async (id: string) => {
  const existProduct = await ProductModel.findOne({
    where: { id, isActive: true },
  });
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
  existProduct.isActive = false;
  await ProductModel.save(existProduct);
  return {
    message: "Usuario eliminado correctamente",
  };
};
