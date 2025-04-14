const app = require("./app");
const { port } = require("./secret");

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
