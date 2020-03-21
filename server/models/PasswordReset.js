import mongoose from 'mongoose';

const PasswordResetSchema = new mongoose.Schema({
  email: String,

  token: String,

  createdAt: Date
});
function loadModel(modelName, modelSchema) {
  return mongoose.models[modelName] // Check if the model exists
    ? mongoose.model(modelName) // If true, only retrieve it
    : mongoose.model(modelName, modelSchema); // If false, define it
}
export default () => loadModel('PasswordReset', PasswordResetSchema);
