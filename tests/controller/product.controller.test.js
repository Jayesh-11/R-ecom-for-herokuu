const { createProduct, getAllProduct } = require("../../controller/product");
const { Products } = require("../../models");
const { mockRequest, mockResponse } = require("../interceptor");

describe("Product controller testing", () => {
  let req, res;

  beforeEach(() => {
    req = mockRequest();
    res = mockResponse();
  });

  it("test success createProductController", async () => {
    const testPayload = {
      name: "Sony",
      description: "about tv",
      cost: 21929,
      quantity: 12,
      CategoryId: 1,
    };
    req.body = testPayload;
    const createProductSpy = jest
      .spyOn(Products, "create")
      .mockImplementation((testPayload) => Promise.resolve(testPayload));
    await createProduct(req, res);

    expect(createProductSpy).toHaveBeenCalled();
    expect(Products.create).toHaveBeenCalledWith(testPayload);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalled();
    expect(res.send).toHaveBeenCalledWith({
      msg: "Product got created",
      result: {
        name: "Sony",
        description: "about tv",
        cost: 21929,
        quantity: 12,
        CategoryId: 1,
      },
    });
  });
  it("test error createProductController", async () => {
    const testPayload = {
      name: "Sony",
      description: "about tv",
      cost: 21929,
      quantity: 12,
      CategoryId: 1,
    };
    req.body = testPayload;
    const createProductSpy = jest
      .spyOn(Products, "create")
      .mockImplementation(() => Promise.reject("hey creation err"));
    await createProduct(req, res);

    expect(createProductSpy).toHaveBeenCalled();
    expect(Products.create).toHaveBeenCalledWith(testPayload);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalled();
    expect(res.send).toHaveBeenCalledWith({
      msg: "Internal error",
      err: "hey creation err",
    });
  });
  it("test success findAll", async () => {
    const spy = jest.spyOn(Products, "findAll").mockImplementation(() => {
      return Promise.resolve([
        {
          name: "Sony",
          description: "about tv",
          cost: 21929,
          quantity: 12,
          CategoryId: 1,
        },
      ]);
    });
    await getAllProduct(req, res);
    expect(spy).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.send).toHaveBeenCalledWith([
      {
        name: "Sony",
        description: "about tv",
        cost: 21929,
        quantity: 12,
        CategoryId: 1,
      },
    ]);
  });
});
