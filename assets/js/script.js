// RAW JSON DATA FOR FUTURE AJAX
var json = {
  week: 32,
  days: {
    monday: {
      date: "2014, 10, 6",
      tasks: [],
    },
    
    tuesday: {
      date: "2014, 10, 7",
      tasks: [],
    },
    
    wednesday: {
      date: "2014, 10, 8",
      tasks: [
          {
            name: "Al Di Meola",
            start: { hour: "9", minute: "30" },
            end: { hour: "14", minute: "00" }
          }
        ],
    },
    
    thursday: {
      date: "2014, 10, 9",
      tasks: [
          {
            name: "Paco De Lucia",
            start: { hour: "9", minute: "30" },
            end: { hour: "12", minute: "30" }
          }
        ],
    },
    
    friday: {
      date: "2014, 10, 10",
      tasks: [
          {
            name: "John McLaughlin",
            start: { hour: "8", minute: "00" },
            end: { hour: "10", minute: "30" }
          }
        ],
    },
    
    saturday: {
      date: "2014, 10, 11",
      tasks: [],
    },
    
    sunday: {
      date: "2014, 10, 12",
      tasks: [],
    }
  }
};
//


var Calendar = function(container) {
  this.daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  this.data = {};
  this.container = container || "";
  this.hourStart = 8;
  
  this.container.innerHTML = "<a href='#' id='calendar-load-prev'><-</a> <a href='#' id='calendar-load-next'>-></a><table class='calendar table table-bordered'><thead><tr></tr></thead><tbody></tbody></table>";
  
  // Init <thead>
  var theadHTML = "";
  for (var i = 0; i <= 7; ++i) {
    theadHTML += i ? "<th id='day-" + this.daysOfWeek[i-1] + "' width='15%'>" + "</th>" : "<th>&nbsp;</th>";
  }
  this.container.getElementsByTagName('tr')[0].innerHTML = theadHTML;
  
  // Init <tbody>
  var tbodyHTML = "";
  for (var i = 0; i < 23; ++i) {
    var hour = (this.hourStart + Math.floor(i/2));
    var minute = (i%2 ? "30" : "00");
    tbodyHTML += "<tr><td>" + hour + ":" + minute + "</td>";
    for (var j = 0; j < 7; ++j) {
      tbodyHTML += "<td id='row-" + this.daysOfWeek[j] + "-" + hour + "-" + minute +"' class='no-events' rowspan='1'></td>";
    }
    tbodyHTML += "</tr>";
  }
  
  // ADD EVENTLISTENER ON CLICK
  document.getElementById('calendar-load-prev').addEventListener('click', function(evt){
    evt.preventDefault();
    this.getWeek(this.week - 1);
   
  });
  
  document.getElementById('calendar-load-next').addEventListener('click', function(evt){
    evt.preventDefault();
    this.getWeek(this.week + 1);
  });
  
  this.container.getElementsByTagName('tbody')[0].innerHTML = tbodyHTML;
  this.getWeek();
};

Calendar.prototype.getWeek = function(week) {
  week = week || "";
  // AJAX
  // URL => "http://www.xxxxxx.com/apiCalendar?week=" . week
  // SUCCESS => function(json){
    this.data = json;
    this.week = this.data.week;
    for(var day in json.days) {
      document.getElementById('day-' + day).innerHTML = new Date(this.data.days[day].date).toDateString();
      this.data.days[day].tasks.forEach(function(task){
        var row = document.getElementById('row-' + day + '-' + task.start.hour + '-' + task.start.minute);
        console.log('row-' + day + '-' + task.start.hour + '-' + task.start.minute);
        row.className = "has-events";
        row.rowSpan = (task.end.hour - task.start.hour)*2 + !!(task.end.minute);
        row.innerHTML = "<div class='row-fluid lecture' style='width: 99%; height: 100%;'><span class='title'>" + task.start.hour + ":" + task.start.minute + "</span> <span class='lecturer'><a>" + task.name + "</a></span></div>";
      });
    }
  // }
};

var myCalendar = new Calendar(document.getElementById("container"));






