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
		
		this.dbconnection = new DBConnection();
		response.setContentType("text/html");
		PrintWriter out = response.getWriter();

		
		try {
			dbconnection.query("SELECT * FROM Schiffeversenken.highscore order by Schiffeversenken.highscore.hits asc");
			out.println("<html>");
			out.println("<body background=\"images/background-nav-acticle.jpg\">");
			
			out.println("<datagrid>");
			out.println("<table align=\"center\">");
			out.println("<tr> <td colspan=3> <h1> Highscores </h1> </td> </tr>");
			out.println("<tr> <td width=\"150px\"> <b> Gewinner: </b> </td>  <td width=\"50px\"> &nbsp </td> <td width=\"150px\"> <b> Verlierer: </b> </td> <td width=\"50px\"> &nbsp  </td> <td colspan=3> <b> Anzahl Spielz\u00fcge: </b> </td> <td width=\"150px\"> &nbsp </td> </tr>");
			out.println("<tr> <td colspan=3> &nbsp </td> </tr>");
			
			while(dbconnection.getResultSet().next()) {
				 
				out.println(" <tr> <td> " + dbconnection.getResultSet().getString(1) + " </td> <td> hat </td> <td> " + dbconnection.getResultSet().getString(2) + " </td> <td> mit </td> <td> " + dbconnection.getResultSet().getInt(3) + " </td> <td width=\"250px\"> Spielzz\u00fcgen fertig gemacht </td> </tr> ");
				
			}
			out.println("</table>");
			out.println("</datagrid>");
			out.println("</body>");
			out.println("</head>");
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		
		} finally {
			
			try {
				
				this.dbconnection.close();
				
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		
		
		
	}

}
