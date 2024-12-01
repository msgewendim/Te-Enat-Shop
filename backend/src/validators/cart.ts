import Joi from "joi";
import {
  ClientDetails,
  OrderItem,
  PaymentFormRequest,
  PaymentFormPayload,
} from "../../types/order.types";

const validatePaymentFormRequest = (payload: PaymentFormRequest) => {
  const schema = Joi.object({
    clientInfo: Joi.object<ClientDetails>({
      name: Joi.string().required(),
      mobile: Joi.string().required(),
      address: Joi.string().required(),
      emails: Joi.array().items(Joi.string()).required(),
      city: Joi.string().required(),
      zip: Joi.string().required(),
      taxId: Joi.string().optional(), // Unique identifier of my client in Morning
      add: Joi.boolean().optional(),
      country: Joi.string().optional(),
    }),
    totalPrice: Joi.number().required(),
    orderItems: Joi.array()
      .items(
        Joi.object<OrderItem>({
          currency: Joi.string().required(),
          description: Joi.string().required(),
          quantity: Joi.number().required(),
        })
      )
      .required()
      .min(1),
  });
  return schema.validate(payload);
};

const validatePaymentFormPayload = (payload: PaymentFormPayload) => {
  const schema = Joi.object<PaymentFormPayload>({
    description: Joi.string().required(),
    type: Joi.number().valid(320, 400).required(),
    currency: Joi.string().required(),
    vatType: Joi.number().valid(0, 1, 2).required(),
    amount: Joi.number().required(),
    maxPayments: Joi.number(),
    group: Joi.number(),
    pluginId: Joi.string().required(),
    client: Joi.object<ClientDetails>().required(),
    income: Joi.array().items(Joi.object<OrderItem>()).required(),
    remarks: Joi.string().required(),
    successUrl: Joi.string().optional(),
    failureUrl: Joi.string().optional(),
    notifyUrl: Joi.string().optional(),
    custom: Joi.string().optional(),
  });
  return schema.validate(payload);
};
export { validatePaymentFormRequest, validatePaymentFormPayload };
