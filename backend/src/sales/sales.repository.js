/**
 * sales table Manipulations
 * sales 테이블에 접근합니다.
 */
const connection = require("../../config/connection").promise();

class SalesRepository {
  async createSales(data) {
    const sql =
      `
      INSERT INTO 
      sales (token_id, seller_address, sale_contract_address, cash_contract_address)
      VALUES(
        ` +
      connection.escape(data.token_id) +
      `
        , ` +
      connection.escape(data.seller_address) +
      `
        , ` +
      connection.escape(data.sale_contract_address) +
      `
        , ` +
      connection.escape(data.cash_contract_address) +
      `
      );
      UPDATE
      items
      SET on_sale_yn = 1
      WHERE token_id = ` +
      connection.escape(data.token_id) +
      ";";
    return await connection
      .query(sql)
      .then((data) => data[0])
      .catch((e) => {
        console.error(e);
        // throw e;
      });
  }

  async getSalesByTokenId(tokenId) {
    const sql =
      `
			SELECT 		buyer_address,
						cash_contract_address,
						completed_at,
						created_at,
						sale_contract_address,
						sale_id,
						sale_yn,
            seller_address,
            token_id
			FROM    	sales
			WHERE 		token_id = ` +
      connection.escape(tokenId) +
      `
			ORDER BY    created_at DESC
		`;
    console.log(sql);

    return await connection
      .query(sql)
      .then((data) => data[0])
      .catch((e) => {
        console.error(e);
        throw e;
      });
  }

  async getSales() {
    return null;
  }

  async deleteSales(saleId, data) {
    // UPDATE
    //   FROM
    //   items
    //   WHERE
    //   token_id = ` +
    //   connection.escape(data.token_id) +
    //   `;
    const sql =
      `
    DELETE
    FROM
    sales
    WHERE sale_id = ` +
      connection.escape(saleId) +
      ";";

    return await connection
      .query(sql)
      .then((data) => data[0])
      .catch((e) => {
        console.error(e);
        throw e;
      });
  }

  async completeSales(tokenId, data) {
    const sql =
      `
      UPDATE
      sales
      SET buyer_address = ` +
      connection.escape(data.buyer_address) +
      `
      WHERE token_id = ` +
      connection.escape(tokenId) +
      ";";
    return await connection
      .query(sql)
      .then((data) => data[0])
      .catch((e) => {
        console.error(e);
        throw e;
      });
  }
}

module.exports = SalesRepository;
