alert("here");

function save_options() {
  alert("saving");
  var api_token = document.getElementById('api_token').value;
  var feng_url = document.getElementById('feng_url').value;
  chrome.storage.sync.set({
    apiToken: api_token,
    fengUrl: feng_url
  }, function() {
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {status.textContent = '';}, 750);
  });
}

function restore_options() {
  chrome.storage.sync.get({
    apiToken: '',
    fengUrl: ''
  }, function(items) {
    document.getElementById('api_token').value = items.apiToken;
    document.getElementById('feng_url').value = items.fengUrl;
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);

alert("sup");
