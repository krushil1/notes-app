/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "ez16wh1he4a78hu",
    "created": "2023-12-09 05:04:38.087Z",
    "updated": "2023-12-09 05:04:38.087Z",
    "name": "demo",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "5ycvlxpy",
        "name": "title",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "ir0cxp7c",
        "name": "content",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "indexes": [],
    "listRule": "",
    "viewRule": "",
    "createRule": "",
    "updateRule": "",
    "deleteRule": "",
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("ez16wh1he4a78hu");

  return dao.deleteCollection(collection);
})
