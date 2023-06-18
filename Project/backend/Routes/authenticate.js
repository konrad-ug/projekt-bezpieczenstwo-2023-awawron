import jwtmod from "jsonwebtoken";

export default async (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  const token = bearerHeader && bearerHeader.split(" ")[1];
  console.log(token);
  if (token == null || token == undefined || token == "null") {
    return res.sendStatus(401);
  } else {
    const public_key = `-----BEGIN PUBLIC KEY-----\n${process.env.PUBLICKEY}\n-----END PUBLIC KEY-----`;

    try {
      const decodedToken = jwtmod.verify(token, public_key, {
        algorithms: ["RS256"],
      });

      const { email } = decodedToken;
      req.user = email;
    } catch (error) {
      console.log(error);
    }
  }
  next();
};
