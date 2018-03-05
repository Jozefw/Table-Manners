function loadJSON(callback) {
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open('GET', 'data.json', true);
  xobj.onreadystatechange = function() {
      if (xobj.readyState == 4 && xobj.status == "200") {
          callback(xobj.responseText);
      }
  }
  xobj.send(null);
}

loadJSON(function(response) {
    jsonresponse = JSON.parse(response);
    UIController(jsonresponse);
});

function UIController(response)
{
let htmlLeft = '',
    tableData = '',
    tableHeader = '',
    unOrdered = '',
    childDiv = '',
    time = new Date(response.time_stamp),
    imageHtml = '';
    
    console.log(response);
    console.log(time);
    
    response.test_cases.forEach(function(item){

    tableData = '',
    tableData +=`<h2>${item.test_name} <span class="time"> ${new Date(response.time_stamp)}</span></h2>`;

    item.test_steps.forEach(function(name){
      console.log(name);
      tableData +=`<a href="#" class="test_name">${name.step_name}</a>`;

      tableData += `<table border=1 class="bordered striped highlight">`;
      tableData += `<tr><td width="50%"><img src="../img/${name.screenshot}" width=100></td>`;
      tableData += `<td class="blue">`;

      tableData += returnTable(name.launch_times, name.memory, name.cpu);
   
      tableData += '</td></tr>';
      tableData += `</table>`;

    });
        
    $('#info').append(tableData);

  });
  
}

function returnTable(col1, col2, col3) {

  let tableData = '<table class="color-stripe"><tr><th>Launch Times</th><th>Memory</th><th>CPU</th></tr>';

  for (i = 0; i < col1.length; i++) {

    tableData += `<tr><td>${col1[i]}</td><td>${col2[i]}</td><td>${col3[i]}</td></tr>`;
  }

  tableData += '</table>';
  return tableData;
}