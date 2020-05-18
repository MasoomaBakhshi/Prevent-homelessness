const fs = require('fs');
const util = require('util');

/**
 * We want to use async/await with fs.readFile - util.promisfy gives us that
 */
const readFile = util.promisify(fs.readFile);

/**
 * Logic for fetching services information
 */
class HomelessService {
  /**
   * Constructor
   * @param {*} datafile Path to a JSOn file that contains the services data
   */
  constructor(datafile) {
    this.datafile = datafile;
  }

  /**
   * Returns a list of reasons
   */
  async getReasons() {
    const data = await this.getDataReasons();
    // We are using map() to transform the array we get into another one
    return data.map((reason) => {
      return { name: reason.name, shortname: reason.shortname, icon: reason.icon };
    });
  }

  /**
   * Get all artwork of a given service
   * @param {*} shortname The services short name
   */
  async getQuestionsForReason(shortname) {
    const data = await this.getDataReasons();
    const reason = data.find((elm) => {
      return elm.shortname === shortname;
    });
    if (!reason || !reason.questions) return null;
    const questions = reason.questions;
    return questions.map((quest) => {
      return { question: quest.question, service: quest.service };
    });
  }

  /**
   * Get all artwork of a given service
   * @param {*} shortname The services short name
   */
  async getservices(service) {
    const data = await this.getDataServices();
    let services = data.filter((it) => it.service.includes(service));
    return services;
  }

  /**
   * Fetches services data from the JSON file provided to the constructor
   */
  async getDataReasons() {
    const data = await readFile(this.datafile, 'utf8');
    return JSON.parse(data).reasons;
  }
  /**
   * Fetches services data from the JSON file provided to the constructor
   */
  async getDataServices() {
    const data = await readFile(this.datafile, 'utf8');
    return JSON.parse(data).services;
  }
}

module.exports = HomelessService;
