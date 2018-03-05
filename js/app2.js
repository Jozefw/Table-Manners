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

  function UIController(response){

    let tableData = '';

    response.test_cases.forEach(function(item){

        tableData = '';
        tableData += `<h2>${item.test_name} <span class="time"> ${new Date(response.time_stamp)}</span></h2>`;

        item.test_steps.forEach(function(name){
            tableData += `<a href ="#" class="test_name">${name.step_name}</a>`;

            tableData += `<table border=1 class="bordered striped highlight"><tr>`
            tableData +=`<td width="50%"><img src="img/${name.screenshot}" width=100></td>`;
            tableData += `<td class="blue">`;

            tableData += returnData2(name.launch_times,name.memory, name.cpu);

            tableData += `</td></tr>`;
            tableData+= `</table>`;
        });
     
        document.querySelector('#info').insertAdjacentHTML('beforeend', tableData);
    });
}       
     function returnData2(header1,header2,header3){
        let tableData2 = `<table class="color-stripe"><tr><th>Launch Times</th><th>Memory</th><th>CPU</th></tr>`
            
        for(let i = 0; i < header1.length; i++){

            tableData2 += `
            <tr><td>${header1[i]}</td><td>${header2[i]}</td><td>${header3[i]}</td></tr>`;
        }
        tableData2 += `</table>`;
        return tableData2;

     }
