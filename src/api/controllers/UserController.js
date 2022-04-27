import { promises as fs } from "fs";
import DATABASE_NAME from "../database/config.js";

const { readFile, writeFile } = fs;

class UserController {
  static async deleteOne(req, res) { 
    const userId = req.params.userId;
    try {
      const dataFromFile = JSON.parse(await readFile(DATABASE_NAME));
      dataFromFile.users = dataFromFile.users.filter(function (el) {
        if(el.id != userId) {
          return true
        }
        dataFromFile.nextId--;
        return false
    })
    
    await writeFile(DATABASE_NAME, JSON.stringify(dataFromFile));
    res.json(JSON.stringify(dataFromFile));
    } catch (e) {
      console.log(e);
    }
  }
  static async create(req, res) { 
    const formData = req.body;
    try {
      const dataFromFile = JSON.parse(await readFile(DATABASE_NAME));
      formData.id = dataFromFile.nextId;
      dataFromFile.nextId++;
      
      dataFromFile.users.push(formData);
      await writeFile(DATABASE_NAME, JSON.stringify(dataFromFile));
      res.json({ msg: 'Ok' });
    } catch (e) {
      console.log(e);
    }
  }
  static async find(req, res) { 
    try {
      const dataFromFile = JSON.parse(await readFile(DATABASE_NAME));
      res.json(JSON.stringify(dataFromFile));
    } catch (e) {
      console.log(e);
    }
  }
  static async findOne(req, res) { 
    try {
      const userId = req.params.userId;
      const dataFromFile = JSON.parse(await readFile(DATABASE_NAME));
      const found = dataFromFile.users.find(x => x.id == userId);
      res.json(JSON.stringify(found));
    } catch (e) {
      console.log(e);
    }
  }
  static async updateOne(req, res) { 
    try {
      const formData = req.body;
      const userId = req.params.userId;
      const dataFromFile = JSON.parse(await readFile(DATABASE_NAME));
      const found = dataFromFile.users.findIndex(x => x.id == userId);
      dataFromFile.users[found].name = formData.name;
      dataFromFile.users[found].password = formData.password;
      dataFromFile.users[found].status = formData.status;
      await writeFile(DATABASE_NAME, JSON.stringify(dataFromFile));
      res.json(JSON.stringify(dataFromFile));
    } catch (e) {
      console.log(e);
    }
  }
}

export default UserController; 