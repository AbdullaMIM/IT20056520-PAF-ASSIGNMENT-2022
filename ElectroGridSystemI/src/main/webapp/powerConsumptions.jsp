<%@ page import="com.PowerConsumption"%>

<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
pageEncoding="ISO-8859-1"%>


<!DOCTYPE html>
<html>

<head>
<meta charset="ISO-8859-1">
<title>Power Consumption Management</title>

<link rel="stylesheet" href="Views/bootstrap.css">
<script src="Components/jquery-3.6.0.min.js"></script>
<script src="Components/powerConsumptions.js"></script>

</head>


<body>
    
     <nav class="navbar navbar-light" style="background-color: #e3f2fd;">
		<span class="navbar-brand mb-0 h1"> ELECTRO GRID - POWER GRID MANAGEMENT SYSTEM</span>
		<span class="navbar-text"><a href="#">HOME</a>          &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
		<a href="powerConsumptions.jsp">POWER CONSUMPTION</a>   &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
		<a href="bills.jsp">BILL</a> </span>
	</nav>
    <br>
    
    
      <div class="container">
         <div class="row">
            <div class="col-8">

				<h3 class="m-3" style="text-align: center">Power Consumption Management</h3>

				<form id="formPowerConsumption" name="formPowerConsumption">
					
				    <!-- Power Consumption ID:
					<input id="powId" name="powId" type="text" placeholder="Auto-generated Unique ID" class="form-control form-control-sm" readonly>
					<br> -->
					
					Description of Units :
					<input id="unitDescription" name="unitDescription" type="text" class="form-control form-control-sm" placeholder="Enter Description of Units">
					<br> 
					
					Charge Per Unit :
					<input id="unitPrice" name="unitPrice" type="text" class="form-control form-control-sm" placeholder ="Enter Charge Per Unit (Unit Price)">
					<br>
					
					<input id="btnSave" name="btnSave" type="button" style="margin-left:300px; width:17%; font-size:20px" value="Save" class="btn btn-primary">		
					<input type="hidden" id="hidPowIDSave" name="hidPowIDSave" value="">
					
				</form>

                 <br>
                 <div id="alertSuccess" class="alert alert-success"></div>
                 <div id="alertError" class="alert alert-danger"></div>
                 
                 <br>
                 <div id="divPowerConsumptionsGrid">
                 
                     <%
                          PowerConsumption powObj = new PowerConsumption(); 
                          out.print(powObj.readPowerConsumptions()); 
                     %>
                </div>
                
             </div>
         </div>
       </div>

</body>
</html>