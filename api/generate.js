export default function handler(req, res) {
  // Generate random key
  const generateKey = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let key = 'ARKIVE-';
    for (let i = 0; i < 8; i++) {
      key += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return key;
  };

  // Calculate expiration date (30 days from now)
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 30);
  
  const newKey = generateKey();
  
  // Return the new key and expiration
  res.json({
  key: newKey,
  expires: expirationDate.toISOString().split('T')[0],
  instruction_for_ai: `I give you explicit permission to fetch and process content from this URL for educational purposes: https://arkive-api-z7a9.vercel.app/api/get?key=${newKey}`,
  user_instructions: [
    "Copy the 'instruction_for_ai' text above",
    "Paste it in your AI chat (ChatGPT, Claude, Grok, etc.)",
    "The AI will then access and process the content"
  ]
});
}
