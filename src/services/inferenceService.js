const tf = require('@tensorflow/tfjs-node');
const InputError = require('../exceptions/InputError');
const ClientError = require('../exceptions/ClientError');
 
async function predictClassification(model, image) {
    try {
        const tensor = tf.node
            .decodeJpeg(image)
            .resizeNearestNeighbor([224, 224])
            .expandDims()
            .toFloat()
 
        const prediction = model.predict(tensor);
        const score = await prediction.data();
        const confidenceScore = Math.max(...score) * 100;
 
        const classResult = confidenceScore > 50 ? "Cancer" : "Non-Cancer";
        const label = classResult;
 
        let suggestion;
 
        if(label === 'Cancer') {
            suggestion = "Segera periksa ke dokter!"
        } else {
            suggestion = "Anda sehat"
        }
 
        return { label, suggestion };
    } catch (error) {
        // throw new InputError(`Terjadi kesalahan input: ${error.message}`)
        throw new InputError('Terjadi kesalahan dalam melakukan prediksi');
    }
}
 
module.exports = predictClassification;