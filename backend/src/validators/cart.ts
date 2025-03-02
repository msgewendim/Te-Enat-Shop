import Joi from "joi";
import {
  Customer,
  Address,
  CartItem,
  PaymentFormRequest
} from "../../types/order.types";

const validatePaymentFormRequest = (payload: PaymentFormRequest) => {
  const schema = Joi.object({
    clientInfo: Joi.object<Customer>({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      phone: Joi.string().required(),
      email: Joi.string().required(),
      address: Joi.object<Address>({
        city: Joi.string().required(),
        postal_code: Joi.string().required(),
        street: Joi.string().required(),
        streetNum: Joi.string().required(),
      }).required(),
    }).required(),
    totalPrice: Joi.number().required(),
    orderItems: Joi.array()
      .items(
        Joi.object<CartItem>({
          item: Joi.string().required(),
          price: Joi.string().required(),
          quantity: Joi.number().required(),
          size: Joi.string().required(),
        })
      )
      .required()
      .min(1),
  });
  return schema.validate(payload);
};

// const validatePaymentFormPayload = (payload: PaymentFormPayload) => {
//   const schema = Joi.object<PaymentFormPayload>({
//     description: Joi.string().required(),
//     type: Joi.number().valid(320, 400).required(),
//     currency: Joi.string().required(),
//     vatType: Joi.number().valid(0, 1, 2).required(),
//     amount: Joi.number().required(),
//     maxPayments: Joi.number(),
//     group: Joi.number(),
//     pluginId: Joi.string().required(),
//     client: Joi.object<Customer>().required(),
//     income: Joi.array().items(Joi.object<OrderItem>()).required(),
//     remarks: Joi.string().required(),
//     successUrl: Joi.string().optional(),
//     failureUrl: Joi.string().optional(),
//     notifyUrl: Joi.string().optional(),
//     custom: Joi.string().optional(),
//   });
//   return schema.validate(payload);
// };
export { validatePaymentFormRequest };
