function _main(_sheet, _title, calendar, data) {
  var now = new Date();
  Logger.log(_sheet)
  var dataRange = _sheet.getDataRange();
  data = dataRange.getValues();
  // Sort the array
  data.sort();

  for (var i = 0; i < data.length; i++) {
    if (data[i][9] == "能") 
    {
      var startDateStr = data[i][2] + "-" + data[i][3] + "-" + data[i][4];
      var timeStr = data[i][1].split(" - ");
      var startTimeStr = timeStr[0];
      var endTimeStr = timeStr[1];
      var startTime = new Date(startDateStr + "T" + startTimeStr);
      var endTime = new Date(startDateStr + "T" + endTimeStr);
      var options = 
      {
        description: "--",
        location: "Shop A-B&L, 9/F, Maxgrand Plaza, No.3 Tai Yau Street, San Po Kong, Kowloon, HK\n 九龍新蒲崗大有街3號萬廸廣場9樓A-B&L室"
      };
      var conflictingEvents = calendar.getEvents(startTime, endTime); 
      if (conflictingEvents.length > 0) 
      {
        Logger.log("There is already an event scheduled during this time. Skipping creation.");
      } else 
      {
        //var subject = "take part campony sccess";
        //var body = "repair for the event ";
        //MailApp.sendEmail("tickeyshek0824@gmail.com", subject, body);
        // Create the event
        _createEvent(_title, startTime, endTime, options, calendar);
      }
      if (data[i][8] == "額滿") 
    {
      
      var form = FormApp.openById('14jiC23ytjqnMjdcSXl8TYLTNPy4EEECEu5IQhfsPUVE');
      var item = form.getItemById(question.getId());
      var response = form.createResponse();
      var choiceToRemove = item.asMultipleChoiceItem().getChoices()[0]; // Replace with the index of the choice you want to remove
      var answers = response.getResponseForItem(item).getResponse();
      var newAnswers = [];
      for (var i = 0; i < answers.length; i++) {
      if (answers[i] !== choiceToRemove.getValue()) 
      {
      newAnswers.push(answers[i]);
    }
  }
  response.withItemResponse(item.createResponse(newAnswers));
  response.submit();
}
    
  }
}

function _createEvent(event_title,_startTime, _endTime, _options, calendar)
{
      // Create the event
        var title = event_title;
        var event = calendar.createEvent(event_title, _startTime, _endTime, _options);
        Logger.log("Event ID: " + event.getId());
}

}function _importData() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheetId = ss.getId();
  var sheetName_DataLog = "Data Log";
  var sheetName_Yoga = "Yoga";
  var sheetName_Boxing = "Boxing";
  var calendar = CalendarApp.getCalendarById('b06650f191656bbd25a7416c0e6b9dbf73b334a63b19303e688bfdc02be728ab@group.calendar.google.com');

  // Get the sheet and data range
  var sheet_DataLog = SpreadsheetApp.openById(sheetId).getSheetByName(sheetName_DataLog);
  var sheet_Yoga = SpreadsheetApp.openById(sheetId).getSheetByName(sheetName_Yoga);
  var sheet_Boxing = SpreadsheetApp.openById(sheetId).getSheetByName(sheetName_Boxing);

  var data = [];

  _main(sheet_Boxing, sheetName_Boxing , calendar, data);
  _main(sheet_Yoga, sheetName_Yoga , calendar, data);
}
