export default {
    ENV: process.env.ENV || "DEV",
    DB_CLOUD_URI: process.env.DB_CLOUD_URI || "",
    DB_LOCAL_URI: process.env.DB_LOCAL_URI || "mongodb://localhost:27017/cs3219_project",
    SECRET_TOKEN: process.env.SECRET_TOKEN || "your-very-secretive-key",
    TOKEN_EXPIRY: process.env.TOKEN_EXPIRY || "10800s" 
}