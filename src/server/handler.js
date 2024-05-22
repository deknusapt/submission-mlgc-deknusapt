const predictClassification = require('../services/inferenceService');
const crypto = require('crypto');
const {storeData, getAllData} = require('../services/storeData');

async function postPredictHandler(request, h) {
  // const imageBuffer = buffer.from(request.payload);
  const { model } = request.server.app;
  const { image } = request.payload;

  const { label, suggestion } = await predictClassification(model, image);
  const id = crypto.randomUUID();
  const createdAt = new Date().toISOString();
 
  const data = {
    "id": id,
    "result": label,
    "suggestion": suggestion,
    "createdAt": createdAt
  }

  await storeData(id, data);

  const response = h.response({
    status: 'success',
    message: 'Model is predicted successfully',
    data
  })
  return response.code(201);
}

async function getAllDataHandler(request, h) {
  const allData = await getAllData()

  const response = h.response({
    status: 'success',
    data: allData
  })
  return response.code(200);
}

module.exports = {postPredictHandler, getAllDataHandler};