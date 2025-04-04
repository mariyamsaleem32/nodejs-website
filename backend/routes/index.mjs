import { Router } from 'express';
import userRoutes from '../modules/user/routes.mjs';
// import productRoutes from '../modules/product/routes.mjs';
// import categoryRoutes from '../modules/categoy/routes.mjs';
// import uploadRoutes from "../modules/upload/routes.mjs";

const router = Router();

router.use('/user', userRoutes)
// router.use('/product', productRoutes)
// router.use('/category', categoryRoutes)
// router.use('/upload', uploadRoutes)

export default router;