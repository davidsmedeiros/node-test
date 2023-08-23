const sleep = ms => new Promise(res => setTimeout(res, ms));

const getLastId = async (baseId, batchSize, tableName) => {
  const query = `
    WITH ids AS (
      SELECT id
      FROM "${tableName}"
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
  const query = `UPDATE "${tableName}" SET new_transaction_id = transaction_id WHERE id > :firstId AND id <= :lastId;`;
  return db.sequelize.query(query, {
    replacements: {
      firstId,
      lastId,
    },
  });
};

async function backfill(maxIdToFill, batchSize, delay, tableName){
    let firstId = '';
    let lastId = '';
  
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
  
        await sleep(delay);
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

module.exports = {backfill}