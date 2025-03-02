// validate payment requests from payplus

import Joi from "joi";
import { CHARGE_METHOD, PayplusGenLinkPayload } from "../utils/PaymentProvider/types";

const validatePaymentRequest = (payload: PayplusGenLinkPayload) => {
  const schema = Joi.object({
    payment_page_uid: Joi.string().required(),
    charge_method: Joi.number().required().valid(CHARGE_METHOD.CHECK, CHARGE_METHOD.CHARGE, CHARGE_METHOD.APPROVAL, CHARGE_METHOD.RECURRING_PAYMENTS, CHARGE_METHOD.REFUND),
    success_url: Joi.string().required(),
    cancel_url: Joi.string().required(),
    currency_code: Joi.string().required().default("ILS").valid("ILS"),
    amount: Joi.number().required().min(1),
    items: Joi.array().items(Joi.object({
      name: Joi.string().required(),
      price: Joi.number().required().min(1),
      quantity: Joi.number().required().min(1),
      product_uid: Joi.string().optional(),
    })).required(),
    customer: Joi.object({
      customer_name: Joi.string().required(),
      email: Joi.string().required(),
      phone: Joi.string().required(),
      city: Joi.string().required(),
      address: Joi.string().required(),
      postal_code: Joi.string().optional(),
      customer_external_number: Joi.string().optional(),
    }).required(),
    refURL_success: Joi.string().optional(),
    refURL_failure: Joi.string().optional(),
    refURL_cancel: Joi.string().optional(),
    refURL_callback: Joi.string().optional(),
    more_info: Joi.string().optional(),
  });

  return schema.validate(payload);
};

export default validatePaymentRequest;
