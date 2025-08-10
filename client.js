(() => {
  const ws = new WebSocket(`ws://${location.host}`);
  const chat = document.getElementById('chat');
  const input = document.getElementById('input');

  ws.onmessage = (evt) => {
    const msg = document.createElement('div');
    msg.textContent = evt.data;
    chat.appendChild(msg);
    chat.scrollTop = chat.scrollHeight;
  };

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && input.value.trim() !== '') {
      ws.send(input.value);
      input.value = '';
    }
  });
})();
