require("dotenv").config();
const app = require('./src/app');
const connectDB = require('./src/db/db');

async function start_server(){
    try{
        await connectDB();
        app.listen(process.env.PORT, () => {
    console.log("Server is running");
})
    }
    catch(error){
        console.error(error.message);
        process.exit(1);
    }
}

start_server();

