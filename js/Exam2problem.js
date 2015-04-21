function MenuChoice()
{
var menu=document.getElementById("menu").value;

if (menu == "All Categories")
{
document.getElementById("section1").style.visibility = "visible";
document.getElementById("section2").style.visibility = "hidden";
document.getElementById("section3").style.visibility = "hidden";
document.getElementById("section4").style.visibility = "hidden";
document.getElementById("section5").style.visibility = "hidden";

}
else if (menu == "Create Category")
{
document.getElementById("section1").style.visibility = "hidden";
document.getElementById("section2").style.visibility = "visible";
document.getElementById("section3").style.visibility = "hidden";
document.getElementById("section4").style.visibility = "hidden";
document.getElementById("section5").style.visibility = "hidden";


}
else if (menu == "Update Category Description")
{
document.getElementById("section1").style.visibility = "hidden";
document.getElementById("section2").style.visibility = "hidden";
document.getElementById("section3").style.visibility = "visible";
document.getElementById("section4").style.visibility = "hidden";
document.getElementById("section5").style.visibility = "hidden";

}
else if (menu == "Delete Category")
{
document.getElementById("section1").style.visibility = "hidden";
document.getElementById("section2").style.visibility = "hidden";
document.getElementById("section3").style.visibility = "hidden";
document.getElementById("section4").style.visibility = "visible";
document.getElementById("section5").style.visibility = "hidden";

}
else if (menu == "About")
{
document.getElementById("section1").style.visibility = "hidden";
document.getElementById("section2").style.visibility = "hidden";
document.getElementById("section3").style.visibility = "hidden";
document.getElementById("section4").style.visibility = "hidden";
document.getElementById("section5").style.visibility = "visible";

}
else
{
document.getElementById("section1").style.visibility = "hidden";
document.getElementById("section2").style.visibility = "hidden";
document.getElementById("section3").style.visibility = "hidden";
document.getElementById("section4").style.visibility = "hidden";
document.getElementById("section5").style.visibility = "hidden";

}
}

function GetAllCategory()
{
var menu=document.getElementById("menu").value;
var objRequest = new XMLHttpRequest(); //Create AJAX request object
//Create URL and Query string
var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/getAllCategories";

//Checks that the object has returned data
objRequest.onreadystatechange = function()
{
if (objRequest.readyState == 4 && objRequest.status == 200)
{
var output = JSON.parse(objRequest.responseText);

GenerateOutputAllCategory(output);
}
}
//Initiate the server request
objRequest.open("GET", url, true);
objRequest.send();
}

function CreateCategory()
{
var objRequest = new XMLHttpRequest();
var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/CreateCategory";
//Collect Customer data from web page

var cname= document.getElementById("catname").value;
var cdescription = document.getElementById("catdescription").value;
//Create the parameter string
var newcat = '{"CName":"' + cname +'","Cdescription":"' + cdescription +'"}';

//Checking for AJAx operation return
objRequest.onreadystatechange = function()
{
if (objRequest.readyState == 4 && objRequest.status == 200)
{
var result = JSON.parse(objRequest.responseText);
CreateCategoryResult(result);
}
}
//Start AJAX request
objRequest.open("POST", url, true);
objRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
objRequest.send(newcat);
}

function UpdateCategory()
{
var objRequest = new XMLHttpRequest();
var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/updateCatDescription";
//Collect Customer data from web page
var cid= document.getElementById("catid2").value;
var cdescription = document.getElementById("catdescription2").value;
//Create the parameter string
var updatecat = '{"CID":"' + cid +'","Cdescription":"' + cdescription +'"}';

//Checking for AJAx operation return
objRequest.onreadystatechange = function()
{
if (objRequest.readyState == 4 && objRequest.status == 200)
{
var result = JSON.parse(objRequest.responseText);
UpdateResult(result);
}
}
//Start AJAX request
objRequest.open("POST", url, true);
objRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
objRequest.send(updatecat);
}


function DeleteCategory()
{
var cid = document.getElementById("catid").value;
var result = confirm("Delete category "+cid+" ?");
if (result) {
    
var objRequest = new XMLHttpRequest();
var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/deleteCategory/";
url += cid;
//Checks that the object has returned data
objRequest.onreadystatechange = function()
{
if (objRequest.readyState == 4 && objRequest.status == 200)
{
var result = JSON.parse(objRequest.responseText);
DeleteOperationResult(result);
}
}
//Initiate the server request
objRequest.open("GET", url, true);
objRequest.send();

} else return;
}

function GenerateOutputAllCategory(result)
{
var count = 0;
var displaytext = "<table><tr><th>#</th><th>Category Name</th><th>ID</th><th>Description</th></tr>"; 
//Loop to extract data from the response object
for (count = 0; count < result.GetAllCategoriesResult.length; count++)
{
displaytext += "<tr><td>"+(count+1)+"</td><td>" + result.GetAllCategoriesResult[count].CName +"</td><td>"+result.GetAllCategoriesResult[count].CID + "</td><td>" + result.GetAllCategoriesResult[count].CDescription+ "</td></tr>";
}
result += "</table>";
document.getElementById("allcatdisplay").innerHTML = displaytext;
}


function CreateCategoryResult(output)
{
if (output.WasSuccessful == 1)
{
document.getElementById("result").innerHTML = "The operation was successful!"
}
else
{
document.getElementById("result").innerHTML = "The operation was not successful!" + "<br>" + output.Exception;
}
}

function UpdateResult(output)
{
for (var propName in output){
			var objname = output[propName];
}

if (objname == 1)
{
document.getElementById("updateresult").innerHTML = "The operation was successful!"
}
else if (objname == -2)
{
document.getElementById("updateresult").innerHTML = "The operation was not successful!" + "<br>The data string supplied could not be deserialized into the service object";
} 
else if (objname == -3)
{
document.getElementById("updateresult").innerHTML = "The operation was not successful!" + "<br>A record with the supplied Category ID could not be found";
} 
else
{
document.getElementById("updateresult").innerHTML = "Operation failed with an unspecified error";
}

}

function DeleteOperationResult(output)
{
if (output.DeleteCategoryResult.WasSuccessful == 1)
{
document.getElementById("deleteresult").innerHTML = "The operation was successful!"
}
else
{
document.getElementById("deleteresult").innerHTML = "The operation was not successful!" + "<br>" + output.DeleteCategoryResult.Exception;
}
}