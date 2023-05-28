var he = require('he');

function decodeHtmlEntities(text: string): string {
  return he.decode(text);
}

export { decodeHtmlEntities };