import yaml from 'js-yaml';

export default (fileContent, extension) => {
  switch (extension) {
    case 'json':
      return JSON.parse(fileContent);
    case 'yml':
    case 'yaml':
      return yaml.load(fileContent);
    default:
      throw new Error(`Wrong file extension: '${extension}'! Try other formats.`);
  }
};