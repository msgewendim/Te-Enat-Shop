import { ClientDetails } from "../../client/types.gen";
import { FormInput } from "../ui/FormInput";
import useCheckoutFormData from "../../hooks/useCheckoutFormData";
import { t } from "i18next";



const CheckoutFormData = () => {
  const { register, handleGetPaymentForm, handleReturnToShop, handleSubmit } = useCheckoutFormData()

  return (
    <form className="mt-8" onSubmit={handleSubmit(handleGetPaymentForm)}>
      <div>
        <h3 className="text-base text-gray-800 mb-4">{t('checkout.personalDetails')}</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <FormInput<ClientDetails> placeholder={t('checkout.fullName')} register={register} name="name" />
          <FormInput<ClientDetails> type="email" placeholder={t('checkout.email')} register={register} name="email" />
          <FormInput<ClientDetails> type="tel" placeholder={t('checkout.mobile')} classNames="text-right placeholder:text-right" register={register} name="mobile" />
        </div>
      </div>
      {/* Shipping Address Info */}
      <div className="mt-8">
        <h3 className="text-base text-gray-800 mb-4">{t('checkout.shippingAddress')}</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <FormInput<ClientDetails> placeholder={t('checkout.address')} register={register} name="address" />
          <FormInput<ClientDetails> placeholder={t('checkout.city')} register={register} name="city" />
          <FormInput<ClientDetails> placeholder={t('checkout.zip')} register={register} name="zip" />
        </div>
        {/* buttons */}
        <div className="flex gap-4 max-md:flex-col mt-8">
          <button type="button" onClick={handleReturnToShop} className="rounded-md px-6 py-3 w-full text-sm tracking-wide bg-transparent hover:bg-btnColor1 hover:text-white border border-gray-300 text-gray-800 max-md:order-1">
            {t('checkout.cancel')}
          </button>
          <input type="submit" className="rounded-md px-6 py-3 w-full text-sm tracking-wide bg-btnColor2 hover:bg-hoverBtnColor2 text-white" value={t('checkout.submit')} />
        </div>
      </div>
    </form>
  );
};

export default CheckoutFormData;