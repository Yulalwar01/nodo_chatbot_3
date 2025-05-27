
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { message } = req.body;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'Je bent een behulpzame klantenservice medewerker voor NODO Box. Je beantwoordt vragen over zelfverwarmende bento boxen (zoals de JONETSU KIT), verzendinformatie vanuit Japan naar Nederland, veiligheid (UN 3131, calciumoxide, SDS), en duurzaamheid. Gebruik eenvoudige taal. Als je iets niet zeker weet, verwijs de klant door naar info@gozerdeliver.nl.'
        },
        { role: 'user', content: message }
      ],
    });

    res.status(200).json({ reply: completion.choices[0].message.content });
  } catch (error) {
    console.error('GPT error:', error);
    res.status(500).json({ reply: 'Er ging iets mis. Probeer het later opnieuw.' });
  }
}
