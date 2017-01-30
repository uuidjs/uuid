function base64(v) {
  return function (opt) {
    return Buffer.from(v(opt, [])).toString("base64").slice(0, -2).replace(/\+/g, "-").replace(/\//g, "_");
  }
}

module.exports = base64;
