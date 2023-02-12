import * as sql from "mssql";
import { Request, Response } from "express";

export async function softDeleteProduct(req: Request, res: Response) {
  const title = req.params.title;
  try {
    const request = new sql.Request();
    request.input("title", sql.VarChar, title);
    await request.execute("softDeleteProduct");
    res.send("Product deleted");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
}
