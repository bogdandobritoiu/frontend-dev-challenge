import express from "express";

const app = express();
import cors from "cors";

app.set("port", process.env.PORT || 3001);

// Express only serves static assets in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
app.use(cors());
app.get("/savings", (req, res) => {
  const monthly = Number(req.query.monthly);
  const initial = Number(req.query.initial);
  const interest = Number(req.query.interest);
  const years = Number(req.query.years || 50);

  let data = [initial + (initial / 100) * interest];
  const yearly = monthly * 12;

  for (let i = 1; i < years; i++) {
    const currentAndPrevious = data[i - 1] + yearly;
    data.push(currentAndPrevious + (currentAndPrevious / 100) * interest);
  }

  return res.send({
    data,
  });
});

app.listen(app.get("port"), () => {
  console.log(`Find the server at: http://localhost:${app.get("port")}/`); // eslint-disable-line no-console
});
