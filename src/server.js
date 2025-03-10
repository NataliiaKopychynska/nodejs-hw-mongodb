import express from 'express';
import cors from 'cors';
import pino from 'pino';
// import Contact from './models/contact.js';
import { getAllContacts, getContactById } from './services/contacts.js';

const logger = pino({
  transport: {
    target: 'pino-pretty',
    options: { colorize: true },
  },
});

export function setupServer() {
  const PORT = process.env.PORT || 3000;
  const app = express();

  app.use(cors());
  app.use((req, res, next) => {
    logger.info(`Incoming request: ${req.method} ${req.url}`);
    next();
  });
  app.get('/contacts', async (req, res) => {
    try {
      const contacts = await getAllContacts();
      res.json({
        status: 200,
        message: 'Successfully found contacts!',
        data: contacts,
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: 'Error retrieving contacts.',
        error: error.message,
      });
    }
  });

  app.get('/contacts/:contactId', async (req, res) => {
    try {
      const { contactId } = req.params;
      const contact = await getContactById(contactId);
      if (contact === null) {
        return res.status(404).json({
          message: 'Contact not found',
        });
      }
      res.json({
        status: 200,
        message: `Successfully found contact with id ${contactId}!`,
        data: contact,
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: 'Error retrieving contacts.',
        error: error.message,
      });
    }
  });

  app.use((req, res) => {
    res.status(404).json({ message: 'Not found' });
  });

  app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
  });
}
