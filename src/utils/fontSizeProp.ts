export default {
  type: String,
  default: "general",
  validator: (val: string) =>
    [
      "small",
      "general",
      "longread",
      "augmented",
      "h5",
      "h4",
      "h3",
      "h2",
      "h1"
    ].includes(val)
};
