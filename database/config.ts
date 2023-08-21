import mongoose from "mongoose";

export const dbConnection = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_CNN!);
        console.log('Base de datos Online');

    } catch (error) {
        console.log(error);
        throw new Error('Error en la hora de iniciar la database')
    };
};

