import { Router } from "express";
import { Request_HomePage, Request_404 } from "../controller/controller";
const router = Router();

/**
 * API - Home Page
 * @description
 * API for Home Page
 */
router.get("/", Request_HomePage);

/**
 * API - 404 Not Found
 * @description
 * API for 404 Not Found
 */
router.get("*", Request_404);

export default router;
