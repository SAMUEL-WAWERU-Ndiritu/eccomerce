import * as sql from "mssql";

const config = {
  user: "your_db_user",
  password: "your_db_password",
  server: "your_db_server",
  database: "your_db_name",
};

const connect = async () => {
  return await sql.connect(config);
};

export default connect;
