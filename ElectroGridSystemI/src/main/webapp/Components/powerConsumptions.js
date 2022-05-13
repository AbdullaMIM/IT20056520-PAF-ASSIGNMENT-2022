
$(document).ready(function()
{
		if ($("#alertSuccess").text().trim() == "")
		{
			$("#alertSuccess").hide();
		}
		$("#alertError").hide();
});


// SAVE ============================================
$(document).on("click", "#btnSave", function(event) 
{ 

    // Clear alerts---------------------
    $("#alertSuccess").text(""); 
    $("#alertSuccess").hide(); 
    $("#alertError").text(""); 
    $("#alertError").hide(); 

    // Form validation-------------------
    var status = validatePowerConsumptionForm(); 
    if (status != true) 
    { 
        $("#alertError").text(status); 
        $("#alertError").show(); 
        return; 
    } 

    // If valid------------------------
     var type = ($("#hidPowIDSave").val() == "") ? "POST" : "PUT"; 
     
     $.ajax( 
     { 
          url : "PowerConsumptionsAPI", 
          type : type, 
          data : $("#formPowerConsumption").serialize(), 
          dataType : "text", 
          complete : function(response, status) 
          { 
               onPowerConsumptionSaveComplete(response.responseText, status); 
          } 
     });
}); 



function onPowerConsumptionSaveComplete(response, status) 
{ 
     if (status == "success") 
     { 
        var resultSet = JSON.parse(response); 
 
        if (resultSet.status.trim() == "success") 
       { 
          $("#alertSuccess").text("Successfully saved."); 
          $("#alertSuccess").show(); 
          $("#divPowerConsumptionsGrid").html(resultSet.data); 
       
       } else if (resultSet.status.trim() == "error") 
       { 
           $("#alertError").text(resultSet.data); 
           $("#alertError").show(); 
           
       } 
       } else if (status == "error") 
       { 
         $("#alertError").text("Error while saving."); 
         $("#alertError").show(); 
         
       } else
       { 
          $("#alertError").text("Unknown error while saving.."); 
          $("#alertError").show(); 
      } 
 
          $("#hidPowIDSave").val(""); 
          $("#formPowerConsumption")[0].reset(); 
}


// UPDATE==========================================
$(document).on("click", ".btnUpdate", function(event) 
{ 
   $("#hidPowIDSave").val($(this).data("powid"));
   $("#unitDescription").val($(this).closest("tr").find('td:eq(1)').text()); 
   $("#unitPrice").val($(this).closest("tr").find('td:eq(2)').text());  
}); 



// DELETE==========================================
$(document).on("click", ".btnRemove", function(event) 
{ 
   $.ajax( 
   { 
     url : "PowerConsumptionsAPI", 
     type : "DELETE", 
     data : "powId=" + $(this).data("powid"),
     dataType : "text", 
     complete : function(response, status) 
     { 
       onPowerConsumptionDeleteComplete(response.responseText, status); 
     } 
  }); 
});


function onPowerConsumptionDeleteComplete(response, status) 
{ 
     if (status == "success") 
     { 
        var resultSet = JSON.parse(response); 
 
        if (resultSet.status.trim() == "success") 
       { 
          $("#alertSuccess").text("Successfully deleted."); 
          $("#alertSuccess").show(); 
          $("#divPowerConsumptionsGrid").html(resultSet.data); 
       
       } else if (resultSet.status.trim() == "error") 
       { 
           $("#alertError").text(resultSet.data); 
           $("#alertError").show(); 
           
       } 
       } else if (status == "error") 
       { 
         $("#alertError").text("Error while deleting."); 
         $("#alertError").show(); 
         
       } else
       { 
          $("#alertError").text("Unknown error while deleting.."); 
          $("#alertError").show(); 
      } 
 
          $("#hidPowIDSave").val(""); 
          $("#formPowerConsumption")[0].reset(); 
}

// CLIENT-MODEL================================================================
function validatePowerConsumptionForm() 
{ 

   return true; 
  
}