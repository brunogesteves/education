import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./src/files/images");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname.replace(" ", "_"));
  },
});

export const upload = multer({ storage: storage });

const storageEditors = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./src/files/users");
  },
  filename: (req, file, cb) => {
    cb(null, "tempuser.jpg");
  },
});

export const uploadUsers = multer({ storage: storageEditors });
