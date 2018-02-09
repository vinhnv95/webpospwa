import Dexie from 'dexie';

const db = new Dexie('webpos_pwa');
db.version(1).stores({
    product: 'id, sku, name',
    category: 'id'
});

export default db;