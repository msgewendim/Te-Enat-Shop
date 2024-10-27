// This file is auto-generated by @hey-api/openapi-ts

export type Product = {
    /**
     * The unique identifier for the product.
     */
    _id: string;
    /**
     * The name of the product.
     */
    name: string;
    /**
     * A brief description of the product.
     */
    shortDescription: string;
    /**
     * An array of pricing and sizes options for the product.
     */
    pricing: Array<{
        /**
         * The weight option for the product.
         */
        size: string;
        /**
         * The price of the product for the given size.
         */
        price: number;
    }>;
    /**
     * A URL link for the product Image.
     */
    image: string;
    /**
     * A list of category names the product belongs to.
     */
    categories: Array<(string)>;
    /**
     * An optional list of benefits associated with the product.
     */
    features: {
        /**
         * The unique identifier for the feature.
         */
        id: string;
        value: Array<(Feature)>;
    };
    /**
     * An optional field for the total number of sales.
     */
    totalSales?: number;
};

export type Feature = {
    title: string;
    description: string;
};

export type PaymentFormPayload = {
    totalPrice: number;
    clientInfo: ClientDetails;
    products: Array<OrderItem>;
};

export type ClientDetails = {
    name: string;
    /**
     * Customer email address
     */
    email: string;
    mobile: string;
    address: string;
    city: string;
    zip?: string;
};

export type OrderItem = {
    description: string;
    quantity: number;
    size: string;
    price: number;
    currency: string;
    vatType: number;
};

export type ProductCardProps = {
    /**
     * Unique identifier for the product
     */
    _id: string;
    /**
     * Name of the product
     */
    name: string;
    /**
     * Price of the product
     */
    price: number;
    /**
     * URL of the product image
     */
    image: string;
    /**
     * List of categories the product belongs to
     */
    categories: Array<(string)>;
    /**
     * Rating of the product (e.g., 1 to 5)
     */
    rate: number;
    /**
     * A brief description of the product
     */
    shortDescription: string;
    /**
     * Optional size of the image (e.g., width or height)
     */
    imageSize?: number;
};

export type PaymentFormSuccessResponse = {
    success: boolean;
    url: string;
    /**
     * Error code if the payment failed
     */
    errorCode: number;
    errorMessage: string;
    /**
     * ID of the order created for the payment
     */
    orderId: string;
};

export type PaymentFormErrorResponse = {
    /**
     * Error code if the payment failed
     */
    errorCode: number;
    /**
     * Description of the error if the payment failed
     */
    errorMessage: string;
    /**
     * ID of the order created for the payment, if the payment failed
     */
    orderId: string;
};

export type Review = {
    /**
     * ID of the user who wrote the review
     */
    reviewerName?: string;
    /**
     * Rating given to the recipe (e.g., 1 to 5)
     */
    rating: number;
    /**
     * Comment provided by the user for the recipe
     */
    comment: string;
    /**
     * The date and time when the review was created
     */
    createdAt?: string;
};

export type User = {
    /**
     * Unique identifier for the user
     */
    _id: string;
    username: string;
    email: string;
    password?: string;
    /**
     * URL to the user's profile picture
     */
    profilePicture?: (string) | null;
    savedRecipes?: Array<Recipe>;
    orderHistory?: Array<Order>;
    wishlist?: Array<Product>;
    cart?: Array<CartItem>;
    addresses?: Array<Address>;
    recipeReviews?: Array<(string)>;
    productReviews?: Array<unknown>;
    createdAt?: string;
    /**
     * Indicates if the user has administrative privileges
     */
    isAdmin: (boolean) | null;
};

export type Order = {
    /**
     * Unique identifier for the order
     */
    _id?: string;
    /**
     * The ID of the user who placed the order
     */
    userId: string;
    products: Array<CartItem>;
    /**
     * Total amount for the order
     */
    total: number;
};

export type Address = {
    /**
     * Unique identifier for the address
     */
    id: string;
    street: string;
    city: string;
    zip: string;
};

export type CartItem = {
    /**
     * The product in the cart
     */
    product: Product;
    /**
     * Quantity of the product in the cart
     */
    quantity: number;
    /**
     * Size of the product in grams or kg
     */
    size: string;
    /**
     * Price of the product in the cart
     */
    price: number;
};

export type Recipe = {
    /**
     * Unique identifier for the recipe
     */
    _id: string;
    /**
     * Name of the recipe
     */
    name: string;
    /**
     * A brief description of what the recipe is about
     */
    description: string;
    /**
     * URL to an image of the recipe
     */
    image: string;
    ingredients: Array<(Ingredient)>;
    instructions: Array<(string)>;
    /**
     * Preparation time for the recipe (e.g., "30 minutes")
     */
    prepTime: string;
    /**
     * Difficulty level of the recipe
     */
    difficulty: 'Easy' | 'Medium' | 'Hard';
    categories: Array<(string)>;
    reviews?: Array<Review> | null;
    createdAt: string;
};

/**
 * Difficulty level of the recipe
 */
export enum difficulty {
    EASY = 'Easy',
    MEDIUM = 'Medium',
    HARD = 'Hard'
}

export type Category = {
    /**
     * The name of the product category in Hebrew
     */
    name: string;
    /**
     * The value of the product category in English
     */
    value: string;
};

export type PartialRecipe = {
    /**
     * Unique identifier for the recipe
     */
    _id: string;
    title: string;
    /**
     * URL to an image of the recipe
     */
    image: string;
};

export type Ingredient = {
    /**
     * Unique identifier for the ingredient In DB
     */
    _id?: string;
    name: string;
    /**
     * Amount of the ingredient required (e.g., "1 cup", "2 tbsp")
     */
    quantity: string;
};

export type GetAllProductsResponse = (Array<Product>);

export type GetAllProductsError = unknown;

export type PostProductsData = {
    body: Product;
};

export type PostProductsResponse = (unknown);

export type PostProductsError = (unknown);

export type GetProductData = {
    path: {
        /**
         * The product ID
         */
        id: string;
    };
};

export type GetProductResponse = (Product);

export type GetProductError = (unknown);

export type DeleteProductsByIdData = {
    path: {
        /**
         * The product ID
         */
        id: string;
    };
};

export type DeleteProductsByIdResponse = (void);

export type DeleteProductsByIdError = (unknown);

export type PutProductsByIdData = {
    body: Product;
    path: {
        /**
         * The product ID
         */
        id: string;
    };
};

export type PutProductsByIdResponse = (unknown);

export type PutProductsByIdError = (unknown);

export type PostOrdersV1PaymentsFormData = unknown;

export type PostOrdersV1PaymentsFormResponse = (PaymentFormSuccessResponse);

export type PostOrdersV1PaymentsFormError = (PaymentFormErrorResponse);

export type GetOrdersPaymentStatusResponse = ({
    status?: boolean;
    message?: string;
});

export type GetOrdersPaymentStatusError = ({
    error?: string;
    message?: string;
});