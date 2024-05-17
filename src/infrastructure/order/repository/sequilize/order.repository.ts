import Order from "../../../../domain/checkout/entity/order";
import OrderItem from "../../../../domain/checkout/entity/order_item";
import OrderRepositoryInterface from "../../../../domain/checkout/repository/order-repository.interface";
import OrderItemModel from "./order-item.model";
import OrderModel from "./order.model";

export default class OrderRepository implements OrderRepositoryInterface {
  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
        })),
      },
      {
        include: [{ model: OrderItemModel }],
      }
    );
  }

  async update(entity: Order): Promise<void> {
    await OrderModel.sequelize.transaction(async (transaction) => {
      await OrderItemModel.destroy({
        where: { order_id: entity.id },
        transaction,
      });

      const items = entity.items.map((item) => {
        return {
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
          order_id: entity.id,
        };
      });

      await OrderItemModel.bulkCreate(items, { transaction });

      await OrderModel.update(
        { total: entity.total() },
        { where: { id: entity.id }, transaction }
      );
    });
  }

  async find(id: string): Promise<Order> {
    const order = await OrderModel.findByPk(id, {
      include: [{ model: OrderItemModel }],
    });

    if (!order) {
      throw new Error("Order not found");
    }

    return new Order(
      order.id,
      order.customer_id,
      order.items.map((item) => {
        return new OrderItem(
          item.id,
          item.name,
          item.price,
          item.product_id,
          item.quantity
        );
      })
    );
  }

  async findAll(): Promise<Order[]> {
    const orders = await OrderModel.findAll({
      include: [{ model: OrderItemModel }],
    });
    return orders.map((order) => {
      return new Order(
        order.id,
        order.customer_id,
        order.items.map((item) => {
          return new OrderItem(
            item.id,
            item.name,
            item.price,
            item.product_id,
            item.quantity
          );
        })
      );
    });
  }
}
