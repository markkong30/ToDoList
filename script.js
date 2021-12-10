$(document).ready(function () {

  var displayList = function () {
    $.ajax({
      type: 'GET',
      url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=216',
      dataType: 'json',
      success: function (response, textStatus) {
        $('#list').empty();
        response.tasks.forEach(function (task) {
          $('#list').append('<div class="row justify-content-center"><p class="col-8">' + task.content + '</p><button class="btn btn-sm btn-danger delete" data-id="' + task.id + '">Delete</button><input type="checkbox" class="mark-complete" data-id="' + task.id + '"' + (task.completed ? 'checked' : '') + '></div>');
        });
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    });
  }



  var addList = function () {
    $.ajax ({
    type: 'POST',
    url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=216',
    contentType: 'application/json',
    dataType: 'json',
    data: JSON.stringify({
      task: {
        content: $('#newTaskInput').val()
      }
    }),

    success: function (response, textStatus) {
      $('#newTaskInput').trigger('reset');
      displayList();
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  });
}

$('#addtask').on('submit', function (event) {
  event.preventDefault();
  addList();
  
});


displayList()


});
