import { Router } from "express";
import { check } from "express-validator";
import { getPosts, createPost, addOpinion, deleteOwnPost, updateOwnOpinion, deleteOwnOpinion } from "./post.controller.js";
import { validInputs } from "../middlewares/valid-inputs.js";
import { validateJWT} from "../middlewares/valid-jwt.js";
import { hasRole } from "../middlewares/valid-roles.js";

const router = Router();

router.get('/', getPosts);

router.post(
    '/', 
    [
        validateJWT,
        hasRole("ADMIN_ROLE"),
        validInputs,
    ],
    createPost);

router.put(
    '/:id',
    [
        validateJWT,
        validInputs
    ],
    addOpinion
);

router.delete(
    '/:id',
    [
        validateJWT,
        validInputs
    ],
    deleteOwnPost
);

router.put(
    '/myOpinion/:id',
    [
        validateJWT,
        validInputs
    ],
    updateOwnOpinion
);

router.delete(
    '/myOpinion/:id',
    [
        validateJWT,
        validInputs
    ],
    deleteOwnOpinion
);

export default router;


