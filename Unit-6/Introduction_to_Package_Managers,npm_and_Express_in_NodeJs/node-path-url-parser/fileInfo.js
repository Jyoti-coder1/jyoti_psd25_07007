const path = require('path');

function getFileInfo(filePath) {
  if (!filePath || typeof filePath !== 'string') {
    throw new Error('Invalid file path');
  }

  const normalized = path.normalize(filePath);
  const parsed = path.parse(normalized);

  return {
    fileName: parsed.base,
    extension: parsed.ext,
    directory: parsed.dir || '.'
  };
}

module.exports = getFileInfo;