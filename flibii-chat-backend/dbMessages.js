import mongoose from 'mongoose'

const flibiiChatSchema = mongoose.Schema({

    message:String,
    name:String,
    timestamp:String,
    received:Boolean
});
export default mongoose.model('messagecontents',flibiiChatSchema)
