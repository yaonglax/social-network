const app = require("./app");
const sequelize = require("./config/db");

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("Success!");

    await sequelize.sync();

    app.listen(3000, () => console.log("Сервер запущен на порту 3000"));
  } catch (error) {
    console.error(error);
    console.log("Ошибка подключения");
  }
};

startServer();
