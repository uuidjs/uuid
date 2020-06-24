export default function test(callback) {
  const style = document.createElement('style');
  style.appendChild(
    document.createTextNode(
      [
        'body {font-family: monospace;}',
        'dt, dd {display: inline-block; margin: 0;}',
        'dt {min-width: 15em;}',
      ].join('\n')
    )
  );
  document.body.appendChild(style);

  function addTest(title, result) {
    // join() result if it's  array-like
    if (result instanceof Uint8Array || Array.isArray(result)) {
      result = Array.prototype.join.apply(result);
    }

    let el;
    if (result === undefined) {
      el = document.createElement('h2');
      el.innerHTML = title;
    } else {
      el = document.createElement('div');
      el.className = 'test_result';
      el.innerHTML = '<dt>' + title + '</dt>: <dd>' + result + '</dd>';
    }

    document.body.appendChild(el);
  }

  function done() {
    const div = document.createElement('h2');
    div.id = 'done';
    document.body.appendChild(div);
  }

  window.onload = function () {
    callback(addTest, done);
  };
}
