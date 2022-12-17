const checkout = require("./index.js");

describe("checkout", () => {
  it("returns an object", () => {
    const checkoutOne = checkout({});
    console.log('Danesh', checkoutOne)
    expect(typeof checkoutOne).toBe("object")
  })
})