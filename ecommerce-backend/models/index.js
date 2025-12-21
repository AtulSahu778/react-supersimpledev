import { Sequelize } from 'sequelize';
import sqlJsAsSqlite3 from 'sql.js-as-sqlite3';
import fs from 'fs';
import { promisify } from 'util';

const writeFile = promisify(fs.writeFile);

const isUsingRDS = process.env.RDS_HOSTNAME && process.env.RDS_USERNAME && process.env.RDS_PASSWORD;
const dbType = process.env.DB_TYPE || 'mysql';
const defaultPorts = {
  mysql: 3306,
  postgres: 5432,
};
const defaultPort = defaultPorts[dbType];

export let sequelize;

// Debounce database saving to prevent blocking on every operation
let saveTimeout = null;
let isSaving = false;
const SAVE_DELAY_MS = 500; // Wait 500ms after last operation before saving

if (isUsingRDS) {
  sequelize = new Sequelize({
    database: process.env.RDS_DB_NAME,
    username: process.env.RDS_USERNAME,
    password: process.env.RDS_PASSWORD,
    host: process.env.RDS_HOSTNAME,
    port: process.env.RDS_PORT || defaultPort,
    dialect: dbType,
    logging: false
  });
} else {
  sequelize = new Sequelize({
    dialect: 'sqlite',
    dialectModule: sqlJsAsSqlite3,
    logging: false
  });

  // Use debounced save function for all hooks
  const debouncedSave = () => {
    if (saveTimeout) {
      clearTimeout(saveTimeout);
    }
    saveTimeout = setTimeout(() => {
      if (!isSaving) {
        saveDatabaseToFile().catch(err => {
          console.error('Error saving database:', err);
        });
      }
    }, SAVE_DELAY_MS);
  };

  sequelize.addHook('afterCreate', debouncedSave);
  sequelize.addHook('afterDestroy', debouncedSave);
  sequelize.addHook('afterUpdate', debouncedSave);
  sequelize.addHook('afterSave', debouncedSave);
  sequelize.addHook('afterUpsert', debouncedSave);
  sequelize.addHook('afterBulkCreate', debouncedSave);
  sequelize.addHook('afterBulkDestroy', debouncedSave);
  sequelize.addHook('afterBulkUpdate', debouncedSave);
}

export async function saveDatabaseToFile() {
  if (isSaving) {
    return; // Skip if already saving
  }
  
  isSaving = true;
  try {
    const dbInstance = await sequelize.connectionManager.getConnection();
    const binaryArray = dbInstance.database.export();
    const buffer = Buffer.from(binaryArray);
    await writeFile('database.sqlite', buffer);
  } catch (error) {
    console.error('Error saving database to file:', error);
  } finally {
    isSaving = false;
  }
}
