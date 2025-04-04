import express from "express";
import helmet from "helmet";
import connectToDB from "./db/index.mjs";
import routes from "./routes/index.mjs";

//Connecting MongoDB
connectToDB()

const app = express();
app.use(helmet());
app.use(express.json());

app.use("/api",routes);

app.get("/", (req, res) => {
	res.send("Hello World");
})

const port = 3000;
app.listen(port, () => {
  console.log(`Example app listening on ${port}`);
});

// app.use(
	// 	cors({
	// 		origin: ['http://localhost:5174', 'http://localhost:5173'],
	// 		methods: ['GET', 'PUT', 'POST', 'DELETE'],
	// 		credentials: true,
	// 	}),
	// );