import raw from "raw.macro";

test("read relative file path using swc plugin", () => {
  const text = raw("./fixtures/swc.txt");
  expect(text).toEqual("Hello, swc plugins!\n");
});
