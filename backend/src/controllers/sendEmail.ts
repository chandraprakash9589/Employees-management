import cron from "node-cron";
import nodemailer from "nodemailer";
import Task from "../models/Task";
import User from "../models/User";

const sendMail = async () => {
  cron.schedule("31 13 * * *", async () => {
    try {
      const users = await User.find();
      const tasks = await Task.find();
      const today = new Date();
      let yesterday = new Date(today);

      // Check if yesterday is Saturday (6) or Sunday (0)
      while (yesterday.getDay() === 6 || yesterday.getDay() === 0) {
        yesterday.setDate(yesterday.getDate() - 1); // Adjust yesterday to the previous day
      }

      const usersWithoutStatus = users.filter((user) => {
        return !tasks.some(
          (task) =>
            task.user.toString() === user._id.toString() &&
            task.date.toDateString() === yesterday.toDateString()
        );
      });

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "your emails",
          pass: "your password",
        },
      });

      const linkUrl = "http://localhost:3000/send_daily_status";

      for (const user of usersWithoutStatus) {
        const formattedDate = yesterday.toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        });

        const htmlContent = `
              <html>
                  <head>
                      <style>
                          /* Add any styling here */
                      </style>
                  </head>
                  <body>
                      <img src="">
                      <h1>Last Reminder :: You missed your daily status update on ${formattedDate}</h1>
                      <h2>Hi <strong>${user.firstName}</strong></h2>
                      <p>We are waiting for your status update, ${user.firstName}. Please send your status <a href="${linkUrl}">here</a>.</p>
                      <p>Best Regards,</p>
                      <p>BestPeers Team.</p>
                  </body>
              </html>
          `;

        const mailOptions = {
          from: "portal9589@gmail.com",
          to: user.email,
          subject: `Last Reminder :: You missed your daily status update on ${formattedDate}`,
          html: htmlContent,
        };

        await transporter.sendMail(mailOptions);
        console.log(`Email sent successfully to ${user.email}.`);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  });
};

export default sendMail;
