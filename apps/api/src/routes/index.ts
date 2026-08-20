import { Router } from "express";
import authRoutes from "../modules/auth/auth.routes.js";
import userRoutes from "../modules/users/user.routes.js";
import productRoutes from "../modules/products/product.routes.js";
import orderRoutes from "../modules/orders/order.routes.js";
import vendorRoutes from "../modules/vendors/vendor.routes.js";
import reviewRoutes from "../modules/reviews/review.routes.js";
import cartRoutes from "../modules/cart/cart.routes.js";
import attributeRoutes from "../modules/attributes/attribute.routes.js";
import variantRoutes from "../modules/variants/variant.routes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/products", productRoutes);
router.use("/orders", orderRoutes);
router.use("/vendors", vendorRoutes);
router.use("/reviews", reviewRoutes);
router.use("/cart", cartRoutes);
router.use("/attributes", attributeRoutes);
router.use("/variants", variantRoutes);

export default router as Router;
