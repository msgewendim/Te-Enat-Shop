import request from "supertest";
import { testServer } from "../index.test";
import { ProductService } from "../../src/Service/ProductService";
import ProductDal from "../../src/Dal/ProductDal";

// Mock the ProductService
jest.mock("../../src/Service/ProductService");

describe("ProductController", () => {
  let productService: ProductService;

  beforeEach(() => {
    productService = new ProductService(new ProductDal());
  });

  it("should fetch a product by ID", async () => {
    const productId = "6740a0b54db89f5a8feb0b24";
    const mockProduct = {
      _id: productId,
      name: "Test Product",
    };
    (productService.getProduct as jest.Mock).mockResolvedValue(mockProduct);

    const response = await request(testServer).get(
      `/api/products/${productId}`
    );
    expect(response.status).toBe(200);
    expect(response.body.data).toBe(mockProduct);
    expect(response.body).toBe({
      success: true,
      message: "Product fetched successfully",
      data: mockProduct,
    });
  });

  // it("should return 400 for invalid product ID", async () => {
  //   const response = await request(testServer).get("/api/products/invalidId");
  //   expect(response.status).toBe(400);
  //   expect(response.body).toEqual({
  //     success: false,
  //     message: "Invalid product ID format",
  //   });
  // });

  // it("should fetch all products", async () => {
  //   const mockProducts = [
  //     { _id: "1", name: "Product 1" },
  //     { _id: "2", name: "Product 2" },
  //   ];
  //   (productService.getAllProducts as jest.Mock).mockResolvedValue(
  //     mockProducts
  //   );

  //   const response = await request(testServer).get("/api/products");
  //   expect(response.status).toBe(200);
  //   expect(response.body).toEqual({
  //     success: true,
  //     message: "Products fetched successfully",
  //     data: mockProducts,
  //   });
  // });

  // it("should add a product", async () => {
  //   const newProduct = { name: "New Product" };
  //   (productService.addProduct as jest.Mock).mockResolvedValue(undefined);

  //   const response = await request(testServer)
  //     .post("/api/products")
  //     .send(newProduct);
  //   expect(response.status).toBe(201);
  //   expect(response.body).toEqual({
  //     success: true,
  //     message: "Product Added to DB!",
  //   });
  // });

  // it("should update a product", async () => {
  //   const productId = "1";
  //   const updatedProduct = { name: "Updated Product" };
  //   (productService.updateProduct as jest.Mock).mockResolvedValue(undefined);

  //   const response = await request(testServer)
  //     .put(`/api/products/${productId}`)
  //     .send(updatedProduct);
  //   expect(response.status).toBe(201);
  //   expect(response.body).toEqual({
  //     success: true,
  //     message: "Product Updated!",
  //   });
  // });

  // it("should fetch random products", async () => {
  //   const mockRandomProducts = [{ _id: "1", name: "Random Product 1" }];
  //   (productService.getRandomProducts as jest.Mock).mockResolvedValue(
  //     mockRandomProducts
  //   );

  //   const response = await request(testServer).get("/api/products/random");
  //   expect(response.status).toBe(200);
  //   expect(response.body).toEqual({
  //     success: true,
  //     message: "Random products fetched successfully",
  //     data: mockRandomProducts,
  //   });
  // });
});
