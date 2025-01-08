const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiS0wyd0ZreUtTZlVpNkZpUmJqMUwxSU1tL3Q5aXhVaEYvOEtiR2N5eGRFQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMTlLeHF3L2dBZCtvWE4wWnIweE8yNzZpQUpZK3NET3hRVXQ2VWQ2RStGST0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ3TzN2KzFXb3R2OGNUSDJKUUZFbldRN0oydlQwandSU3J5cGgvRlcvVFhvPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJFdE1VZ1dpdE5tUVhsdmh3SEdtK2JSYUNTME5tdXhHSmN2aUcyaE1naW1zPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik9MSUtjMlhuSXhoTVp4V2d6R2Jocndnb0ZFWEJ2YTN4YmNjUi9DZllvM289In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ill1T2hiZ21VMVBBaVQxWXpVU0UydHhqU1RlRytsTXpIUjcxQUJ3VlJ0QUE9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoia0dsUG1qREFsMGJPUTRkanpIY1BEanhqWG9Ca0J3Vnl1UnNpQTVFaURIQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUUtWMG9KODhqbFRkdE9HbnczaVhCY0p6NDZxZ203emlKUk9WWXFQQlowWT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkdubUlFdHZFZm9La2Z3cnVub21CYW52R2hkQXlkYkI2N2xHSWVtYlhEbWlnUXNXUi90WnlxaDlMSm9BMmFmNG9WSWVvTEptN1dGTnh4SkEwWmswN0NRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTg0LCJhZHZTZWNyZXRLZXkiOiJPYTdyciszSm9LZk1Ubng3cjFUOWlqaSs4RVJHS2FrVVFxc1hPZ0VvUzBVPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJCbWtCLU1iVlNnR29VZHUtQUg5Ry13IiwicGhvbmVJZCI6Ijg0MzkzMmVlLTFmNDktNDY3ZS1iYWVlLWNhYTBjZDBhYzY3MiIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJYOUs3L2hCMDZpNUpmM2U1Q0ZIOEdtOXFyZGc9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicjlNOUZrKzRRc2NLU1RrUGNDdW1JSFhlZ0tBPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IktBUzg5MkNNIiwibWUiOnsiaWQiOiIyMzQ3MDEwNTAyODk2OjEzQHMud2hhdHNhcHAubmV0IiwibmFtZSI6InNoYW1teWJhbmsncyJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDSjJFMEs0SEVKWGI5N3NHR0FRZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5Ijoia2QxelJYd3VtcmkwaUVoMXVVVGdkQmJRLzJsU3FBdkswZlF1dmxza1hDVT0iLCJhY2NvdW50U2lnbmF0dXJlIjoiWDRkaXBPUHd3L1ZCWFdFd0habmJ6elB1RmhsOXNGMjhtYzU2Zis0b1JFU01HRHJuVk5rNldNblArWld4bjZBVmZyd1gyMUJtb3RYYlJmdTIyR054RGc9PSIsImRldmljZVNpZ25hdHVyZSI6ImgzcGVEVHozQlJyL09iVlJ3enRReE54MUlNVXVJcnlvaHEzckRibUVYRVpYbEVuSWdZY3FhWEVDRDNCZGtQUmxuYm54VkREOGJLNVRIKzF1WktxRUNnPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjM0NzAxMDUwMjg5NjoxM0BzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJaSGRjMFY4THBxNHRJaElkYmxFNEhRVzBQOXBVcWdMeXRIMExyNWJKRndsIn19XSwicGxhdGZvcm0iOiJzbWJhIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzM2MzA2MDgyLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQU1uaCJ9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Fredi Ezra",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " 2347010502896",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'LUCKY_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '5' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    ANTICALL : process.env.ANTICALL || 'yes',
                  AUTO_REACT : process.env.AUTO_REACT || 'yes',
                  AUDIO_REPLY : process.env.AUDIO_REPLY|| 'yes', 
                  AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
                  AUTO_REPLY : process.env.AUTO_REPLY || 'yes',
                  AUTO_READ : process.env.AUTO_READ || 'yes',
                  AUTO_SAVE_CONTACTS : process.env.AUTO_SAVE_CONTACTS || 'no',
                  AUTO_REJECT_CALL : process.env.AUTO_REJECT_CALL || 'yes',
                  AUTO_BIO : process.env.AUTO_BIO || 'yes',
                  AUDIO_REPLY : process.env.AUDIO_REPLY || 'yes',
                  AUTO_TAG_STATUS : process.env.AUTO_TAG_STATUS || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});


                  
