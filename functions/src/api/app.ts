import * as express from "express";
import * as cors from "cors";
import { rateLimit } from "express-rate-limit";
import { usersRouter } from "./users/config/UsersDependencyContainer";
import { imagesRouter } from "./images/config/ImagesDependencyContainer";
import { projectsRouter } from "./projects/config/ProjectsDependencyContainer";


const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    message: "Too many requests from this IP. Please try again after 15 minutes.",
    standardHeaders: true,
    legacyHeaders: true,
    // Custom keyGenerator to handle undefined IP in Firebase emulator
    keyGenerator: (req) => {
        return req.ip || req.headers["x-forwarded-for"] as string || "127.0.0.1";
    },
    // Disable IP validation for development/emulator compatibility
    validate: { ip: false },
});
app.use(apiLimiter);


// Routing
app.use("/users", usersRouter.getRouter());
app.use("/images", imagesRouter.getRouter());
app.use("/projects", projectsRouter.getRouter());


export { app };
