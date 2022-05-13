package com;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;
import com.PowerConsumption;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


@WebServlet("/PowerConsumptionsAPI")
public class PowerConsumptionsAPI extends HttpServlet {
	
	private static final long serialVersionUID = 1L;
    
	PowerConsumption powObj = new PowerConsumption();
    
    public PowerConsumptionsAPI() {
        super();
  
    }

    
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
    	
		String output = powObj.insertPowerConsumption(request.getParameter("unitDescription"), 
				                                      request.getParameter("unitPrice"));                        
	    
        response.getWriter().write(output);
	}
    
    
    // Convert request parameters to a Map
  	private static Map getParasMap(HttpServletRequest request) 
  	{ 
  	     Map<String, String> map = new HashMap<String, String>(); 
  	     try
  	     { 
  	         Scanner scanner = new Scanner(request.getInputStream(), "UTF-8"); 
  	         String queryString = scanner.hasNext() ?  scanner.useDelimiter("\\A").next() : ""; 
  	         scanner.close(); 
  	        
  	         String[] params = queryString.split("&"); 
  	         for (String param : params) 
  	         { 
  	              String[] p = param.split("="); 
  	              map.put(p[0], p[1]); 
  	         } 
  	     } 
  	     catch (Exception e) 
  	    { 
  	    } 
  	    return map; 
  	}
  	
  	
  	protected void doPut(HttpServletRequest request, HttpServletResponse response)  throws ServletException, IOException 
	{ 
			 Map paras = getParasMap(request); 
			 
			 String output = powObj.updatePowerConsumption(paras.get("hidPowIDSave").toString(), 
			                 //paras.get("powId").toString(), 
			                 paras.get("unitDescription").toString(), 
			                 paras.get("unitPrice").toString());
			 
			 response.getWriter().write(output); 
	} 
  	
  	
  	
  	protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException 
	{ 
			 Map paras = getParasMap(request); 
			 
			 
			 String output = powObj.deletePowerConsumption(paras.get("powId").toString()); 
			
			 response.getWriter().write(output); 
	}
  	

}
