import { Router } from "express";
import generateController from "../controller/controller";
const router = Router();

/**
 * API - Home Page
 * @description
 * API for Home Page
 */
router.get("/", generateController().Request_HomePage);

/**
 * API - 404 Not Found
 * @description
 * API for 404 Not Found
 */
router.get("*", generateController().Request_404);

export default router;
