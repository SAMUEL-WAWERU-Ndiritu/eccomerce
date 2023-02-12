import * as sql from "mssql";
import { Request, Response } from "express";

export async function getSingleProduct(req: Request, res: Response) {
  const title = req.params.title;
  try {
    const request = new sql.Request();
    request.input("title", sql.VarChar, title);
    const result = await request.execute("getSingleProduct");
    res.json(result.recordset[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
}
