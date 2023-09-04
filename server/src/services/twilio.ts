import { config } from "dotenv";
import twilio from "twilio";
config();

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN,
  {
    lazyLoading: true,
  }
);

export const sendOTPCode = (phoneNumber: string) => {
  return client.verify.v2
    .services(process.env.TWILIO_SERVICE_SID)
    .verifications.create({
      to: phoneNumber,
      channel: "sms",
    });
};

export const verifyOTPCode = (phoneNumber: string, code: string) => {
  return client.verify.v2
    .services(process.env.TWILIO_SERVICE_SID)
    .verificationChecks.create({
      to: phoneNumber,
      code,
    });
};
