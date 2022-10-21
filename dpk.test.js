const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  describe("Input has a partitionKey", () => {
    describe("string partitionKey", () => {
      it("Returns the partitionKey as it is", () => {
        const event = { partitionKey: "xyz" };
        const trivialKey = deterministicPartitionKey(event);
        expect(trivialKey).toBe("xyz");
      });
      it("Returns a hashed partitionKey if input partition key length > 256", () => {
        const longKey = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum nec sodales lorem, sed suscipit magna. Proin sit amet molestie lorem. Suspendisse potenti. In rutrum, elit eget convallis varius, ipsum augue molestie velit, ut laoreet nisl lacus in enim. Vivamus non nibh quam. Quisque quam risus, luctus vitae est vel, porta dignissim augue. Aliquam nec lectus erat. Donec nec arcu viverra, porttitor diam eu, lobortis justo. Vestibulum sed laoreet augue. Nam varius, nunc vel suscipit erat curae."
        const event = { partitionKey: longKey };
        const expectedHash = "869c314ebae65c25b4d2b67afcc422395381895774c81a608c93fc3552aa37686518d68d27f7a22626aa32ee89a5ff6a5f533f776e939e528d5f26f27782d3e4"
        const trivialKey = deterministicPartitionKey(event);
        expect(trivialKey).toBe(expectedHash);
      });
    });

    describe("non-string partitionKey", () => {
      it("Returns the stringified partitionKey", () => {
        const event = { partitionKey: 123 };
        const trivialKey = deterministicPartitionKey(event);
        expect(trivialKey).toBe("123");
      });

      it("Returns a hashed partitionKey if input partition key length > 256 when stringified", () => {
        const longKey = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum nec sodales lorem, sed suscipit magna. Proin sit amet molestie lorem. Suspendisse potenti. In rutrum, elit eget convallis varius, ipsum augue molestie velit, ut laoreet nisl lacus in enim. Vivamus non nibh quam. Quisque quam risus, luctus vitae est vel, porta dignissim augue. Aliquam nec lectus erat. Donec nec arcu viverra, porttitor diam eu, lobortis justo. Vestibulum sed laoreet augue. Nam varius, nunc vel suscipit erat curae."
        const event = { abc: longKey };
        const expectedHash = "1139dc591b9c9f414f63bc5ea727200e3a40a5692aae59063b38dfcf3e0ba6dbf209bbfd8f885210b1a041ca1f3793622ec3ea2c79338a9eb7193d4d56a78ca0"
        const trivialKey = deterministicPartitionKey(event);
        expect(trivialKey).toBe(expectedHash);
      });
    });
  });

  describe("Event has no partitionKey", () => {
    it("Returns the hashed version of the event", () => {
      const event = { abc: 123 };
      console.log(deterministicPartitionKey({}));
      console.log(deterministicPartitionKey({sas:2}));
      console.log(deterministicPartitionKey({asasas:2 , asas :2324, asaswa:3}));

      const expectedHash = "73911271eabc9e1b8b10429a068b2e899330179f7552bf12a2a4037783c7b2a7001f894e321a8315a37f43be7c97875e9c2841b45a3e4799c853456c1a1d1166"
      const trivialKey = deterministicPartitionKey(event);
      expect(trivialKey).toBe(expectedHash);
    });
  });

});
