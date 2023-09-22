const nodemail = require("nodemailer");
require("dotenv").config();
exports.sendMail = async (toMailId, subject, {text,html}) => {
  const transport = nodemail.createTransport({
    service: "gmail",
    auth: {
      user: "deep.developer.31@gmail.com",
      pass: process.env.PASS,
    },
  });

  const mailOption = {
    from: "deep.developer.31@gmail.com",
    to: toMailId,
    subject,
    text,
    html
  };

  return await new Promise((resolve, reject) => { transport.sendMail(mailOption, (error, info) => {
      if (error) {
        
        reject(error);
      } else {
        
        resolve(`send success full ${toMailId} `);
      }
    });
  });
};


exports.sendError=(res,msg)=>{

    return res.status(400).send(msg)

}
exports.sendSuccess=(res,data)=>{

    return res.status(200)
    .send(data)

}
