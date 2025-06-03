const { MongoClient } = require("mongodb");

const uri = process.env.MONGO_URI || "mongodb://localhost:27017/?&directConnection=true";
const numStreams = parseInt(process.env.NUM_STREAMS || 1, 10);
const streamId = parseInt(process.env.STREAM_ID || 1, 10);

async function main() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db("test");
    const collection = db.collection("test");
    const pipeline = [{
      $match: {
        $expr: {
          $eq: [{ $abs: { $mod: [{ $toHashedIndexKey: "$_id._data" }, numStreams] } }, streamId - 1]
        }
      }
    }];
    const changeStream = collection.watch(pipeline);

    console.log(`Listening for changes on test.test collection (stream ${streamId} of ${numStreams})...`);
    changeStream.on("change", (event) => {
      console.log("Change event", JSON.stringify(event, null, 2));
    });
  } catch (err) {
    console.error("Error:", err);
  }
}

main();
