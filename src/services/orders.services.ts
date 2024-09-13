import { addNewOrderDto } from "../dto/addNewOrder.dto";
import { Order } from "../entities/order.entity";
import { OrderDetail } from "../entities/orderDetail.entity";
import OrderModel from "../repositories/order.repository";
import OrderDetailModel from "../repositories/orderDetail.repository";
import ProductModel from "../repositories/product.repository";
import UserModel from "../repositories/user.repository";

export const getAllOrdersService = async () => {
  const orders = await OrderModel.find({
    relations: {
      orderDetails: {
        products: true,
      },
    },
  });
  return orders;
};

export const getOneOrdersService = async (id: string) => {
  const order = await OrderModel.findOne({
    where: { id },
    relations: {
      orderDetails: {
        products: true,
      },
    },
  });
  return order;
};

export const addNewOrdersService = async (newOrderBody: addNewOrderDto) => {
  const { userId, products } = newOrderBody;
  let totalPrice = 0;

  const existUser = await UserModel.findOneBy({ id: userId });
  if (!existUser) throw new Error(`Usuario con id ${userId} inexistente`);

  const newOrder = new Order();
  newOrder.date = new Date();
  newOrder.user = existUser;
  await OrderModel.save(newOrder);

  const productsArray = await Promise.all(
    products.map(async (element) => {
      const product = await ProductModel.findOneBy({
        id: element.id,
      });
      if (!product)
        throw new Error(`Producto con id ${element.id} no encontrado`);

      totalPrice += Number(product.price);
      await ProductModel.update(
        { id: element.id },
        { stock: product.stock - 1 }
      );
      return product;
    })
  );
  const orderDetail = new OrderDetail();
  orderDetail.price = Number(Number(totalPrice).toFixed(2));
  orderDetail.products = productsArray;
  orderDetail.order = newOrder;
  await OrderDetailModel.save(orderDetail);

  return await OrderModel.findOne({
    where: { id: newOrder.id },
    relations: {
      orderDetails: true,
    },
  });
};
