import {
	CheckCircleIcon,
	TruckIcon,
	CreditCardIcon,
	QuestionMarkCircleIcon as HelpCircleIcon,
	ArrowRightIcon,
} from "@heroicons/react/24/outline";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, Link } from "react-router-dom";

import { MinimalCartItem } from "../client/types.gen";
import Loader from "../components/ui/Loader";
import { useCartStore } from "../stores/useCartStore";
import { getUtil } from "../lib/api";

export interface PayplusPaymentResponse {
	transaction_type:
		| "Check"
		| "Charge"
		| "Approval"
		| "Recurring"
		| "Refund"
		| "Token";
	transaction: {
		uid: string;
		uid_emv: string;
		payment_page_request_uid: string;
		number: string;
		type: string;
		date: string;
		status_code: string;
		amount: number;
		currency: string;
		credit_terms: string;
		paramj: number;
		rrn: string;
		payments: {
			number_of_payments: number;
			first_payment_amount: number;
			rest_payments_amount: number;
		};
		secure3D: {
			status: string | null;
			tracking: string | null;
		};
		approval_number: string;
		voucher_number: string;
		more_info: string | null;
		more_info_1: string | null;
		more_info_2: string | null;
		more_info_3: string | null;
		more_info_4: string | null;
		more_info_5: string | null;
		add_data: string | null;
		original_amount_currency_dcc: number | null;
		original_currency_dcc: string | null;
		rate_dcc: number | null;
	};
	data: {
		customer_uid: string;
		customer_email: string;
		terminal_uid: string;
		cashier_uid: string;
		cashier_name: string;
		items: Array<unknown>;
		card_information: {
			card_bin: string;
			card_holder_name: string;
			token: string | null;
			four_digits: string;
			expiry_month: string;
			expiry_year: string;
			clearing_id: number;
			brand_id: number;
			issuer_id: number;
			card_foreign: string;
			identification_number: string;
		};
	};
}

const ThankYou = () => {
	const { t } = useTranslation();
	const location = useLocation();
	const { clearCart } = useCartStore();
	
	// Get cart items from persistent storage (saved before payment)
	const [orderItems] = useState<MinimalCartItem[]>(() => {
		const savedItems = sessionStorage.getItem("cartItems");
		return savedItems ? JSON.parse(savedItems) : [];
	});
	
	const searchParams = new URLSearchParams(location.search);
	const transactionUid = searchParams.get("transaction_uid");
	const moreInfo = searchParams.get("more_info");

	const getOrderData = async () => {
		if (!transactionUid && !moreInfo) {
			throw new Error("No transaction ID found");
		}
		const orderId = moreInfo;
		console.log("orderId", orderId);
		console.log("transactionUid", transactionUid);
		const response = await getUtil(
			`/orders/${orderId}/${transactionUid}`
		);
		return response.data;
	};
	
	const { data: orderData, isLoading, error } = useQuery({
		queryKey: ["orderData"],
		queryFn: getOrderData,
		enabled: !!transactionUid || !!moreInfo,
	});

	const formatDate = (dateString: string) => {
		try {
			const date = new Date(dateString);
			return new Intl.DateTimeFormat("he-IL", {
				year: "numeric",
				month: "long",
				day: "numeric",
				hour: "2-digit",
				minute: "2-digit",
			}).format(date);
		} catch (e) {
			return dateString;
		}
	};

	if (isLoading) {
		return (
			<div className="flex justify-center items-center min-h-screen">
				<Loader />
			</div>
		);
	}

	if (error || !orderData) {
		return (
			<div className="min-h-screen bg-gray-50 py-24 px-4">
				<div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8 text-center">
					<HelpCircleIcon className="h-16 w-16 text-red-500 mx-auto mb-4" />
					<h1 className="text-2xl font-bold text-gray-800 mb-4">{t('errors.orderError')}</h1>
					<p className="text-gray-600 mb-6">{error?.message || t('errors.orderNotFound')}</p>
					<Link
						to="/"
						className="bg-primary hover:bg-primary/90 text-white font-bold py-2 px-6 rounded transition duration-300"
					>
						{t('thankYou.backToHome')}
					</Link>
				</div>
			</div>
		);
	}

	// Calculate totals from minimal cart items
	const subtotal = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
	const shipping = 15; // Mock shipping cost
	const tax = subtotal * 0.17; // 17% VAT
	const total = 100;

	// Clear cart and clean up storage on successful order display
	const handleClearCartAndCleanup = () => {
		clearCart();
		sessionStorage.removeItem('cartItems');
		sessionStorage.removeItem('pendingPayment');
	};

	return (
		<div className="min-h-screen bg-gray-50 flex flex-col py-16">
			{/* Header Section */}
			<header className="container mx-auto py-8 text-center">
				<h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">
					{t("thankYou.title")}
				</h1>
			</header>

			<main className="container mx-auto px-4 flex-1 max-w-5xl">
				{/* Order Confirmation Section */}
				<div className="text-center mb-8">
					<p className="text-xl mb-2">{t("thankYou.successMessage")}</p>
					<p className="font-semibold mb-1">
						{t("thankYou.transactionId")}:{transactionUid || "#1234567890"}
					</p>
					<p className="text-gray-500">{t("checkout.email")}: {orderData?.data.customer_email || "test@test.com"}</p>
				</div>

				{/* Order Details Section */}
				<div className="bg-white rounded-lg shadow-md mb-8 overflow-hidden">
					<div className="bg-primary text-white px-6 py-4 flex items-center gap-2">
						<CheckCircleIcon className="h-5 w-5" />
						<h2 className="text-xl font-bold">{t("checkout.summaryTitle")}</h2>
					</div>
					<div className="p-6">
						<div className="space-y-4">
							{orderItems.map((item, index) => (
								<div
									key={index}
									className="grid grid-cols-1 md:grid-cols-3 gap-4 border-b border-gray-100 pb-4"
								>
									<div className="col-span-2">
										<p className="font-medium">{t('cart.item')} #{item.itemId}</p>
										<p className="text-gray-500 text-sm">{t('cart.size')}: {item.size}</p>
									</div>
									<div className="flex justify-between md:justify-end items-start gap-4">
										<p className="text-sm">
											{t("checkout.quantity")}: {item.quantity}
										</p>
										<p className="font-medium">
											₪{(item.price * item.quantity).toFixed(2)}
										</p>
									</div>
								</div>
							))}

							<div className="border-t border-gray-200 pt-4 mt-4"></div>

							<div className="space-y-2">
								<div className="flex justify-between">
									<p>{t("checkout.total")}</p>
									<p>₪{subtotal.toFixed(2)}</p>
								</div>
								<div className="flex justify-between">
									<p>{t("cart.shippingNote")}</p>
									<p>₪{shipping.toFixed(2)}</p>
								</div>
								<div className="flex justify-between">
									<p>{t("thankYou.tax")}</p>
									<p>₪{tax.toFixed(2)}</p>
								</div>
								<div className="border-t border-gray-200 my-2"></div>
								<div className="flex justify-between font-bold">
									<p>{t("checkout.grandTotal")}</p>
									<p>₪{total.toFixed(2)}</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Shipping & Payment Section */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
					<div className="bg-white rounded-lg shadow-md overflow-hidden">
						<div className="bg-primary text-white px-6 py-4 flex items-center gap-2">
							<TruckIcon className="h-5 w-5" />
							<h2 className="text-lg font-bold">
								{t("checkout.shippingAddress")}
							</h2>
						</div>
						<div className="p-6">
							<address className="not-italic">
								<p className="font-medium">
									{orderData?.data.card_information.card_holder_name || ""}
								</p>
								<p>{orderData?.data.customer_email || ""}</p>
								<p>
									{orderData?.data.card_information.identification_number || ""}
								</p>
							</address>
							<p className="mt-4 font-medium">
								{t("thankYou.estimatedDelivery")}:{" "}
								{formatDate(
									new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
								)}
							</p>
						</div>
					</div>

					<div className="bg-white rounded-lg shadow-md overflow-hidden">
						<div className="bg-primary text-white px-6 py-4 flex items-center gap-2">
							<CreditCardIcon className="h-5 w-5" />
							<h2 className="text-lg font-bold">
								{t("thankYou.paymentMethod")}
							</h2>
						</div>
						<div className="p-6">
							<div className="flex items-center gap-2">
								<div className="bg-primary/10 p-2 rounded">
									<CreditCardIcon className="h-5 w-5 text-primary" />
								</div>
								<div>
									<p className="font-medium">
										{orderData?.data.card_information.brand_id === 8
											? "Visa"
											: "Credit Card"}
									</p>
									<p className="text-gray-500">
										{t("thankYou.cardNumber")}: **** **** ****{" "}
										{orderData?.data.card_information.four_digits || ""}
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Next Steps & Support Section */}
				<div className="bg-white rounded-lg shadow-md mb-8 overflow-hidden">
					<div className="p-6">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div>
								<h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
									<TruckIcon className="h-5 w-5" />
									{t("thankYou.whatsNext")}
								</h3>
								<p className="text-gray-500">{t("thankYou.preparingOrder")}</p>
							</div>

							<div>
								<h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
									<HelpCircleIcon className="h-5 w-5" />
									{t("thankYou.needHelp")}
								</h3>
								<p className="text-gray-500">
									{t("thankYou.contactUs")}: support@tenat.co.il
								</p>
							</div>
						</div>
					</div>
				</div>

				{/* Call-to-Action Buttons */}
				<div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
					<Link
						to="/"
						onClick={handleClearCartAndCleanup}
						className="bg-primary hover:bg-primary/90 text-white font-bold py-3 px-6 rounded transition duration-300 flex items-center justify-center gap-2"
					>
						{t("thankYou.backToHome")}
						<ArrowRightIcon className="h-4 w-4" />
					</Link>
					<Link
						to="/products"
						onClick={handleClearCartAndCleanup}
						className="border border-primary text-primary hover:bg-primary/10 font-bold py-3 px-6 rounded transition duration-300"
					>
						{t("cart.continueShopping")}
					</Link>
				</div>
			</main>
		</div>
	);
};

export default ThankYou;
