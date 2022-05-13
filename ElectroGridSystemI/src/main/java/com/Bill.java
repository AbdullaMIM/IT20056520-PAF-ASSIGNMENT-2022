package com;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;


public class Bill {

	    //1. Create a Connection method 
		public Connection connect() 
		{ 
		     Connection con = null; 
		 
		     try { 
		             Class.forName("com.mysql.jdbc.Driver"); 
		             con= DriverManager.getConnection("jdbc:mysql://127.0.0.1:3306/powergridsystemi","root", ""); 
		               
		             //For testing
		             System.out.print("Successfully connected"); 
		            	   
		     } 
		     catch(Exception e) { 
		             e.printStackTrace(); 
		     } 
		 
		     return con; 
		}

		
		//2. Create the method for reading bills
		public String readBills()
		{ 
		    String output = ""; 
		   
		    try { 
		          Connection con = connect(); 
		          
		          if (con == null)  { 
		             return "Error while connecting to the database for reading."; 
		          } 
		 
		          // Prepare the html table to be displayed
		          output = "<table border='2px solid black'><tr><th>Bill ID</th><th>Year</th>" 
		                   +"<th>Month</th><th>Total Units</th>"
		                   + "<th>Power Consumption ID</th><th>Customer Account Number</th>" 
		                   + "<th>Due Amount</th><th>Bill Amount</th>" 
		                   + "<th>Update</th><th>Remove</th></tr>";               
		          
		          String query = "select * from monthly_bill"; 
		          Statement stmt = con.createStatement(); 
		          ResultSet rs = stmt.executeQuery(query); 
		
		          // iterate through the rows in the result set
		          while (rs.next()) { 
		        	  
		             String billId = Integer.toString(rs.getInt("billId")); 
		             String year = Integer.toString(rs.getInt("year")); 
		             String month = rs.getString("month"); 
		             String totalUnits = Integer.toString(rs.getInt("totalUnits")); 
		             String powId = Integer.toString(rs.getInt("powId")); 
		             String accountNumber = Integer.toString(rs.getInt("accountNumber"));
		             String dueAmount = Double.toString(rs.getDouble("dueAmount")); 
		             String billAmount = Double.toString(rs.getDouble("billAmount"));
		 
		             // Add a row into the html table
		             output += "<tr><td>" + billId + "</td>";
		             output += "<td>" + year + "</td>";
		             output += "<td>" + month + "</td>"; 
		             output += "<td>" + totalUnits + "</td>";
		             output += "<td>" + powId + "</td>"; 
		             output += "<td>" + accountNumber + "</td>";
		             output += "<td>" + dueAmount + "</td>"; 
		             output += "<td>" + billAmount + "</td>";  
		             
		             // buttons - wrapped the update &remove button inside a form. 
		             output += "<td><input name='btnUpdate' type='button' value='Update' "
		            		 + "class='btnUpdate btn btn-secondary' data-billid='" + billId + "'></td>"
		            		 + "<td><input name='btnRemove' type='button' value='Remove' "
		            		 + "class='btnRemove btn btn-danger' data-billid='" + billId + "'></td></tr>"; 
		         } 
		 
		          con.close(); 
		         
		          // Complete the html table
		          output += "</table>"; 
		 
		    } 
		    catch (Exception e)  { 
		             output = "Error while reading the bills."; 
		             System.err.println(e.getMessage()); 
		    } 
		       
		          return output; 
		}
		
		
		
		//3. Create the method for inserting bills
		public String insertBill(String year, String month, String totalUnits, String powId, String accountNumber, String dueAmount, String billAmount) 
	    { 
				 String output = ""; 
				 
				 try
				 { 
				    Connection con = connect(); 
				    
				    if (con == null) 
				    { 
				       return "Error while connecting to the database for inserting."; 
				    } 
				 
				    // create a prepared statement
				    String query = " insert into monthly_bill(billId,year,month,totalUnits,powId,accountNumber,dueAmount,billAmount)" + " values (?,?,?,?,?,?,?,?)"; 
				    
				    PreparedStatement preparedStmt = con.prepareStatement(query); 
				 
				    // binding values
				    preparedStmt.setInt(1, 0); 
				    preparedStmt.setInt(2, Integer.parseInt(year)); 
				    preparedStmt.setString(3, month);
				    preparedStmt.setInt(4, Integer.parseInt(totalUnits));
				    preparedStmt.setInt(5, Integer.parseInt(powId));
				    preparedStmt.setInt(6, Integer.parseInt(accountNumber)); 
				    preparedStmt.setDouble(7, Double.parseDouble(dueAmount)); 
				    preparedStmt.setDouble(8, Double.parseDouble(billAmount)); 
				 
				    // execute the statement
				    preparedStmt.execute(); 
				    con.close(); 
				 
				   String newBills = readBills(); 
				   output = "{\"status\":\"success\", \"data\": \"" +  newBills + "\"}"; 
				
				 } 
				 
				 catch (Exception e) 
				 { 
				    output = "{\"status\":\"error\", \"data\": \"Error while generating the bill.\"}"; 
				 
				    System.err.println(e.getMessage()); 
				 } 
				 
				      return output; 
		} 
		
		
		//Create the method for updating bills
		public String updateBill(String ID, String year, String month, String totalUnits, String powId, String accountNumber, String dueAmount, String billAmount)
		{ 
				 String output = ""; 
				 
				 try
				 { 
				      Connection con = connect(); 
				 
				      if (con == null) 
				      { 
				        return "Error while connecting to the database for updating."; 
				      } 
				 
				      // create a prepared statement
				      String query = "UPDATE monthly_bill SET year=?,month=?,totalUnits=?,powId=?,accountNumber=?,dueAmount=?,billAmount=? WHERE billId=?"; 
				     
				      PreparedStatement preparedStmt = con.prepareStatement(query); 
				 
				      // binding values 
					    preparedStmt.setInt(1, Integer.parseInt(year)); 
					    preparedStmt.setString(2, month);
					    preparedStmt.setInt(3, Integer.parseInt(totalUnits));
					    preparedStmt.setInt(4, Integer.parseInt(powId));
					    preparedStmt.setInt(5, Integer.parseInt(accountNumber)); 
					    preparedStmt.setDouble(6, Double.parseDouble(dueAmount)); 
					    preparedStmt.setDouble(7, Double.parseDouble(billAmount)); 
					    preparedStmt.setInt(8, Integer.parseInt(ID)); 
				 
				      // execute the statement
				      preparedStmt.execute(); 
				      con.close(); 
				      String newBills = readBills(); 
				      output = "{\"status\":\"success\", \"data\": \"" + newBills + "\"}"; 
				 } 
				 catch (Exception e) 
				 { 
				     output = "{\"status\":\"error\", \"data\": \"Error while updating the bills.\"}"; 
				     System.err.println(e.getMessage()); 
				 } 
				 
				 return output; 
		   } 
		
		
		   
		public String deleteBill(String billId) 
		{ 
		    String output = ""; 
		 
		    try
		    { 
		       Connection con = connect(); 
		     
		       if (con == null) 
		      { 
		        return "Error while connecting to the database for deleting."; 
		      } 
		 
		       // create a prepared statement
		       String query = "delete from monthly_bill where billId=?"; 
		
		       PreparedStatement preparedStmt = con.prepareStatement(query); 
		 
		       // binding values
		       preparedStmt.setInt(1, Integer.parseInt(billId)); 
		
		       // execute the statement
		       preparedStmt.execute(); 
	           con.close(); 
		
	           String newBills = readBills(); 
		       output = "{\"status\":\"success\", \"data\": \"" +  newBills + "\"}"; 
		   } 
		   catch (Exception e) 
		   { 
		     output = "{\"status\":\"error\", \"data\": \"Error while deleting the bill.\"}"; 
		     System.err.println(e.getMessage()); 
		   } 
		  
		       return output; 
		 }  

}
