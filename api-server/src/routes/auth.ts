import { Router, type IRouter } from "express";
import jwt from "jsonwebtoken";
import { LoginBody } from "@workspace/api-zod";

const router: IRouter = Router();

const JWT_SECRET = process.env.SESSION_SECRET ?? "hello-kitty-dev-secret";
const SHARED_PASSWORD = process.env.SHARED_PASSWORD ?? "kittubaby";

router.post("/auth/login", async (req, res): Promise<void> => {
  const parsed = LoginBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid request body" });
    return;
  }

  const { password } = parsed.data;

  if (password !== SHARED_PASSWORD) {
    req.log.warn("Failed login attempt");
    res.status(401).json({ error: "Incorrect password. Try again, love. 🔒" });
    return;
  }

  const token = jwt.sign({ authenticated: true }, JWT_SECRET, {
    expiresIn: "30d",
  });

  req.log.info("Successful login");
  res.json({ token, message: "Welcome back, love. 💌" });
});

router.get("/auth/verify", async (req, res): Promise<void> => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    res.status(401).json({ error: "No token provided" });
    return;
  }

  const token = authHeader.slice(7);
  try {
    jwt.verify(token, JWT_SECRET);
    res.json({ valid: true, message: "Token is valid" });
  } catch {
    res.status(401).json({ error: "Invalid or expired token" });
  }
});

export default router;
