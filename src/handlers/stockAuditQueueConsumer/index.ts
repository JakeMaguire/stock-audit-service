import { SQSEvent } from "aws-lambda";

const handler = (event: SQSEvent) => {
  event.Records.forEach((record) => {});
};

export default handler;
