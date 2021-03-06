//const { check, validationResult } = require('express-validator');
var userRepository = require('./../repository/user');
var cityRepository = require('./../repository/city');
const encryptionHelper = require('./../helper/encryption');
const tokenHelper = require('./../helper/token');

const validationError= "Validation error: user or password not valid";

const user = {
    async login_post(req, res, next) {

        try{
            const user = await userRepository.getUserByUsername(req.body.userName);
    
            if (user){
    
                if (await encryptionHelper.compare(req.body.password, user.password)){
                    console.log('Password is correct');
                } else {
                    console.log('Password is wrong');
                    res.status(401).send(validationError);
                }
            }else{
                res.status(401).send(validationError);
            }
    
            const token = tokenHelper.generateToken(user.userName);
    
            res.cookie('auth', token);
            res.status(200).send({ userName: user.userName, token });
        }catch (err){
            next(err);
        }
    },

    async cities_get(req, res, next){

        try{
            let userCities = await userRepository.findByLoginIncludeCities(req.userName);

            res.send(user.mapCities(userCities.Cities));
        }catch (err){
            next(err);
        }
    },

    async cities_post(req, res, next){

        try{

            const user = await userRepository.getUserByUsername(req.userName);
            await cityRepository.createCity(req.body.city, req.body.country, user);

            res.send("ok");
        }catch (err){
            next(err);
        }        
    },

    mapCities (cities){
        let i =  cities.map((x) => {
            return {
                name: x.name,
                country: x.country
            }
        });
    
        return i;
    }
}

module.exports = user;