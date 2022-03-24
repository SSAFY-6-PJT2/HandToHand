/**
 * items table Manipulations
 * items 테이블에 접근합니다.
 */
const connection = require('../../config/connection').promise();

class ItemsRepository {
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
      ';';
    console.log(sql);
    return await connection
      .query(sql)
      .then((data) => data[0])
      .catch((e) => {
        console.error(e);
        throw e;
      });
  }

  async getItems() {
    const sql = `
			SELECT 		author_name,
						item_description,
						item_hash,
						item_title,
						on_sale_yn,
						owner_address,
						token_id,
						created_at as items_create_at
			FROM    	items
			WHERE 		on_sale_yn = 1
			ORDER BY    created_at DESC
		`;
    console.debug(sql);

    return await connection
      .query(sql)
      .then((data) => data[0])
      .catch((e) => {
        console.error(e);
        throw e;
      });
  }

  async getItemsByOwnerAddress(address) {
    const sql =
      `
			SELECT 		author_name,
						item_description,
						item_hash,
						item_title,
						on_sale_yn,
						owner_address,
						token_id,
						created_at as items_create_at
			FROM    	items
			WHERE 		on_sale_yn = 1 AND owner_address = ` +
      connection.escape(address) +
      `
			ORDER BY    created_at DESC
		`;
    console.debug(sql);

    return await connection
      .query(sql)
      .then((data) => data[0])
      .catch((e) => {
        console.error(e);
        throw e;
      });
  }

  async getRecentRegisteredItem() {
    const sql = `
    	SELECT 		author_name,
    				item_description,
    				item_hash,
    				item_title,
    				on_sale_yn,
    				owner_address,
    				items.token_id,
    				created_at as items_created_at
    	FROM    	items,(SELECT token_id FROM sales ORDER BY created_at DESC limit 1) as S
    	WHERE 		on_sale_yn = 1 and items.token_id = S.token_id
    `;
    // const sql = 'SELECT token_id,created_at FROM sales ORDER BY created_at DESC limit 1';
    console.debug(sql);
    return await connection
      .query(sql)
      .then((data) => data[0])
      .catch((e) => {
        console.error(e);
      });
  }

  async getRecentItemsOnSale() {
    return null;
  }

  async getItemByTokenId(tokenId) {
    const sql =
      `
			SELECT 		author_name,
						item_description,
						item_hash,
						item_title,
						on_sale_yn,
						owner_address,
						token_id,
						created_at as items_create_at
			FROM    	items
			WHERE 		token_id = ` +
      connection.escape(tokenId) +
      `
			ORDER BY    created_at DESC
		`;
    console.debug(sql);

    return await connection
      .query(sql)
      .then((data) => data[0])
      .catch((e) => {
        console.error(e);
        throw e;
      });
  }

  async updateItemOwnerAddress(tokenId, ownerAddress) {
    return null;
  }

  async updateItemTokenIdAndOwnerAddress(itemId, tokenId, ownerAddress) {
    const sql =
      'UPDATE ' +
      'items ' +
      `SET token_id =` +
      connection.escape(tokenId) +
      `, owner_address = ` +
      connection.escape(ownerAddress) +
      ` WHERE id = ` +
      connection.escape(parseInt(itemId));
    console.debug(sql);

    return await connection
      .query(sql)
      .then((data) => data[0])
      .catch((e) => {
        console.error(e);
        throw e;
      });
  }

  async validateItemDuplicated(hashCode) {
    return null;
  }

  async createItems(data) {
    console.log(`author  ` + data.author_name);
    const sql =
      'INSERT INTO ' +
      'items (author_name,item_description,item_title,created_at) ' +
      `VALUES (` +
      connection.escape(data.author_name) +
      `,` +
      connection.escape(data.item_description) +
      `,` +
      connection.escape(data.item_title) +
      `, current_date()` +
      // connection.escape(new Date().getTime()) +
      `)`;
    console.debug(sql);

    return await connection
      .query(sql)
      .then((data) => data[0])
      .catch((e) => {
        console.error(e);
        throw e;
      });
  }
}

module.exports = ItemsRepository;
