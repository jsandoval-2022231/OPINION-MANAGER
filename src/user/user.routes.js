import { Router } from "express";
import { check } from "express-validator";
import {
  createUser,
  getUsers,
  updateOwnUser,
} from "./user.controller.js";
import { existsEmail, existsUserById } from "../helpers/db-validators.js";
import { validInputs } from "../middlewares/valid-inputs.js";
import { validateJWT} from "../middlewares/valid-jwt.js";
import { hasRole } from "../middlewares/valid-roles.js";

const router = Router();

router.get('/', [
    validateJWT,
    hasRole("ADMIN_ROLE"),
    ],getUsers);

router.post(
    '/', 
    [
        validateJWT,
        hasRole("ADMIN_ROLE"),
        check("name", "Name required").not().isEmpty(),
        check("email", "Email required").not().isEmpty(),
        check("email", "Email invalid").isEmail(),
        check('email').custom(existsEmail),
        check("password", "Password required").not().isEmpty(),
        check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
        validInputs,
    ],
    createUser);

router.put(
    '/',
    [
        validateJWT,
        validInputs
    ],
    updateOwnUser
);


export default router;
