import app from './app.js' 
import { PORT } from './config.js';
//Server
app.set("title", "Servidor Corriendo");
app.set("PORT", PORT);

app.listen(app.get("PORT"));
console.log(
  `${app.get("title")}, en la url http://localhost:${app.get("PORT")}/`
);
