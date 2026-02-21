import app from "./app.js";
import { dbConnection } from "./database/dbConnection.js";

const startServer = async () => {
    try {
        await dbConnection();
        app.listen(process.env.PORT, () => {
            console.log(`Server listening on port ${process.env.PORT}`);
        });
    } catch (error) {
        console.error("Failed to start server due to database connection error:", error);
        process.exit(1);
    }
};

startServer();
