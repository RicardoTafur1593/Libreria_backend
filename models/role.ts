import mongoose from "mongoose";

const RoleSchema = new mongoose.Schema({
    rol: {
        type: String,
        required: [true, 'El rol es obligatorio'],
        unique: true
    }
});


const Role = mongoose.model('Role', RoleSchema);
export { Role };