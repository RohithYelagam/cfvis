
var handle='';
var url='https://codeforces.com/api/'
var arr = {};
var rating_arr = {};
var time_arr  = {};
var tle = 0;
var ac = 0;
var rte = 0;
var wa = 0;
var cmp = 0;
var me=0;
var total=0;
var rating_count=0
var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
var tag_a=0,tag_b=0,tag_c=0,tag_d=0,tag_e=0,tag_f=0,tag_g=0,tag_h=0,tag_i=0,tag_j=0,tag_k=0,tag_l=0;
var tag_arr ={};


google.charts.load("current", {packages:["corechart"]});
google.charts.load('current', {packages: ['corechart', 'line']});
google.charts.load('current', {packages: ['corechart', 'bar']});

$(document).ready(function(){
  $('#profile').hide();
  $('#piechart_3d').hide();
  $('#piechart_3d_2').hide();
  $('#piechart_3d_3').hide();
  $('#chart_div').hide();
   $('#mybtn').click(function(e){
    e.preventDefault();
    clearData();
    $('#piechart_3d').show();
  $('#piechart_3d_2').show();
  $('#piechart_3d_3').show();
  $('#chart_div').show();
    $('#myinput').blur();
    handle = $('#myinput').val().trim();

    req1 = $.get(url+'user.info?handles='+handle,function(data,status){


     if (data.result.length < 1) {
        err_message('handleDiv', 'No submissions');
        return;
      }
  
      
   // console.log(data.result[0].titlePhoto);
      const aa = document.getElementById('profile-photo');
      const pho = document.createElement('img');
      pho.setAttribute('src',data.result[0].titlePhoto);
      var fullname = data.result[0].firstName+'  '+data.result[0].lastName;
      var city = 'City:'+data.result[0].city+'   Country:'+data.result[0].country;
      var rating = 'Rating: '+data.result[0].rating+'    MaxRating: '+data.result[0].maxRating;
      var rank = 'Rank: '+data.result[0].rank+'     MaxRank: '+data.result[0].maxRank;
      aa.append(pho);
      if(data.result[0].firstName != undefined && data.result[0].lastName != undefined){
      const x = document.createElement('p');
       x.textContent = fullname;
       $("#profile-fullname").append(x);
      }else{
        $("#profile-fullname").hide();
      }
      
       const a = document.createElement('p');
       a.textContent = handle;
       $("#profile-handle").append(a);

       if(data.result[0].city != undefined || data.result[0].country != undefined){
       const b = document.createElement('p');
       b.textContent = city;
       $("#profile-city-country").append(b);
       }else{
        $("#profile-city-country").hide();
       }

       if(data.result[0].rating != undefined){
       const c = document.createElement('p');
       c.textContent = rating;
       $("#profile-rating").append(c);
       }else{
        $("#profile-rating").hide();
       }

       if(data.result[0].rank != undefined){
       const d = document.createElement('p');
       d.textContent = rank;
       $("#profile-rank").append(d);
       }else{
        $("#profile-rank").hide();
       }

     $('#profile').show();
  
      
    })
    .fail(function(temp,status){
     // console.log(temp.status);
      alert('Enter the correct Handle');
    })

    req2 = $.get(url+'user.status?handle='+handle,function(data,status){
       // console.log(data);
      // console.log(data.result[0].problem.index)


        for(var i = 0;i<data.result.length;i++){
            total++;
           // console.log(data.result[i].verdict);
          // console.log(data.result[i].problem.index[0]);
         var tag=data.result[i].problem.index[0];
         if(tag === 'A')tag_a++;
         if(tag === 'B')tag_b++;
         if(tag === 'C')tag_c++;
         if(tag === 'D')tag_d++;
         if(tag === 'E')tag_e++;
         if(tag === 'F')tag_f++;
         if(tag === 'G')tag_g++;
         if(tag === 'H')tag_h++;
         if(tag === 'I')tag_i++;
         if(tag === 'J')tag_j++;
         if(tag === 'K')tag_k++;
         if(tag === 'L')tag_l++;
         
            var x=data.result[i].verdict;
            if(x === 'TIME_LIMIT_EXCEEDED'){
                tle++;
            }
            if(x === 'OK'){
                ac++;
                data.result[i].problem.tags.forEach(function(t){
                 // console.log(t);
                  if (tag_arr[t] === undefined) tag_arr[t] = 1;
                  else tag_arr[t]++;
                 // console.log(tag_arr[t]);
                  })
            }
            if(x === 'WRONG_ANSWER'){
              wa++;
            }
            if(x === 'RUNTIME_ERROR'){
                rte++;
            }
            if(x === 'COMPILATION_ERROR'){
                cmp++;
            }
            if(x === 'MEMORY_LIMIT_EXCEEDED'){
                me++;
            }
            
           
        }
        
       
        drawChart()
    })

    req3 = $.get(url+'user.rating?handle='+handle,function(data,status){
       // console.log(data);
         for(var j=0;j<data.result.length;j++){
            let UNIX_timestamp = data.result[j].ratingUpdateTimeSeconds;
            var a = new Date(UNIX_timestamp * 1000);
        
        var year = a.getFullYear();
        var month = a.getMonth();
        var date = a.getDate();
        time_arr[j]=[year,month,date];
        rating_arr[j]=[ data.result[j].newRating ];
        rating_count++;
         }

        console.log(tag_arr);
        
      
        drawBasic();
    })
    
   })
});
function clearData(){
    document.getElementById('profile-handle').innerHTML = "";
    document.getElementById('profile-photo').innerHTML = "";
    document.getElementById('profile-fullname').innerHTML = "";
    document.getElementById('profile-city-country').innerHTML = "";
    document.getElementById('profile-rating').innerHTML = "";
    document.getElementById('profile-rank').innerHTML = "";
    $('#profile').hide();
     arr = {};
 rating_arr = {};
 time_arr  = {};
 tle = 0;
 ac = 0;
 rte = 0;
 wa = 0;
 cmp = 0;
 me=0;
 total=0;
 rating_count=0;
 handle='';
 tag_a=0,tag_b=0,tag_c=0,tag_d=0,tag_e=0,tag_f=0,tag_g=0,tag_h=0,tag_i=0,tag_j=0,tag_k=0,tag_l=0;
 tag_arr ={};
    
}


function drawChart() {
   
    var data = google.visualization.arrayToDataTable([
      ['Verdict', 'No of Submissions'],
      ['AC',     ac],
      ['WA',      wa],
      ['TLE',  tle],
      ['RTE', rte],
      ['CMP',    cmp],
      ['MLE',me]
    ]);

    var options = {
      title: 'Verdicts for submissions of '+handle,
      is3D: true,
      titleTextStyle: {
        font:18,
        bold: true,    // true or false
        
    },
    
    };

    var chart = new google.visualization.PieChart(document.getElementById('piechart_3d'));
    chart.draw(data, options);

     data = new google.visualization.DataTable();
      data.addColumn('string', 'Problem Tag');
      data.addColumn('number', 'Problems Solved');

      if(tag_a != 0)data.addRow(['A',tag_a]);
      if(tag_b != 0)data.addRow(['B',tag_b]);
      if(tag_c != 0)data.addRow(['C',tag_c]);
      if(tag_d != 0)data.addRow(['D',tag_d]);
      if(tag_e != 0)data.addRow(['E',tag_e]);
      if(tag_f != 0)data.addRow(['F',tag_f]);
      if(tag_g != 0)data.addRow(['G',tag_g]);
      if(tag_h != 0)data.addRow(['H',tag_h]);
      if(tag_i != 0)data.addRow(['I',tag_i]);
      if(tag_j != 0)data.addRow(['J',tag_j]);
      if(tag_k != 0)data.addRow(['K',tag_k]);
      if(tag_l != 0)data.addRow(['L',tag_l]);

      var options = {
        title: 'Problems solved by Index',
      
        hAxis: {
          //title: 'Index',
          format: 'h:mm a',
          viewWindow: {
            min: [7, 30, 0],
            max: [17, 30, 0]
          } 
        },
        vAxis: {
        // title: 'problems solved'
        }
      };

      var chart = new google.visualization.ColumnChart(
      document.getElementById('piechart_3d_2'));
      chart.draw(data, options);

    
      var data_table=[];
      data_table.push(['Task', 'Hours per Day']);
      for (var tag in tag_arr) {  
      // console.log(tag + ' '+tag_arr[tag]);
       data_table.push([tag,tag_arr[tag]]);
      }
      console.log(data_table);
      var data = google.visualization.arrayToDataTable(data_table);


      var options = {
        title: 'Tags of '+handle,
        pieHole: 0.25,
      };

      var chart = new google.visualization.PieChart(document.getElementById('piechart_3d_3'));
      chart.draw(data, options);
  }
  
  
  function drawBasic() {
  
        var data = new google.visualization.DataTable();
        data.addColumn('date', 'time');
        data.addColumn('number', 'rating');


         for(var z=0;z<rating_count;z++ ){
           
            var year,month,date,rate;
            date = time_arr[z][2];
            month = time_arr[z][1];
            year =time_arr[z][0];
            rate =rating_arr[z][0];
           // console.log(year+' '+month+' '+date+' '+rate)
            data.addRow([new Date(year,month,date),rate]);
          //  data.addRow([new Date(year,month,date), rate]);
         }
        
  
        var options = {
            height:500,
            title:'Rating TimeLine',
          hAxis: {
           // title: 'Timeline',
            direction:-1, 
            slantedText:true, 
            slantedTextAngle:45,
            gridlines: {
                color: "transparent",
              },
            
          },
          vAxis: {
           // title: 'Rating'
            gridlines: {
                color: "transparent",
              },
          },
          titleTextStyle: {
            font:18,
            bold: true,    // true or false
            
        },
        legend: 'none',
        pointSize: 5,
        
          chartArea:{
            backgroundColor: '#fcfcfc'
        }
      

        };
  
        var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
  
        chart.draw(data, options);
      }
      
