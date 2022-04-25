const cors = require("cors");
const dotenv = require('dotenv');

dotenv.config();

const setUpCors = (app) => {

    app.use(
        cors({
          credentials:true,
          origin:process.env.URL_ORIGIN,
        })
      );

}

module.exports = setUpCors;