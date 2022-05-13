
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
    var status = validateBillForm(); 
    if (status != true) 
    { 
        $("#alertError").text(status); 
        $("#alertError").show(); 
        return; 
    } 

    // If valid------------------------
     var type = ($("#hidBillIDSave").val() == "") ? "POST" : "PUT"; 
     
     $.ajax( 
     { 
          url : "BillsAPI", 
          type : type, 
          data : $("#formBill").serialize(), 
          dataType : "text", 
          complete : function(response, status) 
          { 
               onBillSaveComplete(response.responseText, status); 
          } 
     });
}); 


function onBillSaveComplete(response, status) 
{ 
     if (status == "success") 
     { 
        var resultSet = JSON.parse(response); 
 
        if (resultSet.status.trim() == "success") 
       { 
          $("#alertSuccess").text("Successfully saved."); 
          $("#alertSuccess").show(); 
          $("#divBillsGrid").html(resultSet.data); 
       
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
 
          $("#hidBillIDSave").val(""); 
          $("#formBill")[0].reset(); 
}


// UPDATE==========================================
$(document).on("click", ".btnUpdate", function(event) 
{ 
   $("#hidBillIDSave").val($(this).data("billid"));
   $("#year").val($(this).closest("tr").find('td:eq(1)').text()); 
   $("#month").val($(this).closest("tr").find('td:eq(2)').text()); 
   $("#totalUnits").val($(this).closest("tr").find('td:eq(3)').text()); 
   $("#powId").val($(this).closest("tr").find('td:eq(4)').text());
   $("#accountNumber").val($(this).closest("tr").find('td:eq(5)').text());
   $("#dueAmount").val($(this).closest("tr").find('td:eq(6)').text()); 
   $("#billAmount").val($(this).closest("tr").find('td:eq(7)').text()); 
}); 



// DELETE==========================================
$(document).on("click", ".btnRemove", function(event) 
{ 
   $.ajax( 
   { 
     url : "BillsAPI", 
     type : "DELETE", 
     data : "billId=" + $(this).data("billid"),
     dataType : "text", 
     complete : function(response, status) 
     { 
       onBillDeleteComplete(response.responseText, status); 
     } 
  }); 
});


function onBillDeleteComplete(response, status) 
{ 
     if (status == "success") 
     { 
        var resultSet = JSON.parse(response); 
 
        if (resultSet.status.trim() == "success") 
       { 
          $("#alertSuccess").text("Successfully deleted."); 
          $("#alertSuccess").show(); 
          $("#divBillsGrid").html(resultSet.data); 
       
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
 
          $("#hidBillIDSave").val(""); 
          $("#formBill")[0].reset(); 
}

// CLIENT-MODEL================================================================
function validateBillForm() {

     return true;
     
}