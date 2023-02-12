import * as sql from "mssql";
import config from "./database";

const getUser = async (id: string) => {
  try {
    const pool = await sql.connect(config);
    const result = await pool
      .request()
      .input("id", sql.VarChar, id)
      .execute("getUser");
    return result.recordset;
  } catch (err) {
    console.log(err);
    return [];
  }
};

const getUsers = async () => {
  try {
    const pool = await sql.connect(config);
    const result = await pool.request().execute("getUsers");
    return result.recordset;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export { getUser, getUsers };
