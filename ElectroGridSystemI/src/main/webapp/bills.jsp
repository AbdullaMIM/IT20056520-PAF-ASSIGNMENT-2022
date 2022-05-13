<%@ page import="com.Bill"%>

<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
pageEncoding="ISO-8859-1"%>


<!DOCTYPE html>
<html>

<head>
<meta charset="ISO-8859-1">
<title>Bill Management</title>

<link rel="stylesheet" href="Views/bootstrap.css">
<script src="Components/jquery-3.6.0.min.js"></script>
<script src="Components/bills.js"></script>

</head>

<body>

       <nav class="navbar navbar-light" style="background-color: #e3f2fd;">
		<span class="navbar-brand mb-0 h1"> ELECTRO GRID - POWER GRID MANAGEMENT SYSTEM</span>
		<span class="navbar-text"><a href="#">HOME</a>          &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
		<a href="powerConsumptions.jsp">POWER CONSUMPTION</a>   &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
		<a href="bills.jsp">BILL</a> </span>
	   </nav>
       <br>
    
       <div class="container"><div class="row"><div class="col-9">

				<h3 class="m-3" style="text-align: center">Bill Management</h3>

				<form id="formBill" name="formBill">
					
				Year :
				<input id="year" name="year" type="text" class="form-control form-control-sm" placeholder="Enter Year (Year Of The Bill)">
				<br> 
				
				Month :
				<!-- <input id="month" name="month" type="text" class="form-control form-control-sm">   -->
				<select id="month" name="month" class="form-control form-control-sm">
                                                            <option>Select Month (Month Of The Bill)</option>
                                                            <option>January</option>
                                                            <option>February</option>
                                                            <option>March</option>
                                                            <option>April</option>
                                                            <option>May</option>
                                                            <option>June</option>
                                                            <option>July</option>
                                                            <option>August</option>
                                                            <option>September</option>
                                                            <option>October</option>
                                                            <option>November</option>
                                                            <option>December</option>
                 </select>
				<br> 
				
				Total Units :
				<input id="totalUnits" name="totalUnits" type="text" class="form-control form-control-sm" placeholder="Enter Total Units Consumed By The Customer For Month">
				<br> 
				
				Power Consumption ID :
			    <input id="powId" name="powId" type="text" class="form-control form-control-sm" placeholder="Enter Relevant Power Consumption ID">
				<br>
				
				Customer Account Number :
			    <input id="accountNumber" name="accountNumber" type="text" class="form-control form-control-sm" placeholder="Enter Account Number Of The Customer">
				<br>
				
				Due Amount :
			    <input id="dueAmount" name="dueAmount" type="text" class="form-control form-control-sm" placeholder="Enter Due Amount Of The Customer">
				<br>
				
				Bill Amount :
			    <input id="billAmount" name="billAmount" type="text" class="form-control form-control-sm" placeholder="Enter Bill Amount Of The Customer">
				<br>
				
				
				<input id="btnSave" name="btnSave" type="button" style="margin-left:300px; width:17%; font-size:20px" value="Save" class="btn btn-primary">
				
				<input type="hidden" id="hidBillIDSave" name="hidBillIDSave" value="">
				
				</form>
				<br>


                 <div id="alertSuccess" class="alert alert-success"></div>
                 <div id="alertError" class="alert alert-danger"></div>
                 
                 <br>
                 <div id="divBillsGrid" >
                 
                     <%
                          Bill billObj = new Bill(); 
                          out.print(billObj.readBills()); 
                     %>
                </div>
                
             </div>
         </div>
       </div>

</body>
</html>