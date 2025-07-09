.
├── docs
│   ├── project-stracture.md
│   ├── refactoring-plan.md
│   └── todo.md
├── public
│   ├── locales
│   │   └── he
│   │       └── translation.json
│   ├── hero-bg.svg
│   ├── ProductPageBanner.svg
│   ├── RecipeBanner.svg
│   ├── RecipesBanner.svg
│   ├── ShopBanner.svg
│   └── videoProduct.png
├── src
│   ├── assets
│   │   ├── adamame.jpg
│   │   ├── awaze.jpg
│   │   ├── banner.png
│   │   ├── batata.jpg
│   │   ├── berbere.jpg
│   │   ├── beyaynetu.jpg
│   │   ├── bowl-chicken.jpg
│   │   ├── buna.jpg
│   │   ├── cake.jpg
│   │   ├── cookies.jpg
│   │   ├── dessert.jpg
│   │   ├── enjera.jpg
│   │   ├── enqulal-firfir.jpg
│   │   ├── firfir.jpg
│   │   ├── fresh-fruites.jpg
│   │   ├── fresh-salad.jpg
│   │   ├── habash-beer.jpg
│   │   ├── hamutsim.jpg
│   │   ├── hot-shiro.jpg
│   │   ├── hot-vegtables.jpg
│   │   ├── hummus.jpg
│   │   ├── Image.svg
│   │   ├── injera-tibis.jpg
│   │   ├── kik.jpg
│   │   ├── kimem-2.jpg
│   │   ├── kimem.jpg
│   │   ├── kitfo.jpg
│   │   ├── krep-2.jpg
│   │   ├── krep-3.jpg
│   │   ├── krep.jpg
│   │   ├── kurkum.jpg
│   │   ├── main-photo.jpg
│   │   ├── malabi.jpg
│   │   ├── menu-2.jpg
│   │   ├── menu.jpg
│   │   ├── mojito.jpg
│   │   ├── mushrooms.jpg
│   │   ├── musli.jpg
│   │   ├── omlet.jpg
│   │   ├── orange-juice.jpg
│   │   ├── pasta.jpg
│   │   ├── roll-injera.jpg
│   │   ├── salad.jpg
│   │   ├── shawarma.jpg
│   │   ├── shiro.jpg
│   │   ├── singlePagePhoto.png
│   │   ├── soup.jpg
│   │   ├── spices.jpg
│   │   ├── tavlinim.jpg
│   │   ├── testimonial.svg
│   │   ├── tibs.jpg
│   │   ├── veggie.svg
│   │   └── wine.jpg
│   ├── client
│   │   ├── index.ts
│   │   ├── schemas.gen.ts
│   │   ├── services.gen.ts
│   │   └── types.gen.ts
│   ├── components
│   │   ├── admin
│   │   │   ├── hooks
│   │   │   │   ├── useDashboard.tsx
│   │   │   │   ├── useOrdersDashboard.tsx
│   │   │   │   ├── usePackagesDashboard.tsx
│   │   │   │   ├── useProductsDashboard.tsx
│   │   │   │   └── useRecipesDashboard.tsx
│   │   │   ├── orders
│   │   │   │   └── index.tsx
│   │   │   ├── packages
│   │   │   │   ├── PackageForm.tsx
│   │   │   │   └── PackageList.tsx
│   │   │   ├── products
│   │   │   │   ├── AddArrayInputFields.tsx
│   │   │   │   ├── ProductForm.tsx
│   │   │   │   └── ProductList.tsx
│   │   │   ├── recipes
│   │   │   │   ├── AddArrayInputs.tsx
│   │   │   │   ├── RecipeForm.tsx
│   │   │   │   └── RecipesList.tsx
│   │   │   └── AdminRoute.tsx
│   │   ├── cart
│   │   │   ├── CartItemsList.tsx
│   │   │   ├── FloatingCart.tsx
│   │   │   └── SingleCartItem.tsx
│   │   ├── checkout
│   │   │   ├── CheckoutFormData.tsx
│   │   │   ├── CheckoutForm.tsx
│   │   │   └── CheckoutSummary.tsx
│   │   ├── error
│   │   │   └── Error.tsx
│   │   ├── home
│   │   │   ├── Features.tsx
│   │   │   ├── Grantees.tsx
│   │   │   ├── Hero.tsx
│   │   │   ├── OurSpecialty.tsx
│   │   │   ├── QAsection.tsx
│   │   │   ├── SpecialOffers.tsx
│   │   │   ├── TopCategory.tsx
│   │   │   └── WhoAreWe.tsx
│   │   ├── layout
│   │   │   ├── modals
│   │   │   │   ├── DesignProduct.tsx
│   │   │   │   └── EarlyAdapters.tsx
│   │   │   ├── nav
│   │   │   │   ├── AuthButton.tsx
│   │   │   │   ├── DesktopMenu.tsx
│   │   │   │   └── MobileMenu.tsx
│   │   │   ├── ContactForm.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Navbar.tsx
│   │   │   └── RelatedItems.tsx
│   │   ├── packages
│   │   │   ├── OurPackages.tsx
│   │   │   ├── PackageCard.tsx
│   │   │   ├── PackageInfo.tsx
│   │   │   └── PackageModal.tsx
│   │   ├── products
│   │   │   ├── FeatureElement.tsx
│   │   │   ├── PopupProduct.tsx
│   │   │   ├── ProductCard.tsx
│   │   │   └── TopProducts.tsx
│   │   ├── recipes
│   │   │   └── RecipeCard.tsx
│   │   ├── ui
│   │   │   ├── Banner.tsx
│   │   │   ├── BatchImageUploader.tsx
│   │   │   ├── Button.tsx
│   │   │   ├── CarouselButton.tsx
│   │   │   ├── Categories.tsx
│   │   │   ├── ConfirmModal.tsx
│   │   │   ├── DarkMode.tsx
│   │   │   ├── DropzoneImageUploader.tsx
│   │   │   ├── Filters.tsx
│   │   │   ├── FormButton.tsx
│   │   │   ├── FormInput.tsx
│   │   │   ├── Link.tsx
│   │   │   ├── Loader.tsx
│   │   │   ├── Logo.tsx
│   │   │   ├── ModalImageUploader.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Pagination.tsx
│   │   │   ├── Pattern.tsx
│   │   │   ├── RecipeCardModal.tsx
│   │   │   ├── Select.tsx
│   │   │   ├── SwitchLang.tsx
│   │   │   └── Table.tsx
│   │   └── Login.tsx
│   ├── hooks
│   │   ├── app
│   │   │   ├── useAddToCartModal.tsx
│   │   │   ├── useAddToCartPackage.tsx
│   │   │   ├── useAppContext.tsx
│   │   │   ├── useCheckoutFormData.tsx
│   │   │   ├── useGenericDashboard.tsx
│   │   │   ├── useGenericData.tsx
│   │   │   ├── useRandomCards.tsx
│   │   │   └── useRelatedItems.tsx
│   │   ├── auth
│   │   │   └── useAuth.tsx
│   │   ├── form
│   │   │   └── useFormUserData.tsx
│   │   ├── package
│   │   │   └── usePackages.tsx
│   │   ├── product
│   │   │   ├── useProductForm.tsx
│   │   │   ├── useProducts.ts
│   │   │   └── useShop.tsx
│   │   ├── recipe
│   │   │   ├── useGetProductsFromRecipe.tsx
│   │   │   ├── useRecipeData.tsx
│   │   │   ├── useRecipesForm.tsx
│   │   │   ├── useRecipes.ts
│   │   │   └── useRecipes.tsx
│   │   └── useAppData.ts
│   ├── pages
│   │   ├── About.tsx
│   │   ├── Admin.tsx
│   │   ├── Cart.tsx
│   │   ├── Checkout.tsx
│   │   ├── Contact.tsx
│   │   ├── Events.tsx
│   │   ├── Home.tsx
│   │   ├── Packages.tsx
│   │   ├── RecipePage.tsx
│   │   ├── Recipes.tsx
│   │   ├── Shop.tsx
│   │   ├── SingleProductPage.tsx
│   │   ├── SuccessPayment.tsx
│   │   └── ThankYou.tsx
│   ├── providers
│   │   ├── api
│   │   │   ├── GenericService.ts
│   │   │   ├── index.ts
│   │   │   ├── Orders.ts
│   │   │   ├── PackageService.ts
│   │   │   ├── ProductService.ts
│   │   │   └── Recipes.ts
│   │   ├── context
│   │   │   └── ContextProvider.tsx
│   │   └── interface
│   │       ├── admin.props.ts
│   │       ├── context.ts
│   │       ├── general.props.ts
│   │       ├── products.props.ts
│   │       └── recipes.props.ts
│   ├── routes
│   │   └── route.tsx
│   ├── stores
│   │   └── useCartStore.ts
│   ├── utils
│   │   ├── constants.ts
│   │   ├── env.config.ts
│   │   ├── examples.ts
│   │   ├── helperFunctions.ts
│   │   └── imageFiles.ts
│   ├── validation
│   │   ├── AddPackage.validation.ts
│   │   ├── AddProduct.validation.ts
│   │   ├── AddRecipe.validation.ts
│   │   └── ClientDetails.validation.ts
│   ├── App.tsx
│   ├── i18n.ts
│   ├── index.css
│   ├── main.tsx
│   └── vite-env.d.ts
├── index.html
├── openapi-ts.config.ts
├── package.json
├── package-lock.json
├── postcss.config.js
├── README.md
├── tailwind.config.js
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts

46 directories, 249 files
