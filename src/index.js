const app = require("./app");
const connectDB = require("./config/db");
const { port } = require("./secret");

app.listen(port, async () => {
  console.log(`App is listening on port ${port}`);
  await connectDB();
});
