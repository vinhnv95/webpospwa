import Dexie from 'dexie';

const db = new Dexie('webpos_pwa');
db.version(1).stores({
    product: 'id, sku, name',
    category: 'id',
    core_config_data: 'path'
});

export default db;