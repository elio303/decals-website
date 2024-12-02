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
    const subject = 'Baseball Inquiry';
    const body = baseballTemplate(input);
    await sendEmail(subject, body);
}

async function sendFootballEmail(input: IFootballInput) {
    const subject = 'Football Inquiry';
    const body = footballTemplate(input);
    await sendEmail(subject, body);
}

const generateQuantityText = (quantityTypes: Record<string, number>): string => {
  return Object.entries(quantityTypes)
    .map(([key, value]) => `${key}: ${value}`)
    .join('\n');
};

const footballTemplate = (input: IFootballInput): string => {
  const {
    frontBumperType,
    rearBumperType,
    frontQuantityTypes,
    rearQuantityTypes,
    frontBumperColor,
    rearBumperColor,
    textColor,
    outlineColor,
  } = input;

  const frontQuantityTypesText = generateQuantityText(frontQuantityTypes);
  const rearQuantityTypesText = generateQuantityText(rearQuantityTypes);

  return `
New football inquiry received:

Front Bumper Type: ${frontBumperType}
Front Bumper Color: ${frontBumperColor}
Rear Bumper Type: ${rearBumperType}
Rear Bumper Color: ${rearBumperColor}
Text Color: ${textColor}
Outline Color: ${outlineColor}

Front Quantity Types:
${frontQuantityTypesText}

Rear Quantity Types:
${rearQuantityTypesText}
  `;
};

const baseballTemplate = (input: IBaseballInput): string => {
  const {
    bumperType,
    bumperColor,
    bumperQuantity,
    textColor,
    outlineColor,
  } = input;

  return `
New baseball inquiry received:

Bumper Type: ${bumperType}
Bumper Color: ${bumperColor}
Bumper Type: ${bumperQuantity}
Text Color: ${textColor}
Outline Color: ${outlineColor}
  `;
};


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
