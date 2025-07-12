import crypto from "crypto";
import { NextFunction, Request, Response } from "express";

export function verifyCsrfToken(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const csrfCookie = req.cookies["csrfToken"];
  const csrfHeader = req.headers["x-csrf-token"];

  if (!csrfCookie || !csrfHeader) {
    return res.status(403).json({ message: "Token CSRF inválido." });
  }

  try {
    const csrfCookieBuffer = Buffer.from(csrfCookie, "hex");
    const csrfHeaderBuffer = Buffer.from(csrfHeader, "hex");

    if (
      csrfCookieBuffer.length !== csrfHeaderBuffer.length ||
      !crypto.timingSafeEqual(csrfCookieBuffer, csrfHeaderBuffer)
    ) {
      return res.status(403).json({ message: "Token CSRF inválido." });
    }
  } catch (error) {
    return res.status(403).json({ message: "Formato de Token CSRF inválido." });
  }
  next();
}
