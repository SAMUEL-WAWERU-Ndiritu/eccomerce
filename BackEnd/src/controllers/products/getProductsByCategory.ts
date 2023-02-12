import * as sql from "mssql";
import { Request, Response } from "express";

export async function getProductsByCategory(req: Request, res: Response) {
  const category = req.params.category;
  try {
    const request = new sql.Request();
    request.input("category", sql.VarChar, category);
    const result = await request.execute("getProductByCategory");
    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
}
