function checkArrayAndLinkToCalendar() 
{
  let sheet = SpreadsheetApp.getActiveSheet();
  let range = sheet.getRange(2, 2, 2, 3);
  let display_data = range.getDisplayValues();
  var calendar = CalendarApp.getDefaultCalendar();
  var duplicateValues = {};

  // Sort the array
  display_data.sort();

 for (var i = 0; i < display_data.length; i++) {
    for (var j = 0; j < display_data[i].length; j++) {
      var value = display_data[i][j];
      if (duplicateValues[value] == undefined) {
        duplicateValues[value] = 1;
      } else {
        duplicateValues[value]++;
      }

      if (duplicateValues[value] >= 2) {
        var calendar = CalendarApp.getCalendarById('b06650f191656bbd25a7416c0e6b9dbf73b334a63b19303e688bfdc02be728ab@group.calendar.google.com');
        var title = 'Boxing';
        var eventString = display_data[i][j];
        var eventDetails = eventString.split("|");
        var startTimeStr = eventDetails[0];
        var startDateStr = eventDetails[1];
        Logger.log(startTimeStr);
        Logger.log(startDateStr);
        var startTime = new Date(startDateStr+'T'+startTimeStr); // Replace with your desired start time
        var endTime = new Date(startDateStr+'T'+startTimeStr); // Replace with your desired end time
        var options = {
        description: 'This is a sample event.',
        location: '123 Main St, Anytown USA'
      };
      var event = calendar.createEvent(title, startTime, endTime, options);
      Logger.log('Event ID: ' + event.getId());
      duplicateValues[value] = 0
      }
    }
  }
}
function createCalendarEvent() {
  var calendar = CalendarApp.getCalendarById('your_calendar_id'); // Replace with your calendar ID
  var eventTitle = 'Your event title';
  var startTime = new Date('June 4, 2023 13:00:00'); // Replace with your desired start time
  var endTime = new Date('June 4, 2023 14:00:00'); // Replace with your desired end time

  // Check if there is already an event scheduled during the desired time
  var conflictingEvents = calendar.getEvents(startTime, endTime);
  if (conflictingEvents.length > 0) {
    Logger.log('There is already an event scheduled during this time. Skipping creation.');
    return;
  }

  // Create the event if there are no conflicts
  var event = calendar.createEvent(eventTitle, startTime, endTime);
  Logger.log('Event created: ' + event.getTitle() + ' (' + event.getStartTime() + ' - ' + event.getEndTime() + ')');
}
