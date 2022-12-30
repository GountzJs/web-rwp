import fs from 'fs';
import path from 'path';

export class DatabaseService {
  read(module, fileName) {
    const filePath = path.join(process.cwd() + `/src/modules/${module}/json/${fileName}.json`);
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, (err, data) => {
        err ? reject(err) : resolve(JSON.parse(data));
      });
    });
  }

  edit(module, fileName, data) {
    const filePath = path.join(process.cwd() + `/src/modules/${module}/json/${fileName}.json`);
    return new Promise((resolve, reject) => {
      fs.writeFile(filePath, JSON.stringify(data, null, "\t"), (err) => {
        err ? reject(err) : resolve({});
      });
    });
  }
}