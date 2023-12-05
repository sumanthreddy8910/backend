const MongoClient = require('mongodb').MongoClient;

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' }),
    };
  }

  const client = new MongoClient('mongodb+srv://sumanthreddy8910:admin@ipl.ikg0vjz.mongodb.net/');

  try {
    await client.connect();
    const db = client.db('ipl');
    const collection = db.collection('iplteams');

    const data = await collection.find({}).toArray();
    const data_1 = {"IplTeams": data}
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
      },
      body: JSON.stringify(data_1, null, 2)
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error' }),
    };
  } finally {
    await client.close();
  }
};
