package ship.servlet;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.sql.SQLException;

/**
 * Servlet implementation class Highscore
 */
//@WebServlet("/Highscore")
public class Highscore extends HttpServlet {
	
	DBConnection dbconnection;
	private static final long serialVersionUID = 1L;
       
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
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
	}

	
	public void getHighscores() {
			
			try {
				dbconnection.query("SECLECT * FROM Schiffeversenken.highscore");
				
				System.out.println("<tr> <td>Name: </td> <td> Datum: </td> <td> Highscore: </td> </tr>");
				
				while (dbconnection.getResultSet().next()) {
					
/*					out.println(" <tr> <td> " + dbconnection.getResultSet().getString(1) + " </td> "); //der Spielername
					out.println(     " <td> " + dbconnection.getResultSet().getString(2) + " </td> "); //das Datum
					out.println(     " <td> " + dbconnection.getResultSet().getInt(3) + " </td> </tr> ");// die Anzahl der Züge
*/				 
				}
					
				
			} catch (SQLException e) {
				// TODO Automatisch erstellter Catch-Block
				System.out.println("SQL Fehler");
			}
		
	}
	
}
			
	
			
	