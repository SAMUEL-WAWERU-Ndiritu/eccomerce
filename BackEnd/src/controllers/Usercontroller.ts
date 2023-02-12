import * as jwt from "jsonwebtoken";
import { getUser as getUserModel, getUsers as getUsersModel } from "../config/user";
import * as bcrypt from "bcrypt";
import * as nodemailer from "nodemailer";

const getUser = async (req: any, res: any) => {
  const { id } = req.params;
  const user = await getUserModel(id);
  res.json(user);
};

const getUsers = async (req: any, res: any) => {
  const users = await getUsersModel();
  res.json(users);
};

const addUser = async (req: any, res: any) => {
  let { first_name, last_name, email, password } = req.body;
  let user_role = "customer";

  // Hash password
  bcrypt.genSalt(10, (err: any, salt: any) =>
    bcrypt.hash(password, salt, (err: any, hash: any) => {
      if (err) throw err;
      // Set password to hashed password
      password = hash;

      getUserModel.createUser(
        first_name,
        last_name,
        email,
        password,
        user_role,
        (err: any, result: any) => {
          if (err) throw err;

          // Create and sign a JWT token for the user
          const token = jwt.sign(
            {
              user_id: result.insertId,
              first_name,
              last_name,
              email
            },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
          );

          res.json({
            message: "User added successfully!",
            user_ID: result.insertId,
            token
          });

          // Send confirmation email
          let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
              user: "samuelnderitu@gmail.com",
              pass: "sdfg34"
            }
          });

          let mailOptions = {
            from: "your_email_address@gmail.com",
            to: email,
            subject: "Welcome to our website!",
            text: `Hello ${first_name} ${last_name},\n\nWelcome to our website! Thank you for registering.\n\nBest regards,\nThe team`
          };

          transporter.sendMail(mailOptions, (error: any, info: any) => {
            if (error) {
              console.log(error);
            } else {
              console.log("Email sent: " + info.response);
            }
          });
        }
      );
    })
  );
};

const updateUser = async (req: any, res: any) => {
  let id = req.params.id;
  let { first_name, last_name, email, password } = req.body;

  // Hash password if provided
  if (password) {bcrypt.genSalt(10, (err: any, salt: any) =>
    bcrypt.hash(password, salt, (err: any, hash: any) => {
    if (err) throw err;
    // Set password to hashed password
    password = hash   getUserModel.updateUser(
      id,
      first_name,
      last_name,
      email,
      password,
      (err: any, result: any) => {
        if (err) throw err;
  
        res.json({
          message: "User updated successfully!"
        });
      }
    );
  })
  );
} else {
  getUserModel.updateUser(id, first_name, last_name, email, null, (err: any, result: any) => {
if (err) throw err;res.json({
  message: "User updated successfully!"
});
});
}
};

const deleteUser = async (req: any, res: any) => {
let id = req.params.id;
getUserModel.deleteUser(id, (err: any, result: any) => {
if (err) throw err;

res.json({
  message: "User deleted successfully!"
});
});
};

export { getUser, getUsers, addUser, updateUser, deleteUser };