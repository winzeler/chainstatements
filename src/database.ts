import config from "./config";
//import * as Sentry from "@sentry/serverless";
import * as mongoose from "mongoose";

/*
Sentry.AWSLambda.init({
    dsn: config.sentry.dsn,
    environment: config.sentry.env,
  });
*/

const connectDB = async (): Promise<void> => {
  
  try {
    if ((!mongoose) || (mongoose?.connection?.readyState != 1)) {
      const mongoURI = config.databaseURL ? config.databaseURL : "";
      const options = {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
        useCreateIndex: true,
      };
      if (mongoURI) {
        await mongoose.connect(mongoURI);
        console.log("Database Connected!");
      } else {
        throw new Error("No mongoURI");
      }
    } else {
      console.log("Database already Connected!");  
    }
  } catch (err) {
    console.error(err);
    //Sentry.captureException(err);
    // Exit process with failure
    process.exit(1);
  }
};

export default connectDB;
