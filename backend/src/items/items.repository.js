/**
 * items table Manipulations
 * items 테이블에 접근합니다.
 */
const connection = require('../../config/connection').promise();

class ItemsRepository {
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
			WHERE 		on_sale_yn = TRUE
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
    return null;
  }

  async getRecentRegisteredItem() {
    return null;
  }

  async getRecentItemsOnSale() {
    return null;
  }

  async getItemByTokenId(tokenId) {
    return null;
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
