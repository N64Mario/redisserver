export default (app: any) => {
  app.put("/update/:id", require("./Update").default);
};
