const { Firestore } = require('@google-cloud/firestore');
const db = new Firestore();

async function storeData(id, data) {
  const predictCollection = db.collection('prediction');
  return predictCollection.doc(id).set(data);
}

async function getAllData(){
  const saveData = await db.collection('prediction').get()
  const allData = []

  for (const doc of saveData.docs) {
    const data = {
        id: doc.id,
        history: {
        result: doc.data().result,
        createdAt: doc.data().createdAt,
        suggestion: doc.data().suggestion,
        id: doc.id,
        },
    };
    allData.push(data);
    return allData;
    };
}
 
module.exports = {storeData, getAllData};