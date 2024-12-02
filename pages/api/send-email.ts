import type { NextApiRequest, NextApiResponse } from 'next';
import type { IBaseballInput, IFootballInput, IFormInput } from '@/app/types/types';
import AWS from 'aws-sdk';

const ses = new AWS.SES({
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET,
    region: process.env.AWS_REGION,
  });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method Not Allowed' });
    return;
  }

  const body: IFormInput = req.body;

  try {
    switch (body.sport) {
      case 'football': {
        const footballInput: IFootballInput = body;
        await sendFootballEmail(footballInput);
        break;
      }
      case 'baseball': {
        const baseballInput: IBaseballInput = body;
        await sendBaseballEmail(baseballInput);
        break;
      }
      default:
        res.status(400).json({ message: 'Invalid sport type' });
        return;
    }
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email: ', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

async function sendBaseballEmail(input: IBaseballInput) {
    const lines = Object.entries(input).map(([key, value]) => `${key}: ${value}`);
    const subject = 'Baseball Inquiry';
    const body = `New baseball inquiry received:\n\n${lines.join('\n')}`;
    await sendEmail(subject, body);
}

async function sendFootballEmail(input: IFootballInput) {
    const lines = Object.entries(input).map(([key, value]) => `${key}: ${value}`);
    const subject = 'Football Inquiry';
    const body = `New football inquiry received:\n\n${lines.join('\n')}`;
    await sendEmail(subject, body);
}

async function sendEmail(subject: string, body: string) {
    const sourceEmail: string = process.env.SES_SOURCE_EMAIL as string;
    const destinationEmail: string = process.env.SES_DESTINATION_EMAIL as string;
    const params = {
        Source:  sourceEmail, 
        Destination: {
            ToAddresses: [destinationEmail],
        },
        Message: {
            Subject: {
                Data: subject,
            },
            Body: {
                Text: {
                    Data: body,
                },
            },
        },
    };

    await ses.sendEmail(params).promise();
}
