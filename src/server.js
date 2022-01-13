import app from "./app";
import "dotenv/config"
const PORT = process.env.PORT;
app.listen(PORT, err => {
    err ? console.error(err) : console.log(`Listen port: ${PORT}`)
});