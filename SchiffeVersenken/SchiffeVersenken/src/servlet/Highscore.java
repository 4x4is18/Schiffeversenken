package servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;

import javax.servlet.ServletException;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class Highscore
 */
//@WebServlet("/Highscore")
public class Highscore extends HttpServlet {
	
	private static final long serialVersionUID = 1L;
    private DBConnection dbconnection;
	
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Highscore() {
    	
    	super();
    	this.dbconnection = new DBConnection();
        
       
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		response.setContentType("text/html");
		PrintWriter out = response.getWriter();

		
		try {
			dbconnection.query("SELECT * FROM Schiffeversenken.highscore order by Schiffeversenken.highscore.hits asc");
			out.println("<html>");
			out.println("<body bgcolor=\"#fed\">");
			
			out.println("<datagrid>");
			out.println("<table align=\"center\">");
			out.println("<tr> <td colspan=3> <h1> Highscores </h1> </td> </tr>");
			out.println("<tr> <td width=\"90px\"> <b> Gewinner: </b> </td>  <td width=\"30px\"> &nbsp </td> <td width=\"90px\"> <b> Verlierer: </b> </td> <td width=\"30px\"> &nbsp  </td> <td colspan=3> <b> Anzahl Spielz�ge: </b> </td> <td width=\"150px\"> &nbsp </td> </tr>");
			out.println("<tr> <td colspan=3> &nbsp </td> </tr>");
			
			while(dbconnection.getResultSet().next()) {
				 
				out.println(" <tr> <td> " + dbconnection.getResultSet().getString(1) + " </td> <td> hat </td> <td> " + dbconnection.getResultSet().getString(2) + " </td> <td> mit </td> <td> " + dbconnection.getResultSet().getInt(3) + " </td> <td width=\"250px\"> Spielzz�gen fertig gemacht </td> </tr> ");
				
			}
			out.println("</table>");
			out.println("</datagrid>");
			out.println("</body>");
			out.println("</head>");
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		
		
	}

}
