import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  // Your valid keys with expiration dates (30 days from today)
  const validKeys = {
    'ARKIVE-a7b3x9': '2025-09-29',
    'ARKIVE-k2m8p4': '2025-09-29', 
    'ARKIVE-x5n7w2': '2025-09-29',
    // Add more keys here - I'll show you how to generate 100
  };

  const { key } = req.query;
  
  // Check if key exists and hasn't expired
  if (!validKeys[key]) {
    return res.status(401).json({ error: 'Invalid key' });
  }
  
  const expireDate = new Date(validKeys[key]);
  if (new Date() > expireDate) {
    return res.status(401).json({ error: 'Key expired' });
  }

  // Read your JSON file and send it
  try {
    const filePath = path.join(process.cwd(), 'ARKIVE_V1.0.json');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const jsonContent = JSON.parse(fileContent);
    
    res.json(jsonContent);
  } catch (error) {
    res.status(500).json({ error: 'File not found' });
  }
}
