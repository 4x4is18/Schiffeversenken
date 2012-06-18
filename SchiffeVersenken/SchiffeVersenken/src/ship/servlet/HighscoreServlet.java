package ship.servlet;

import java.io.IOException;
import java.sql.SQLException;

import javax.servlet.ServletException;
//import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class HighscoreServlet
 */
//@WebServlet("/HighscoreServlet")
public class HighscoreServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
	private static DBConnection dbconnection = new DBConnection();
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public HighscoreServlet() {
        super();
        // TODO Auto-generated constructor stub
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
			dbconnection.query("SELECT  FROM lowscores");
			
			while(dbconnection.getResultSet().next()) {
				
				System.out.print( dbconnection.getResultSet().getString(1) + dbconnection.getResultSet().getString(2));
				
			}
			
		} catch (SQLException e) {
			// TODO Automatisch erstellter Catch-Block
			System.out.print("SQL- Fehler");
		
		}
		
	}

}
