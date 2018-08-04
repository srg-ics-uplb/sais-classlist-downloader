/*
 * Function to enable downloading of data.
 */
function download(filename, text) {
   var element = document.createElement('a');
   element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
   element.setAttribute('download', filename);
   element.style.display = 'none';
   document.body.appendChild(element);
   element.click();
   document.body.removeChild(element);
}


console.log("test");
var iframe = document.getElementById("ptifrmtgtframe");

win = iframe.contentWindow || iframe.contentWindow.window;
doc = iframe.contentDocument || iframe.contentWindow.document;

var total = doc.getElementById("DERIVED_SR_RSTR_SSR_ROSTER_CTR1");
var total = total.innerText;

var subject = doc.getElementById("DERIVED_SSR_FC_SSR_CLASSNAME_LONG");
var subject = subject.text;

chrome.runtime.sendMessage(total);


var result = ""+subject+"\n";
for (i=0;i<total;i++){
   var student_info = doc.getElementById("EMAIL_LINK$"+i);
   var student_name = student_info.text;
   var student_email = student_info.href.split(":");
   var student_email = student_email[1];

   var sais_id = doc.getElementById("CLASS_ROSTER_VW_EMPLID$"+i);
   var sais_id = sais_id.innerText;
   
   result += (i+1)+","+sais_id+","+student_name+","+student_email+"\n";
}


chrome.runtime.sendMessage(result);

download(subject+".csv",result);


