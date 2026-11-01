import './config/env.js';
import app from './app.js';
import { connectDatabase } from './config/database.js';
const port=Number(process.env.PORT)||5000;
try { await connectDatabase(); app.listen(port,()=>console.info(`Casefile API listening on port ${port}.`)); }
catch(error){console.error(`Server startup failed: ${error.message}`);process.exit(1);}
