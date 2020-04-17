function CreateTableFromJSON() {

		var data;
		fetch('https://coronavirus-19-api.herokuapp.com/countries')
			.then(res => res.json())
			.then((out) => {
				//console.log('Output: ', out);
				data = out;
		
        //console.log(data);


        var BDData;
        fetch('https://coronavirus-19-api.herokuapp.com/countries/bangladesh')
                .then(res => res.json())
                .then((out) => {

                    BDData = out;

        //Need to add graph        
            
        //console.log(BDData);
        document.getElementById("BDCountry").innerHTML = JSON.stringify(BDData.country);
        document.getElementById("BDCases").innerHTML = JSON.stringify(BDData.cases);
        document.getElementById("TODAYCases").innerHTML = JSON.stringify(BDData.todayCases);
        document.getElementById("BDDeaths").innerHTML = JSON.stringify(BDData.deaths);
        document.getElementById("TODAYDeaths").innerHTML = JSON.stringify(BDData.todayDeaths);
        document.getElementById("Recovered").innerHTML = JSON.stringify(BDData.recovered);

        }).catch(errors => console.error(errors));
        
        
        // EXTRACT VALUE FOR HTML HEADER. 
        // ('Country', 'Cases', etc)
        var col = [];
        for (var i = 0; i < data.length; i++) {
            for (var key in data[i]) {
                if (col.indexOf(key) === -1) {
                    col.push(key);
                }
            }
        }
        
    
        // CREATE DYNAMIC TABLE.
        var table = document.createElement("table");
		table.setAttribute("class", "table table-striped");
        var thead = document.createElement("thead");
        thead.setAttribute("class", "thead-dark");
        // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.
        

        var tr = table.insertRow(-1);
        tr.setAttribute("class", "thead-dark");
                           // TABLE ROW.
        for (var i = 0; i < col.length; i++) {

            var th = document.createElement("th");      // TABLE HEADER.
            th.innerHTML = col[i].toUpperCase();
            th.setAttribute("id", "S"+i);
            tr.appendChild(th);
        }
        

        var aclength = data.length - 7;

        
        // ADD JSON DATA TO THE TABLE AS ROWS.
        // 0 = World Data
        for (var i = 8; i < aclength; i++) {
            
            tr = table.insertRow(-1);

            for (var j = 0; j < col.length; j++) {
                var tabCell = tr.insertCell(-1);
                

                tabCell.innerHTML = data[i][col[j]];
            }
        }

        
        
        // ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
        var divContainer = document.getElementById("showData");
        divContainer.innerHTML = "";
        divContainer.appendChild(table);
        
		
		}).catch(err => console.error(err));
    }


