// This file is auto-generated by @hey-api/openapi-ts

export const $Product = {
    type: 'object',
    required: ['_id', 'name', 'shortDescription', 'pricing', 'image', 'categories', 'features'],
    properties: {
        _id: {
            type: 'string',
            description: 'The unique identifier for the product.',
            example: '60d21b4667d0d8992e610c85'
        },
        name: {
            type: 'string',
            description: 'The name of the product.',
            example: 'Awesome Gadget'
        },
        shortDescription: {
            type: 'string',
            description: 'A brief description of the product.',
            example: 'A multi-functional gadget that makes your life easier.'
        },
        pricing: {
            type: 'array',
            description: 'An array of pricing and sizes options for the product.',
            items: {
                type: 'object',
                properties: {
                    size: {
                        type: 'ProductSize',
                        description: 'The weight option for the product.'
                    },
                    price: {
                        type: 'number',
                        format: 'float',
                        description: 'The price of the product for the given size.',
                        example: 19.99
                    }
                },
                required: ['size', 'price']
            }
        },
        image: {
            type: 'string',
            description: 'A URL link for the product Image.',
            format: 'uri',
            example: 'https://example.com/product-image.jpg'
        },
        categories: {
            type: 'array',
            description: 'A list of category names the product belongs to.',
            items: {
                '$ref': '#/components/schemas/Category'
            }
        },
        subCategories: {
            type: 'array',
            description: 'A list of sub-category names the product belongs to.',
            items: {
                '$ref': '#/components/schemas/SubCategory'
            }
        },
        features: {
            type: 'object',
            description: 'An optional list of benefits associated with the product.',
            properties: {
                _id: {
                    type: 'string',
                    description: 'The unique identifier for the feature.'
                },
                value: {
                    type: 'array',
                    items: {
                        type: 'Feature'
                    }
                }
            },
            required: ['id', 'value']
        },
        totalSales: {
            type: 'integer',
            description: 'An optional field for the total number of sales.',
            example: 5000
        }
    }
} as const;

export const $ProductSize = {
    type: 'object',
    properties: {
        sizeName: {
            type: 'string'
        },
        sizeQuantity: {
            type: 'number'
        }
    },
    required: ['sizeName', 'sizeQuantity']
} as const;

export const $Feature = {
    type: 'object',
    properties: {
        title: {
            type: 'string'
        },
        description: {
            type: 'string'
        }
    },
    required: ['title', 'description']
} as const;

export const $Package = {
    type: 'object',
    properties: {
        _id: {
            type: 'string'
        },
        name: {
            type: 'string'
        },
        image: {
            type: 'string'
        },
        price: {
            type: 'integer',
            format: 'float'
        },
        cookingTime: {
            type: 'integer',
            format: 'int'
        },
        ingredientsQuantity: {
            type: 'integer',
            format: 'int'
        },
        peoplesQuantity: {
            type: 'integer',
            format: 'int'
        }
    },
    required: ['_id', 'name', 'image', 'price', 'cookingTime', 'ingredientsQuantity', 'peoplesQuantity']
} as const;

export const $PaymentFormPayload = {
    type: 'object',
    properties: {
        totalPrice: {
            type: 'number',
            format: 'float'
        },
        clientInfo: {
            type: 'ClientDetails'
        },
        products: {
            type: 'array',
            items: {
                '$ref': '#/components/schemas/OrderItem'
            }
        }
    },
    required: ['totalPrice', 'clientInfo', 'products']
} as const;

export const $ClientDetails = {
    type: 'object',
    properties: {
        firstName: {
            type: 'string'
        },
        lastName: {
            type: 'string'
        },
        phone: {
            type: 'string',
            description: 'Customer phone number',
            format: 'phone'
        },
        email: {
            type: 'string',
            description: 'Customer email address',
            format: 'email'
        },
        street: {
            type: 'string',
            description: 'Customer street'
        },
        streetNum: {
            type: 'string',
            description: 'Customer street number'
        },
        city: {
            type: 'string',
            description: 'Customer city'
        },
        zip: {
            type: 'number',
            description: 'Customer zip code'
        },
        notes: {
            type: 'string',
            description: 'Customer notes'
        }
    },
    required: ['firstName', 'lastName', 'phone', 'email', 'street', 'streetNum', 'city']
} as const;

export const $OrderItem = {
    type: 'object',
    properties: {
        description: {
            type: 'string'
        },
        quantity: {
            type: 'integer'
        },
        unitPrice: {
            type: 'number',
            format: 'float'
        }
    },
    required: ['description', 'quantity', 'unitPrice']
} as const;

export const $ProductCardProps = {
    type: 'object',
    properties: {
        _id: {
            type: 'string',
            description: 'Unique identifier for the product'
        },
        name: {
            type: 'string',
            description: 'Name of the product'
        },
        price: {
            type: 'number',
            format: 'float',
            description: 'Price of the product'
        },
        image: {
            type: 'string',
            description: 'URL of the product image'
        },
        categories: {
            type: 'array',
            items: {
                type: 'string'
            },
            description: 'List of categories the product belongs to'
        },
        rate: {
            type: 'number',
            format: 'float',
            description: 'Rating of the product (e.g., 1 to 5)'
        },
        shortDescription: {
            type: 'string',
            description: 'A brief description of the product'
        },
        imageSize: {
            type: 'number',
            format: 'int32',
            description: 'Optional size of the image (e.g., width or height)'
        }
    },
    required: ['_id', 'name', 'price', 'image', 'categories', 'rate', 'shortDescription'],
    example: {
        _id: '647e59e1f9a4e7a1b4c3d7f4',
        name: 'Injera',
        price: 15.99,
        image: 'https://example.com/images/injera.jpg',
        categories: ['Bread', 'Traditional'],
        rate: 4.5,
        shortDescription: 'A traditional Ethiopian flatbread.',
        imageSize: 300
    }
} as const;

export const $PaymentFormSuccessResponse = {
    type: 'object',
    properties: {
        success: {
            type: 'boolean'
        },
        url: {
            type: 'string'
        },
        errorCode: {
            type: 'integer',
            description: 'Error code if the payment failed'
        },
        errorMessage: {
            type: 'string'
        },
        orderId: {
            type: 'string',
            description: 'ID of the order created for the payment'
        }
    },
    required: ['errorCode', 'errorMessage', 'success', 'url', 'orderId']
} as const;

export const $PaymentFormErrorResponse = {
    type: 'object',
    properties: {
        errorCode: {
            type: 'integer',
            description: 'Error code if the payment failed'
        },
        errorMessage: {
            type: 'string',
            description: 'Description of the error if the payment failed'
        },
        orderId: {
            type: 'string',
            description: 'ID of the order created for the payment, if the payment failed'
        }
    },
    required: ['errorCode', 'errorMessage', 'orderId']
} as const;

export const $Review = {
    type: 'object',
    properties: {
        reviewerName: {
            type: 'string',
            description: 'ID of the user who wrote the review'
        },
        rating: {
            type: 'integer',
            format: 'int32',
            description: 'Rating given to the recipe (e.g., 1 to 5)',
            minimum: 1,
            maximum: 5
        },
        comment: {
            type: 'string',
            description: 'Comment provided by the user for the recipe'
        },
        createdAt: {
            type: 'Date',
            format: 'date-time',
            description: 'The date and time when the review was created'
        }
    },
    required: ['userId', 'recipeId', 'rating', 'comment'],
    example: {
        userId: '647e59e1f9a4e7a1b4c3d7f4',
        recipeId: '647e59f1f9a4e7a1b4c3d7f5',
        rating: 5,
        comment: 'Amazing recipe! The instructions were easy to follow, and the dish turned out great.',
        createdAt: '2023-08-20T12:45:00Z'
    }
} as const;

export const $User = {
    type: 'object',
    properties: {
        _id: {
            type: 'string',
            description: 'Unique identifier for the user'
        },
        username: {
            type: 'string'
        },
        email: {
            type: 'string',
            format: 'email'
        },
        password: {
            type: 'string'
        },
        profilePicture: {
            type: 'string',
            nullable: true,
            description: "URL to the user's profile picture"
        },
        savedRecipes: {
            type: 'array',
            items: {
                '$ref': '#/components/schemas/Recipe'
            }
        },
        orderHistory: {
            type: 'array',
            items: {
                '$ref': '#/components/schemas/Order'
            }
        },
        wishlist: {
            type: 'array',
            items: {
                '$ref': '#/components/schemas/Product'
            }
        },
        cart: {
            type: 'array',
            items: {
                '$ref': '#/components/schemas/CartItem'
            }
        },
        addresses: {
            type: 'array',
            items: {
                '$ref': '#/components/schemas/Address'
            }
        },
        recipeReviews: {
            type: 'array',
            items: {
                type: 'string'
            }
        },
        productReviews: {
            type: 'array',
            items: '$ref:"#components/schemas/Review"'
        },
        createdAt: {
            type: 'string',
            format: 'date-time'
        },
        isAdmin: {
            type: 'boolean',
            nullable: true,
            description: 'Indicates if the user has administrative privileges'
        }
    },
    required: ['_id', 'username', 'email', 'isAdmin']
} as const;

export const $Order = {
    type: 'object',
    properties: {
        _id: {
            type: 'string',
            description: 'Unique identifier for the order'
        },
        userDetails: {
            type: 'ClientDetails'
        },
        products: {
            type: 'array',
            items: {
                type: 'OrderItem'
            }
        },
        totalPrice: {
            type: 'number',
            format: 'float'
        },
        paymentStatus: {
            type: 'string',
            enum: ['pending', 'succeeded', 'failed'],
            default: 'pending'
        },
        orderStatus: {
            type: 'string',
            enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
            default: 'pending'
        },
        createdAt: {
            type: 'string',
            format: 'date-time'
        },
        updatedAt: {
            type: 'string',
            format: 'date-time'
        }
    },
    required: ['_id', 'userDetails', 'products', 'totalPrice', 'paymentStatus', 'orderStatus']
} as const;

export const $Address = {
    type: 'object',
    properties: {
        id: {
            type: 'string',
            description: 'Unique identifier for the address'
        },
        street: {
            type: 'string'
        },
        city: {
            type: 'string'
        },
        zip: {
            type: 'string'
        }
    },
    required: ['id', 'street', 'city', 'zip']
} as const;

export const $CartItem = {
    type: 'object',
    properties: {
        item: {
            oneOf: [
                {
                    '$ref': '#/components/schemas/Product'
                },
                {
                    '$ref': '#/components/schemas/Package'
                }
            ],
            description: 'The item in the cart'
        },
        quantity: {
            type: 'integer',
            description: 'Quantity of the product in the cart'
        },
        size: {
            type: 'string',
            description: 'Size of the product in grams or kg'
        },
        price: {
            type: 'number',
            format: 'float',
            description: 'Price of the product in the cart'
        }
    },
    required: ['item', 'quantity', 'size', 'price']
} as const;

export const $Recipe = {
    type: 'object',
    properties: {
        _id: {
            type: 'string',
            description: 'Unique identifier for the recipe'
        },
        name: {
            type: 'string',
            description: 'Name of the recipe'
        },
        description: {
            type: 'string',
            description: 'A brief description of what the recipe is about'
        },
        image: {
            type: 'string',
            description: 'URL to an image of the recipe'
        },
        ingredients: {
            type: 'array',
            items: {
                type: 'Ingredient'
            }
        },
        instructions: {
            type: 'array',
            items: {
                '$ref': '#/components/schemas/Instruction'
            }
        },
        servings: {
            type: 'integer',
            description: 'Number of servings the recipe can be prepared for'
        },
        prepTime: {
            type: 'string',
            description: 'Preparation time for the recipe (e.g., "30 minutes")'
        },
        difficulty: {
            type: 'string',
            enum: ['Easy', 'Medium', 'Hard'],
            description: 'Difficulty level of the recipe'
        },
        categories: {
            type: 'array',
            items: {
                '$ref': '#/components/schemas/Category',
                description: 'Names of categories the recipe belongs to'
            }
        },
        reviews: {
            type: 'array',
            items: {
                '$ref': '#/components/schemas/Review'
            },
            nullable: true
        },
        createdAt: {
            type: 'string',
            format: 'date-time'
        }
    },
    required: ['_id', 'name', 'description', 'image', 'ingredients', 'instructions', 'servings', 'prepTime', 'difficulty', 'createdAt', 'categories']
} as const;

export const $Category = {
    type: 'object',
    properties: {
        nameInHebrew: {
            type: 'string',
            description: 'The name of the product category in Hebrew',
            example: 'תבלינים'
        },
        nameInEnglish: {
            type: 'string',
            description: 'The value of the product category in English',
            example: 'Spices'
        }
    },
    required: ['nameInHebrew', 'nameInEnglish']
} as const;

export const $SubCategory = {
    type: 'object',
    properties: {
        nameInHebrew: {
            type: 'string'
        },
        nameInEnglish: {
            type: 'string'
        },
        nameOfParentCategory: {
            type: 'string'
        }
    },
    required: ['nameInHebrew', 'nameInEnglish', 'nameOfParentCategory']
} as const;

export const $Ingredient = {
    type: 'object',
    properties: {
        _id: {
            type: 'string',
            description: 'Unique identifier for the ingredient In DB'
        },
        name: {
            type: 'string'
        },
        quantity: {
            type: 'string',
            description: 'Amount of the ingredient required (e.g., "1 cup", "2 tbsp")'
        },
        existsInProducts: {
            type: 'boolean',
            default: false,
            description: 'Indicates if the ingredient exists in the products collection'
        }
    },
    required: ['name', 'quantity', 'existsInProducts']
} as const;

export const $Instruction = {
    type: 'object',
    properties: {
        step: {
            type: 'integer'
        },
        description: {
            type: 'string'
        },
        _id: {
            type: 'string'
        }
    },
    required: ['step', 'description']
} as const;

export const $RandomItemsResponse = {
    type: 'object',
    properties: {
        success: {
            type: 'boolean'
        },
        message: {
            type: 'string'
        },
        data: {
            type: 'RandomItemData'
        }
    },
    required: ['success', 'message', 'data']
} as const;

export const $RandomItemData = {
    type: 'object',
    properties: {
        items: {
            type: 'array',
            items: {
                type: 'RandomItem'
            }
        },
        currentPage: {
            type: 'integer'
        },
        totalPages: {
            type: 'integer'
        }
    },
    required: ['items', 'currentPage', 'totalPages']
} as const;

export const $RandomItem = {
    oneOf: [
        {
            '$ref': '#/components/schemas/Product'
        },
        {
            '$ref': '#/components/schemas/Recipe'
        },
        {
            '$ref': '#/components/schemas/Package'
        }
    ]
} as const;

export const $SuccessResponse = {
    type: 'object',
    properties: {
        success: {
            type: 'boolean'
        },
        message: {
            type: 'string'
        },
        data: {
            oneOf: [
                {
                    type: 'object',
                    '$ref': '#/components/schemas/RandomItem'
                },
                {
                    type: 'array',
                    items: {
                        '$ref': '#/components/schemas/RandomItem'
                    }
                }
            ]
        }
    },
    required: ['success', 'message', 'data']
} as const;

export const $ErrorResponse = {
    type: 'object',
    properties: {
        success: {
            type: 'boolean'
        },
        message: {
            type: 'string'
        }
    },
    required: ['success', 'message']
} as const;