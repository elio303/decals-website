import type { NextApiRequest, NextApiResponse } from 'next';
import type { IHockeyInput, IBaseballInput, IFootballInput, IFormInput, IContactInput } from '@/app/types/types';
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
  const isEmailEnabled = process.env.SEND_EMAILS_ENABLED === 'true';

  if (!isEmailEnabled) {
    res.status(200).json({ message: 'Emails are currently disabled.' });
    return;
  }

  try {
    let sportText = '';
    let subject = '';

    switch (body.sport) {
      case 'football': {
        subject = 'Football Inquiry';
        sportText = footballTemplate(body);
        break;
      }
      case 'baseball': {
        subject = 'Baseball Inquiry';
        sportText = baseballTemplate(body);
        break;
      }
      case 'hockey': {
        subject = 'Hockey Inquiry';
        sportText = hockeyTemplate(body);
        break;
      }
      default: {
        res.status(400).json({ message: 'Invalid sport type' });
        return; 
      }
    }

    const contactText = contactTemplate(body)
    await sendEmail(subject, sportText + contactText);


    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email: ', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

const generateQuantityText = (quantityTypes: Record<string, number>): string => {
  return Object.entries(quantityTypes)
    .map(([key, value]) => `${key}: ${value}`)
    .join('\n');
};

const contactTemplate = (input: IContactInput): string => {
  const {
    firstName,
    lastName,
    phoneNumber,
    email,
  } = input;

  return `
First Name: ${firstName}
Last Name: ${lastName}
Phone Number: ${phoneNumber}
Email: ${email}
  `;
}

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
Bumper Quantity: ${bumperQuantity}
Text Color: ${textColor}
Outline Color: ${outlineColor}
  `;
};

const hockeyTemplate = (input: IHockeyInput): string => {
  const {
    bumperType,
    bumperColor,
    bumperQuantity,
    textColor,
    outlineColor,
  } = input;

  return `
New hockey inquiry received:

Bumper Type: ${bumperType}
Bumper Color: ${bumperColor}
Bumper Quantity: ${bumperQuantity}
Text Color: ${textColor}
Outline Color: ${outlineColor}
  `;
};

async function sendEmail(subject: string, body: string) {
  const sourceEmail: string = process.env.SES_SOURCE_EMAIL as string;
  const destinationEmail: string = process.env.SES_DESTINATION_EMAIL as string;
  const params = {
    Source: sourceEmail,
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
