import * as sql from "mssql";
import { Request, Response } from "express";

export async function getAllProducts(req: Request, res: Response) {
  try {
    const request = new sql.Request();
    const result = await request.execute("getProduct");
    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
}
