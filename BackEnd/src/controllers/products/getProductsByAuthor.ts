import * as sql from "mssql";
import { Request, Response } from "express";

export async function getProductsByAuthor(req: Request, res: Response) {
  const author = req.params.author;
  try {
    const request = new sql.Request();
    request.input("author", sql.VarChar, author);
    const result = await request.execute("getProductByAuthor");
    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
}
