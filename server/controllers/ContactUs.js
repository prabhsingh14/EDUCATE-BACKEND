import { contactUsEmail } from "../mail/templates/contactFormRes.js";
import mailSender from "../utils/mailSender.js";

exports.contactUsController = async (req, res) => {
  const { email, firstname, lastname, message, phoneNo, countrycode } = req.body
  if (!email || !firstname || !lastname || !message || !phoneNo || !countrycode) {
    return res.json({
      success: false,
      message: "All fields are required",
    })
  }

  try {
    const emailRes = await mailSender(
      email,
      "Your Data send successfully",
      contactUsEmail(email, firstname, lastname, message, phoneNo, countrycode)
    )

    return res.json({
      success: true,
      message: "Email send successfully",
    })
  } catch (error) {
    console.log("Error", error)
    console.log("Error message :", error.message)
    
    return res.json({
      success: false,
      message: "Something went wrong...",
    })
  }
}
