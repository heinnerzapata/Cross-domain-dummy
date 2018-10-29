var $btnShowAlert = document.getElementById('btnShowAlert');
var $dataContainer = document.getElementById('txtReceived');

var $listenerActive = document.getElementById('listener-active');
var $listenerNoActive = document.getElementById('listener-no-active');

var $stateContainer = document.getElementById('state-container');
var $listenerStatus = document.getElementById('listener-status');

var $btnListen = document.getElementById('btnListen');
var $txtTarget =  document.getElementById('txtTarget');
var $btnSend = document.getElementById('btnSend');

var isListening = false;
var data = {};
var confirmation = false;

$btnListen.addEventListener('click', () => {
  isListening = !isListening;
  if(isListening) {
    listenMessages();
  }else {
    notListenMessages();
  }
});

handleTargetChange = (event) => {
  if($txtTarget.value !== null && $txtTarget.value !== '') {
    $btnListen.disabled = false;
  }
  else {
    $btnListen.disabled = true;
    notListenMessages();
  }
};

$txtTarget.addEventListener('keypress', handleTargetChange);
$txtTarget.addEventListener('change', handleTargetChange);

handleMessageListener = (event) => {
  if(event.origin !== $txtTarget.value) return;
  setMessageHandlerConfig();
  event.source.postMessage('CONFIRM_RESPONSE',event.origin)
  data = JSON.parse(event.data);
  $dataContainer.innerHTML= JSON.stringify(data);
};

listenMessages = () => {
  setListenConfig();
  window.addEventListener('message',function(event) {
    this.handleMessageListener(event);
  },false);
};

notListenMessages = () => {
  setNotListenConfig();
  window.removeEventListener('message',function(event) {
    this.handleMessageListener(event);
  });
};

setMessageHandlerConfig = () => {
  console.log('received data: ',  event.data, ' from ', event.origin);
  console.log('-----------------------------------------');
  console.log('sending confirmation to', event.origin);
};

setListenConfig = () => {
  console.log('listening..');
  $listenerActive.classList.add('is-visible');
  $listenerNoActive.classList.remove('is-visible');
  $listenerStatus.innerHTML = 'Listening !!';
  $btnListen.innerHTML = 'stop';
  $txtTarget.disabled = true;
  $btnSend.disabled = false;
}

setNotListenConfig = () => {
  console.log('not listening..');
  $listenerNoActive.classList.add('is-visible');
  $listenerActive.classList.remove('is-visible');
  $listenerStatus.innerHTML = 'Not listening';
  $btnListen.innerHTML = 'listen';
  $txtTarget.disabled = false;
  $btnSend.disabled = true;
};

setInitConfig = () => {
  $listenerNoActive.classList.add('is-visible');
  $listenerStatus.innerHTML = 'Not listening';
  $btnListen.disabled = true;
  $btnSend.disabled = true;
}; 

setInitConfig();
