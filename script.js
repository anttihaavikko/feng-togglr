var api_token = "ADD_YOUR_API_TOKEN_HERE";

if (window.location.toString().indexOf("feng.focusflow.net") > -1) {
  $.tryToAddButton = function() {
    if($("#actionsDialog1").length > 0 && $("#toggl-button").length == 0) {
      $("#actionsDialog1").prepend("<a href='#' id='toggl-button'>Toggl this</a>");
    }

    setTimeout($.tryToAddButton, 1000);
  }

  $.tryToAddButton();

  $(document).on("click", "#toggl-button", function(e) {

    e.preventDefault();

    var task_id = $(".prop-col-div").eq(0).text().split(":")[1].trim();
    var task_name = $(".coViewTitleContainer td").eq(0).text().trim();
    var project_name = $(".mname").text().trim();

    $.ajax({
      url: 'https://www.toggl.com/api/v8/time_entries/start',
      method: 'POST',
      username: api_token,
      password: 'api_token',
      headers: {
        "Content-Type": "application/json"
      },
      data: '{"time_entry":{"description":"'+task_id+": "+task_name+'","created_with":"Feng Togglr", "tags":["'+project_name+'"]}}'
    }).done(function() {
      $("#toggl-button").slideUp("fast");
    })
  });
}