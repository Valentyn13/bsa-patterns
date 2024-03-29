import * as fs from 'fs/promises';

const write = async (name: string, content: string) => {
  try {
    fs.appendFile(name, content);
  } catch (error) {
    if (error.code === 'ENOENT') {
      fs.writeFile(name, content);
    } else {
      console.error(`Error appending to file: ${error}`);
    }
  }
};

export default write;
