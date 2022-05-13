
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

  //Year-----------------------------------------------------------------------
  if ($("#year").val().trim() == "") 
  { 
    return "Insert Year."; 
  } 
  
  // is numerical value(Year)--------------------------------------------------
  var year = $("#year").val().trim(); 
  if (!$.isNumeric(year)) 
  { 
     return "Insert a numerical value for Year."; 
  }
  
  // Check Year is greater than 2020-------------------------------------------
  var year1 = $("#year").val().trim();
  if(year1 < 2020){
	  return "Insert Year starts from 2020 (Don't insert Year less than 2020).";
  }
  
  if ($("#year").val().length !== 4) 
  {
		return "Year Must have 4 Digits.";
  }
  
  
  //Total Units-----------------------------------------------------------------
  if ($("#totalUnits").val().trim() == "") 
  { 
    return "Insert Total Power Consumption Units."; 
  } 
  
  // is numerical value(Total Units)---------------------------------------------
  var totalUnits = $("#totalUnits").val().trim(); 
  if (!$.isNumeric(totalUnits)) 
  { 
     return "Insert a numerical value for Total Units."; 
  }
  
  // Check Total Units greater than zero------------------------------------------
  var totalUnits1 = $("#totalUnits").val().trim();
  if(totalUnits1 <= 0){
	 return "Total Units should be greater than zero.";
  }
  
  
  //Power Consumption ID-----------------------------------------------------------
  if ($("#powId").val().trim() == "") 
  { 
    return "Insert Power Consumption ID."; 
  } 
  
  // is numerical value(Power Consumption ID)--------------------------------------
  var powId = $("#powId").val().trim(); 
  if (!$.isNumeric(powId)) 
  { 
     return "Insert a numerical value for Power Consumption ID."; 
  }
  
  // Check Power Consumption ID is greater than zero--------------------------------
  var powId1 = $("#powId").val().trim();
  if(powId1 <= 0){
	 return "Insert a valid and available Power Consumption ID.";
  }
  
  
  //Account Number------------------------------------------------------------------
  if ($("#accountNumber").val().trim() == "") 
  { 
    return "Insert Account Number of the Customer."; 
  }
  
  // is numerical value(Account Number)----------------------------------------------
  var accountNumber = $("#accountNumber").val().trim(); 
  if (!$.isNumeric(accountNumber)) 
  { 
     return "Insert a numerical value for Account Number of the Customer."; 
  }
  
  // Check Account Number is greater than zero---------------------------------------
  var accountNumber1 = $("#accountNumber").val().trim(); 
  if(accountNumber1 <= 0){
	 return "Insert a valid and available Account Number.";
  }
  
  if ($("#accountNumber").val().length !== 8) 
  {
		return "Account Number Must have 8 Digits.";
  }
  
  
  //Due Amount-----------------------------------------------------------------------
  if ($("#dueAmount").val().trim() == "") 
  { 
    return "Insert Due Amount of the Customer."; 
  } 
  
  // is numerical value(Due Amount)--------------------------------------------------
  var dueAmount = $("#dueAmount").val().trim(); 
  if (!$.isNumeric(dueAmount)) 
  { 
     return "Insert a numerical value for Due Amount of the Customer."; 
  }
  
  // Check Due Amount is greater than zero-------------------------------------------
  var dueAmount1 = $("#dueAmount").val().trim(); 
  if(dueAmount1 <= 0.00){
	 return "Insert greater than zero values for Due Amount of the Customer.";
  }
  
  // convert to decimal(Due Amount)--------------------------------------------------
  $("#dueAmount").val(parseFloat(dueAmount1).toFixed(2)); 
  
  
  //Bill Amount----------------------------------------------------------------------
  if ($("#billAmount").val().trim() == "") 
  { 
    return "Insert Bill Amount of the Customer."; 
  } 
  
  // is numerical value(Bill Amount)-------------------------------------------------
  var billAmount = $("#billAmount").val().trim(); 
  if (!$.isNumeric(billAmount)) 
  { 
     return "Insert a numerical value for Bill Amount of the Customer."; 
  }
  
  // Check Bill Amount is greater than zero------------------------------------------
  var billAmount1 = $("#billAmount").val().trim(); 
  if(billAmount1 <= 0.00){
	 return "Insert greater than zero values for Bill Amount of the Customer.";
  }
  
  // convert to decimal(Bill Amount)--------------------------------------------------
  $("#billAmount").val(parseFloat(billAmount1).toFixed(2)); 
   
     return true;
     
}