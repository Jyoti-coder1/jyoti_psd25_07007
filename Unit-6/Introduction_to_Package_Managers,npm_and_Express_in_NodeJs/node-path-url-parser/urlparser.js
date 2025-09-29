function parseUrl(fullUrl) {
  if (!fullUrl || typeof fullUrl !== 'string') {
    throw new Error('Invalid URL');
  }

  let tryUrl = fullUrl;
  if (!/^[a-zA-Z]+:\/\//.test(tryUrl)) {
    tryUrl = 'http://' + tryUrl;
  }

  let urlObj;
  try {
    urlObj = new URL(tryUrl);
  } catch (err) {
    throw new Error('Unable to parse URL');
  }

  const queryObj = Object.fromEntries(urlObj.searchParams.entries());

  return {
    hostname: urlObj.hostname,
    pathname: urlObj.pathname,
    query: queryObj
  };
}

module.exports = parseUrl;