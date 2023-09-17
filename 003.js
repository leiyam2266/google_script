function LoopingtheData()
{
for (var i = 0; i < data.length; i++) 
  {
  for (var j = 0; j < data[i].length; j++) 
    {
      var value = data[i][j];
      Logger.log(data[i][j]);
      if (duplicateValues[value] == undefined) 
      {
        duplicateValues[value] = 1;
      } else 
      {
        duplicateValues[value]++;
      }
      return duplicateValues
    }
  }
}

function checkArrayAndLinkToCalendar() 
{
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheetId = ss.getId();
  var sheetName = "Data log";
  
  // Get the sheet and data range
  var sheet = SpreadsheetApp.openById(sheetId).getSheetByName(sheetName);
  var dataRange = sheet.getDataRange();
  
  // Get the data from the range as a 2D array
  var data = dataRange.getValues();

  var calendar = CalendarApp.getDefaultCalendar();
  var duplicateValues = {};

  // Sort the array
  data.sort();
  
  var duplicateValues = LoopingtheData(duplicateValues)

      if (duplicateValues[value] >= 2) {
        var calendar = CalendarApp.getCalendarById('b06650f191656bbd25a7416c0e6b9dbf73b334a63b19303e688bfdc02be728ab@group.calendar.google.com');
        var eventString = data[i][j];
        var eventDetails = eventString.split("|");
        eventDetails[0] = eventDetails[0].split(" - ");
        startTimeStr = eventDetails[0][0];
        endTimeStr = eventDetails[0][1];
        var startDateStr = eventDetails[1];
        Logger.log("Start Time :"+ startTimeStr);
        Logger.log("End Time : "+ endTimeStr);
        Logger.log(startDateStr);
        var startTime = new Date(startDateStr+'T'+startTimeStr); // Replace with your desired start time
        var endTime = new Date(startDateStr+'T'+ endTimeStr); // Replace with your desired end time
       
        var options = 
        {
          description: '--',
          location: '---'
        };

        var conflictingEvents = calendar.getEvents(startTime, endTime);
        Logger.log("conflictingEvents" + conflictingEvents)
        if (conflictingEvents.length > 0) 
        {
          Logger.log('There is already an event scheduled during this time. Skipping creation.');
        } 
        else 
        {
          // Create the event
          var title = value;
          var event = calendar.createEvent(title, startTime, endTime, options);
          Logger.log('Event ID: ' + event.getId());
          duplicateValues[value] = 0;

          }
        }
      }
