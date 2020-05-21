const UserModel = require('../models/UserModel');
const ReasonModel = require('../models/ReasonModel');
const ServiceModel = require('../models/ServiceModel');
const images = require('./ImageService');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 12;
//merged two arrays without duplication
function merge_array(array1, array2) {
  var result_array = [];
  var arr = array1.concat(array2);
  var len = arr.length;
  var assoc = {};

  while (len--) {
    var item = arr[len];

    if (!assoc[item]) {
      result_array.unshift(item);
      assoc[item] = true;
    }
  }
  return result_array;
}

function isEmpty(obj) {
  for (var key in obj) {
    if (obj[key] != '') return false;
  }
  return true;
}

function removeDups(array) {
  let unique = {};
  array.forEach(function (i) {
    if (!unique[i]) {
      unique[i] = true;
    }
  });
  return Object.keys(unique);
}

///an object of quries
class dbQuries {
  ///users
  //get
  async getUsers() {
    return await UserModel.find({}).exec();
  }

  //email exists
  async getEmail(useremail) {
    return await UserModel.findOne({ email: useremail }).exec();
  }
  //update password
  async updatePassword(user, id) {
    var id = id;
    console.log(id);
    console.log(user.changepassword);
    var password = await bcrypt.hash(user.changepassword, SALT_ROUNDS);
    console.log(password);
    return await UserModel.findOneAndUpdate(
      { _id: id },
      {
        password: password,
        createduser: user.changeupdateduser,
        updateduser: user.changecreateduser,
      }
    );
  }
  //update user
  async updateUser(user, id) {
    var id = id;
    const update = await UserModel.findOneAndUpdate(
      { _id: id },
      {
        username: user.body.username,
        email: user.body.email,
        role: user.body.role,
        createduser: user.body.createduser,
        updateduser: user.updateduser,
      }
    );
    if (update) {
      if (user.file && user.file.storedFilename) {
        const find = await UserModel.findOne({ _id: id }).exec();
        const image = find.image;
        const updateImage = await UserModel.updateOne(
          { _id: id },
          { image: user.file.storedFilename }
        );
        if (updateImage) {
          return image;
        }
      }
      return true;
    }
  }
  //add
  async addUser(user) {
    const add = new UserModel({
      username: user.body.username,
      email: user.body.email,
      password: user.body.password,
      role: user.body.role,
      createduser: user.body.createduser,
      updateduser: user.body.updateduser,
    });
    if (user.file && user.file.storedFilename) {
      add.image = user.file.storedFilename;
    }
    return await add.save();
  }

  //delete
  async deleteUser(id) {
    const user = await UserModel.findOne({ _id: id }).exec();
    const cut = await UserModel.remove({ _id: id }).exec();
    if (cut) {
      if (user) {
        return user.image;
      } else return null;
    }
  }
  ///////////////////////////reason/////////
  //get
  async getReasons() {
    return await ReasonModel.find({}).exec();
  }
  ///get reason
  async getReason(reason) {
    return await ReasonModel.findOne({ reason: reason }).exec();
  }
  //add
  async addReason(reason) {
    var questions = [];
    if (Array.isArray(reason.question)) {
      var options = reason.question.length;
      for (var i = 0; i < options; i++) {
        var obj = {};
        obj['question'] = reason.question[i];
        if (reason.selectservice[i]) {
          obj['service'] = reason.selectservice[i];
        } else {
          obj['service'] = reason.inputservice[i];
        }
        if (!isEmpty(obj)) {
          questions.push(obj);
        }
      }
    } else {
      var obj = {};
      obj['question'] = reason.question;
      if (reason.selectservice) {
        obj['service'] = reason.selectservice;
      } else {
        obj['service'] = reason.inputservice;
      }
      if (!isEmpty(obj)) {
        questions.push(obj);
      }
    }
    const addreason = new ReasonModel({
      reason: reason.reason,
      symbol: reason.symbol,
      createduser: reason.createduser,
      updateduser: reason.updateduser,
      questions: questions,
    });
    return await addreason.save();
  }

  //update reason
  async updateReason(reason, id) {
    var id = id;
    var questions = [];
    if (Array.isArray(reason.question)) {
      var options = reason.question.length;
      for (var i = 0; i < options; i++) {
        var obj = {};
        obj['question'] = reason.question[i];
        if (reason.selectservice[i]) {
          obj['service'] = reason.selectservice[i];
        } else {
          obj['service'] = reason.inputservice[i];
        }
        if (!isEmpty(obj)) {
          questions.push(obj);
        }
      }
    } else {
      var obj = {};
      obj['question'] = reason.question;
      if (reason.selectservice) {
        obj['service'] = reason.selectservice;
      } else {
        obj['service'] = reason.inputservice;
      }
      if (!isEmpty(obj)) {
        questions.push(obj);
      }
    }
    return await ReasonModel.findOneAndUpdate(
      { _id: id },
      {
        reason: reason.reason,
        symbol: reason.symbol,
        createduser: reason.createduser,
        updateduser: reason.updateduser,
        questions: questions,
      }
    );
  }

  //delete
  async deleteReason(id) {
    return await ReasonModel.remove({ _id: id }).exec();
  }
  async storedServices() {
    const stored1 = await ReasonModel.distinct('questions.service');
    const stored2 = await ServiceModel.distinct('services', {
      'services.services': { $nin: ['', null] },
    });
    let services = merge_array(stored1, stored2);
    return services;
  }
  ///////////////////service///////////////////////
  //get
  async getServices() {
    return await ServiceModel.find({}).exec();
  }
  /////get service
  async getService(service) {
    return await ServiceModel.findOne({ organization: service }).exec();
  }
  /////get service
  async getServicesbyReason(service) {
    return await ServiceModel.find({ services: service }).exec();
  }

  ////add
  async addService(service) {
    var selected = service.body.services;
    var more = service.body.moreservices + '';
    var array = more.split(',');
    if (!selected) {
      var services = array;
    }
    if (!more) {
      var services = selected;
    }
    if (selected && more) {
      var services = selected.concat(array);
    }
    services = removeDups(services);
    const addservice = new ServiceModel({
      organization: service.body.organization,
      createduser: service.body.createduser,
      updateduser: service.body.updateduser,
      services: services,
      website: service.body.website,
      phone: service.body.phone,
      address: service.body.address,
      chat: service.body.chat,
      forum: service.body.forum,
      mode: service.body.mode,
      body: service.body.body,
      note: service.body.note,
    });
    if (service.file && service.file.storedFilename) {
      addservice.image = service.file.storedFilename;
    }
    return await addservice.save();
  }
  ////update
  async updateService(service, id) {
    var id = id;
    var selected = service.body.services;
    var more = service.body.moreservices + '';
    var array = more.split(',');
    if (!selected) {
      var services = array;
    }
    if (!more) {
      var services = selected;
    }
    if (selected && more) {
      var services = selected.concat(array);
    }
    services = removeDups(services);
    const update = await ServiceModel.findOneAndUpdate(
      { _id: id },
      {
        organization: service.body.organization,
        createduser: service.body.createduser,
        updateduser: service.body.updateduser,
        services: services,
        website: service.body.website,
        phone: service.body.phone,
        address: service.body.address,
        chat: service.body.chat,
        forum: service.body.forum,
        mode: service.body.mode,
        body: service.body.body,
        note: service.body.note,
      }
    );

    if (update) {
      if (service.file && service.file.storedFilename) {
        const find = await ServiceModel.findOne({ _id: id }).exec();
        const image = find.image;
        const updateImage = await ServiceModel.updateOne(
          { _id: id },
          { image: service.file.storedFilename }
        );
        if (updateImage) {
          return image;
        }
      }
      return true;
    }
  }
  ////save many
  ////add

  //delete
  async deleteService(id) {
    const service = await ServiceModel.findOne({ _id: id }).exec();
    const cut = await ServiceModel.remove({ _id: id }).exec();
    if (cut) {
      if (service) {
        return service.image;
      }
      return true;
    }
  }
}
module.exports = dbQuries;
