const getLastId = async (baseId, batchSize, tableName) => {
    const query = `
      WITH ids AS (
        SELECT id
        FROM \"MainTable\"
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
const query = `UPDATE \"MainTable\" SET new_id = id WHERE id > :firstId AND id <= :lastId;`;
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

const MAX_ID_TO_FILL = 348162;
const BATCH_SIZE = 1000;
const DELAY = 100;
const TABLE_NAME = 'MainTable';
main(MAX_ID_TO_FILL, BATCH_SIZE, DELAY, TABLE_NAME);
