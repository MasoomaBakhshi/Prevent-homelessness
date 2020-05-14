const sharp = require('sharp');
const uuidv4 = require('uuid/v4');
const util = require('util');
const path = require('path');
const fs = require('fs');

const fsunlink = util.promisify(fs.unlink);

class ImageService {
  constructor(directory) {
    this.directory = directory;
  }

  async store(buffer) {
    const filename = ImageService.filename();
    const filepath = this.filepath(filename);

    await sharp(buffer)
      .resize(200, 200, {
        fit: sharp.fit.inside,
        withoutEnlargement: true,
      })
      .toFile(filepath);
    return filename;
  }

  async Bigstore(buffer) {
    const filename = ImageService.filename();
    const filepath = this.filepath(filename);

    await sharp(buffer)
      .resize(1200, 300, {
        fit: sharp.fit.inside,
        withoutEnlargement: true,
      })
      .toFile(filepath);
    return filename;
  }

  async thumbnail(filename) {
    return sharp(this.filepath(filename)).resize(30, 30).toBuffer();
  }

  async delete(filename) {
    return fsunlink(this.filepath(filename));
  }

  static filename() {
    return `${uuidv4()}.png`;
  }

  filepath(filename) {
    return path.resolve(`${this.directory}/${filename}`);
  }
}

module.exports = ImageService;
