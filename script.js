$(document).ready(function () {

  var all = false;
  var complete = false;
  var active = false;

  var displayList = function () {
    $.ajax({
      type: 'GET',
      url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=216',
      dataType: 'json',
      success: function (response, textStatus) {
        $('#list').empty();
        var ascending = response.tasks.sort(function (a, b) {
          return a.id - b.id;
        });
        ascending.forEach(function (task) {
          $('#list').append('<div class="row justify-content-center"><p class="col-8">' + task.content + '</p><button class="btn btn-sm btn-danger delete" data-id="' + task.id + '">Delete</button><input type="checkbox" class="marking" data-id="' + task.id + '"' + (task.completed ? 'checked' : '') + '/ ></div>');
        });
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    });
  }

  var displayListComplete = function () {
    $.ajax({
      type: 'GET',
      url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=216',
      dataType: 'json',
      success: function (response, textStatus) {
        $('#list').empty();
        response.tasks.forEach(function (task) {
          if (task.completed) {
            $('#list').append('<div class="row justify-content-center"><p class="col-8">' + task.content + '</p><button class="btn btn-sm btn-danger delete" data-id="' + task.id + '">Delete</button><input type="checkbox" class="marking" data-id="' + task.id + '"' + (task.completed ? 'checked' : '') + '/ ></div>');
          }
        });
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    });
  }

  var displayListActive = function () {
    $.ajax({
      type: 'GET',
      url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=216',
      dataType: 'json',
      success: function (response, textStatus) {
        $('#list').empty();
        response.tasks.forEach(function (task) {
          if (!task.completed) {
            $('#list').append('<div class="row justify-content-center"><p class="col-8">' + task.content + '</p><button class="btn btn-sm btn-danger delete" data-id="' + task.id + '">Delete</button><input type="checkbox" class="marking" data-id="' + task.id + '"' + (task.completed ? 'checked' : '') + '/ ></div>');
          }
        });
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    });
  }
  var addList = function () {
    $.ajax({
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
        $('#newTaskInput').val('');
        all = true;
        complete = false;
        active = false;
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

  var deleteList = function (id) {
    $.ajax({
      type: 'DELETE',
      url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks/' + id + '?api_key=216',
      dataType: 'json',

      success: function (response, textStatus) {
        if (complete == true) {
          displayListComplete();
        } else if (active == true) {
          displayListActive();
        } else {
          displayList();
        }
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    });
  }

  $('body').on('click', 'button.delete', function () {
    deleteList($(this).data('id'));
  })

  var checkComplete = function (id) {
    $.ajax({
      type: 'PUT',
      url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks/' + id + '/mark_complete?api_key=216',
      dataType: 'json',

      success: function (response, textStatus) {
        if (complete == true) {
          displayListComplete();
        } else if (active == true) {
          displayListActive();
        } else {
          displayList();
        }
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    });
  }

  var checkActive = function (id) {
    $.ajax({
      type: 'PUT',
      url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks/' + id + '/mark_active?api_key=216',
      dataType: 'json',

      success: function (response, textStatus) {
        if (complete == true) {
          displayListComplete();
        } else if (active == true) {
          displayListActive();
        } else {
          displayList();
        }
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    });
  }

  $('body').on('change', 'input.marking', function () {
    if (this.checked) {
      checkComplete($(this).data('id'));
    } else {
      checkActive($(this).data('id'));
    }
  });

  $('#toggleAll').on('click', function (event) {
    all = true;
    complete = false;
    active = false;
    displayList();
  });

  $('#toggleComplete').on('click', function (event) {
    complete = true;
    all = false;
    active = false;
    displayListComplete();
  });

  $('#toggleActive').on('click', function (event) {
    active = true;
    all = false;
    complete = false;
    displayListActive();
  });

  displayList();

});
