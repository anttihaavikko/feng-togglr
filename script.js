var api_token, feng_url;

chrome.storage.sync.get({
  apiToken: '',
  fengUrl: ''
}, function(items) {
  api_token = items.apiToken;
  feng_url = items.fengUrl;

  $.start();
});

$.start = function() {
  if (feng_url && feng_url.length > 0 && window.location.toString().indexOf(feng_url) > -1) {
    $.tryToAddButton = function() {
      if($("#actionsDialog1").length > 0 && $("#toggl-button").length == 0) {

        var task_id = $(".prop-col-div").eq(0).text().split(":")[1].trim();
        var task_name = $(".coViewTitleContainer td").eq(0).text().trim();

        $("#actionsDialog1").prepend("<a href='#' id='copy-button' data-clipboard-text='"+task_id+": "+task_name+"'>Copy task</a>");
        $("#actionsDialog1").prepend("<a href='#' id='toggl-button'>Toggl this</a>");

        var clipboard = new Clipboard('#copy-button');
        clipboard.on('success', function(e) {
          $('#copy-button').addClass("done");
          setTimeout(function() {
            $('#copy-button').removeClass("done");
          }, 2000);
          e.clearSelection();
        });
      }

      setTimeout($.tryToAddButton, 1000);
    }

    $.tryToAddButton();

    $(document).on("click", "#toggl-button", function(e) {

      e.preventDefault();

      var task_id = $(".prop-col-div").eq(0).text().split(":")[1].trim();
      var task_name = $(".coViewTitleContainer td").eq(0).text().trim();
      var project_name = $(".mname").eq(0).text().trim();
      var task_data = '{"time_entry":{"description":"'+task_id+": "+task_name+'","created_with":"Feng Togglr", "tags":["'+project_name+'"]}}';

      $.ajax({
        url: 'https://www.toggl.com/api/v8/time_entries/start',
        method: 'POST',
        username: api_token,
        password: 'api_token',
        headers: {"Content-Type": "application/json"},
        data: task_data
      }).done(function() {
        $("#toggl-button").slideUp("fast");
      }).fail(function() {
        console.log("API token: " + api_token);
        console.log("DATA: " + task_data);
      });
    });
  }
}
