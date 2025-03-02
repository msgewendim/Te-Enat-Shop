// interface PayplusGenLinkPayload {
//   payment_page_uid: string;
//   charge_method: typeof CHARGE_METHOD[keyof typeof CHARGE_METHOD];
//   currency_code: string;
//   amount: number;
//   sendEmailApproval: boolean;
//   sendEmailFailure: boolean;
//   send_failure_callback: boolean;
//   customer: {
//     customer_name: string;
//     email: string;
//     phone: string;
//     city: string;
//     address: string;
//     postal_code: string;
//   };
//   items: Array<{
//     name: string;
//     quantity: number;
//     price: number;
//     product_invoice_extra_details?: string;
//   }>;
//   success_url: string;
//   failure_url: string;
//   cancel_url: string;
//   refURL_success: string;
//   refURL_failure?: string;
//   refURL_cancel?: string;
//   more_info?: string;
//   language_code?: string;
//   payments?: number;
//   max_payments?: number;
// }

export const CHARGE_METHOD = {
	CHECK: 0,
	CHARGE: 1,
	APPROVAL: 2,
	RECURRING_PAYMENTS: 3,
	REFUND: 4,
	TOKEN: 5,
} as const;

// nullable if send in item "product_uid" we will use this product or send error,
// if send "name" and not "product_uid" we will create new product with this name.
// more option to send if ("name" && !product_uid): vat_type, barcode, value,price.last option we will use default product

interface PayplusRequestHeaders {
	"api-key": string;
	"secret-key": string;
}

interface PayplusGenLinkResponse200 {
	results: {
		status: string;
		description: string;
		code: number;
	};
	data: {
		page_request_uid: string;
		payment_page_link: string;
		qr_code_image: string;
		hosted_fields_uuid?: string;
	};
}

interface PayplusGenLinkResponse422 {
	message: string;
}

// export interface PayPlusLinkResponse {
//   status_code: number;
//   status_error_details?: string;
//   data?: {
//     page_request_url: string;
//     page_request_uid: string;
//   };
// }

export interface PayPlusLinkPayload {
	items: Array<{
		name: string;
		quantity: number;
		price: number;
	}>;
	customer: {
		customer_name: string;
		email: string;
		phone: string;
		city: string;
		address: string;
		postal_code: string;
	};
	charge_method: (typeof CHARGE_METHOD)[keyof typeof CHARGE_METHOD];
	max_payments: number;
	currency_code: string;
	payment_page_uid: string;
	amount: number;
	description?: string;
	success_url?: string;
	failure_url?: string;
	cancel_url?: string;
	more_info?: string;
	refURL_success?: string;
	refURL_failure?: string;
	refURL_cancel?: string;
}
// Customer information interface
interface PayplusCustomer {
	customer_name: string;
	email: string;
	phone?: string;
	address?: string;
	city?: string;
	country?: string;
}

// Secure 3D settings interface
interface Secure3DSettings {
	active?: boolean;
	force?: boolean;
	auth_only?: boolean;
}

// Recurring payment settings interface
interface RecurringSettings {
	recurring_type: number; // Type of recurring payment
	recurring_amount?: number; // Amount for recurring payments
	recurring_day?: number; // Day of month for recurring
	recurring_stop?: string; // Stop date for recurring (ISO format)
}

// Main payment configuration interface
interface PayplusGenLinkPayload {
	// Required fields
	payment_page_uid: string;
	charge_method: number; // 0=Check, 1=Charge, 2=Approval, 3=Recurring, 4=Refund, 5=Token
	amount: number;
	currency_code: string;
	sendEmailApproval: boolean;
	sendEmailFailure: boolean;
	send_failure_callback: boolean;

	// Redirect and callback URLs
	refURL_success?: string; // Redirect URL for successful payment
	refURL_failure?: string; // Redirect URL for failed payment
	refURL_cancel?: string; // Redirect URL for cancelled payment
	refURL_callback?: string; // IPN/Webhook URL for payment notifications

	// Optional payment configuration
	language_code?: string; // Default: 'he'
	expiry_datetime?: string; // Minutes until link expires
	charge_default?:
		| "credit-card"
		| "bit"
		| "multipass"
		| "paypal"
		| "praxell"
		| "valuecard"
		| "verifone";
	hide_other_charge_methods?: boolean;
	payments?: number; // Number of installments
	payments_credit?: boolean; // Enable credit payments
	payments_selected?: number; // Pre-selected number of payments
	payments_first_amount?: number;

	// Security and processing options
	create_hash?: boolean; // Encrypt customer details in callbacks
	create_token?: boolean; // Store payment method for future use
	support_track2?: boolean; // Enable track2 support
	add_user_information?: boolean;
	hide_identification_id?: boolean;

	// Payment method restrictions
	allowed_cards?: string[]; // e.g., ['mastercard', 'visa']
	allowed_bins?: number[]; // 6 or 8 digit BIN numbers
	allowed_charge_methods?: string[]; // e.g., ['credit-card', 'google-pay']
	allowed_issuers?: string[];

	// Customer notifications
	send_customer_success_sms?: boolean;
	customer_failure_sms?: boolean;

	// Invoice settings
	custom_invoice_name?: string;
	initial_invoice?: boolean;
	invoice_language?: boolean;
	paying_vat?: boolean;
	close_doc?: string;

	// Additional information fields
	more_info?: string;
	more_info_2?: string;
	more_info_3?: string;
	more_info_4?: string;
	more_info_5?: string;
	show_more_info?: boolean;

	// Related objects
	customer?: PayplusCustomer;
	recurring_settings?: RecurringSettings;
	secure3d?: Secure3DSettings;
	items?: Array<{
		product_uid?: string;
		name?: string;
		vat_type?: number;
		barcode?: string;
		value?: number;
		price?: number;
	}>;
}

// Request headers interface
interface PayplusHeaders {
	"api-key": string;
	"secret-key": string;
	"Content-Type": "application/json";
}

interface PayplusPaymentResponse {
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
		type: "payment_page"; // Could be expanded if there are other types
		date: string;
		status_code: string;
		amount: number;
		currency: string;
		credit_terms: "regular" | string; // Could be expanded with other possible terms
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
		items: Array<unknown>; // Type can be expanded based on actual items structure
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
export interface SimplifiedTransaction {
  transaction_type: string;
  transaction: {
    transaction_uid: string;
    transaction_status: string;
    transaction_amount: number;
    transaction_currency: string;
    transaction_date: string;
  };
  payments: {
    number_of_payments: number;
    first_payment_amount: number;
    rest_payments_amount: number;
  };
  added_info: string | null;
  customer_info: {
    customer_uid: string;
    terminal_uid: string;
    card_holder_name: string;
  };
}

// You might also want to create some utility types for specific parts of the response
type PayplusTransactionStatus = {
	code: string;
	isSuccessful: boolean;
};

// Helper function to check if transaction is successful
export const isSuccessfulTransaction = (statusCode: string): boolean => {
	return statusCode === "000"; // Add other success codes if they exist
};

// Example of expected transaction status codes
enum PayplusStatusCodes {
	Success = "000",
	// Add other status codes as needed
}
export type {
	PayplusCustomer,
	PayplusHeaders,
	PayplusGenLinkPayload,
	PayplusRequestHeaders,
	PayplusGenLinkResponse200,
	PayplusGenLinkResponse422,
	PayplusPaymentResponse,
	PayplusStatusCodes,
  PayplusTransactionStatus,
  RecurringSettings,
  Secure3DSettings,

};
