import express from "express";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import commentRoutes from "./routes/comments.js";
import likeRoutes from "./routes/like.js";
import cookieParser from "cookie-parser";
import multer from "multer";

const app = express();

app.use(express.json());
app.use(cookieParser());
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/upload");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage });

const storageUser = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "../client/public/user");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + file.originalname);
    },
  });

const icon = multer({  storage : storageUser });


app.post("/server/user", icon.single("file"), function (req, res) {
  const file = req.file;
  res.status(200).json(file.filename);
});

app.post("/server/upload", upload.single("file"), function (req, res) {
    const file = req.file;
    res.status(200).json(file.filename);
  });

app.use("/server/auth", authRoutes);
app.use("/server/users", userRoutes);
app.use("/server/posts", postRoutes);
app.use("/server/comments" , commentRoutes)
app.use("/server/like" , likeRoutes)

app.listen(8800, () => {
  console.log("Connected to 8800!");
});