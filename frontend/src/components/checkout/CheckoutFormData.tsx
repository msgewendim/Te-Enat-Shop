import { UseFormRegister } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { Customer } from "../../client/types.gen";
import useCheckoutFormData from "../../hooks/app/useCheckoutFormData";
import { FormInput } from "../ui/FormInput";
import Loader from "../ui/Loader";


const CheckoutFormData = () => {
	const {
		register,
		handleGetPaymentForm,
		handleReturnToShop,
		handleSubmit,
		isSubmitting,
	} = useCheckoutFormData();
	const { t } = useTranslation();
	
	if (isSubmitting) {
		return <Loader />
	}

	return (
		<form	className="mt-8 space-y-8" onSubmit={handleSubmit(handleGetPaymentForm)}
		>
			<PersonalDetails register={register} />

			<ShippingAddress register={register} />

			{/* notes for delivery */}
			<div className="relative">
				<label
					htmlFor="notes"
					className={`block text-sm font-medium text-gray-700 mb-1`}
				>
					{t("checkout.notes")}
				</label>
				<textarea
					{...register("notes")}
					placeholder={t("checkout.notes")}
					className="w-full px-4 py-3 bg-gray-100 text-gray-800 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-btnColor2 focus:border-transparent placeholder:text-right"
					id="notes"
				/>
			</div>

			<Actions
				handleReturnToShop={handleReturnToShop}
				isSubmitting={isSubmitting}
			/>
		</form>
	);
};

const Actions = ({ handleReturnToShop, isSubmitting }: { handleReturnToShop: () => void; isSubmitting: boolean; }) => {
	const { t } = useTranslation();

	return (
		<div className="flex flex-col sm:flex-row gap-4 mt-8">
			<button
				type="button"
				onClick={handleReturnToShop}
				disabled={isSubmitting}
				className="rounded-md px-6 py-3 w-full text-sm font-medium tracking-wide bg-transparent hover:bg-btnColor1 hover:text-white border border-gray-300 text-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
			>
				{t("checkout.cancel")}
			</button>
			<button
				type="submit"
				disabled={isSubmitting}
				className="rounded-md px-6 py-3 w-full text-sm font-medium tracking-wide bg-btnColor2 hover:bg-hoverBtnColor2 text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
			>
				{isSubmitting ? t("checkout.processing") : t("checkout.submit")}
			</button>
		</div>
	);
};

const ShippingAddress = ({ register }: { register: UseFormRegister<Customer> }) => {
	const { t } = useTranslation();
	return (
		<section aria-labelledby="shipping-address-heading">
			<h3
				id="shipping-address-heading"
				className="text-lg font-semibold text-gray-800 mb-4"
			>
				{t("checkout.shippingAddress")}
			</h3>
			<div className="grid sm:grid-cols-2 gap-4">
				<FormInput<Customer>
					placeholder={t("checkout.street")}
					label={t("checkout.street")}
					register={register}
					name="address.street"
					required
					className="sm:col-span-2"
				/>
				<FormInput<Customer>
					placeholder={t("checkout.streetNum")}
					label={t("checkout.streetNum")}
					register={register}
					name="address.streetNum"
					required
					className="sm:col-span-2"
				/>
				<FormInput<Customer>
					placeholder={t("checkout.city")}
					label={t("checkout.city")}
					register={register}
					name="address.city"
					required
				/>
				<FormInput<Customer>
					placeholder={t("checkout.postal_code")}
					label={t("checkout.postal_code")}
					register={register}
					name="address.postal_code"
				/>
			</div>
		</section>
	);
};

const PersonalDetails = ({ register }: { register: UseFormRegister<Customer> }) => {
	const { t } = useTranslation();
	return (
		<section aria-labelledby="personal-details-heading">
			<h3
				id="personal-details-heading"
				className="text-lg font-semibold text-gray-800 mb-4"
			>
				{t("checkout.personalDetails")}
			</h3>
			<div className="grid sm:grid-cols-2 gap-4">
				<FormInput<Customer>
					placeholder={t("checkout.firstName")}
					label={t("checkout.firstName")}
					register={register}
					name="firstName"
					required
				/>
				<FormInput<Customer>
					placeholder={t("checkout.lastName")}
					label={t("checkout.lastName")}
					register={register}
					name="lastName"
					required
				/>
				<FormInput<Customer>
					type="email"
					placeholder={t("checkout.email")}
					label={t("checkout.email")}
					register={register}
					name="email"
					required
				/>
				<FormInput<Customer>
					type="tel"
					placeholder={t("checkout.phone")}
					label={t("checkout.phone")}
					register={register}
					name="phone"
					required
					className="sm:col-span-2"
				/>
			</div>
		</section>
	);
};
export default CheckoutFormData;
