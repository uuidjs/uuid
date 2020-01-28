export default function test(callback) {
  const ul = document.createElement('ul');
  document.body.appendChild(ul);

  function addTest(title, result) {
    const li = document.createElement('li');

    const h2 = document.createElement('h2');
    h2.innerHTML = title;
    li.appendChild(h2);

    const p = document.createElement('p');
    p.innerHTML = result;
    li.appendChild(p);

    ul.appendChild(li);
  }

  function done() {
    const div = document.createElement('div');
    div.id = 'done';
    document.body.appendChild(div);
  }

  window.onload = function() {
    callback(addTest, done);
  };
}
