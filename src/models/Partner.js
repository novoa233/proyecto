import {DataTypes} from 'sequelize'
import {sequelize} from '../database/database.js'


export const Partner=sequelize.define('partner',{
    id:{
        type:DataTypes.STRING,
        primaryKey:true,
    }
},{
    timestamps:false
});

