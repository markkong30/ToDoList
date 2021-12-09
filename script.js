$(document).ready(function () {

  $.ajax ({
    type: 'POST',
    url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=216',
    contentType: 'application/json',
    dataType: 'json',
    data: JSON.stringify({
      task: {
        content: 'Make friends with aliens'
      }
    }),

    success: function (response) {
      console.log(response);
    },
    error: function (errorMessage) {
      console.log(error.message);
    }
  });




















});