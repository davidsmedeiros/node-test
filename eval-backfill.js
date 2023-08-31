const getLastId = async (baseId, batchSize, tableName) => {
    const query = `
      WITH ids AS (
        SELECT id
<<<<<<< HEAD
        FROM "EdgeTable2"
=======
        FROM \"EdgeTable2\"
>>>>>>> fix: backfill and model main table
        WHERE id > :baseId
        ORDER BY id ASC
        LIMIT :batchSize
      )
      SELECT max(id) FROM ids
    `;
    const [result] = await db.sequelize.query(query, {
      type: db.sequelize.QueryTypes.SELECT,
      replacements: {
        baseId,
        batchSize: batchSize,
      },
    });
  
    return result.max;
  };

const updateNewTransactionId = async (firstId, lastId, tableName) => {
<<<<<<< HEAD
const query = `UPDATE "EdgeTable2" SET new_main_table_id = main_table_id WHERE id > :firstId AND id <= :lastId;`;
=======
const query = `UPDATE \"EdgeTable2\" SET new_main_table_id = main_table_id WHERE id > :firstId AND id <= :lastId;`;
>>>>>>> fix: backfill and model main table
return db.sequelize.query(query, {
    replacements: {
    firstId,
    lastId,
    },
});
};

async function main(maxIdToFill, batchSize, delay, tableName){
    let firstId = 0;
    let lastId = 0;
  
    try {
      while (firstId <= maxIdToFill) {
        const batchStartTime = Date.now();
  
        firstId = lastId;
        lastId = await getLastId(firstId, batchSize);
  
        await updateNewTransactionId(firstId, lastId);
  
        console.log({
          message: 'Batch processed',
          latency: Date.now() - batchStartTime,
          table: tableName,
          firstId,
          lastId,
          batchSize: batchSize,
          delay: delay,
        });
  
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    } catch (error) {
      console.log({
        message: 'Something went wrong while migrating main_id',
        table: tableName,
        firstId,
        lastId,
        batchSize: batchSize,
        delay: delay,
        error: error.message,
        stack: error.stack,
      });
    }    
}

const MAX_ID_TO_FILL = 109616;
const BATCH_SIZE = 1000;
const DELAY = 100;
const TABLE_NAME = 'EdgeTable2';
main(MAX_ID_TO_FILL, BATCH_SIZE, DELAY, TABLE_NAME);
