/* eslint-disable no-undef */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import gendiff from '../src/index.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf8');
const expectedStylish = readFile('correct-stylish.txt');
const expectedPlain = readFile('correct-plain.txt');
const expectedJson = readFile('correct-json.txt');
const formats = ['json', 'yaml', 'yml'];
const formatters = ['stylish', 'plain', 'json'];
const chooseExpectedResult = (value) => {
  if (value === 'stylish') return expectedStylish;
  if (value === 'plain') return expectedPlain;
  if (value === 'json') return expectedJson;
  return 'Unexpected error';
};

describe('Positives cases', () => {
  describe.each(formats)('Format %s', (format) => {
    const file1 = `${process.cwd()}/__fixtures__/file1.${format}`;
    const file2 = `${process.cwd()}/__fixtures__/file2.${format}`;

    test.each(formatters)('Check correct %s', (formatter) => {
      expect(gendiff(file1, file2, formatter)).toEqual(chooseExpectedResult(formatter));
    });
  });
});

describe('Negative cases', () => {
  test('Check wrong format', () => {
    const error = new Error('Something went wrong, try again!');

    expect(() => {
      gendiff(getFixturePath('file1-wrong.txt'), getFixturePath('file2-wrong.txt'));
    }).toThrow(error);
  });
});
