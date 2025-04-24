import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../api/database';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    switch (req.method) {
      case 'GET':
        const limit = Number(req.query.limit) || 100;
        const alerts = await db.getRecentAlerts(limit);
        return res.status(200).json(alerts);

      case 'POST':
        await db.saveAlert(req.body);
        return res.status(201).json({ message: 'Alert saved successfully' });

      default:
        res.setHeader('Allow', ['GET', 'POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
} 