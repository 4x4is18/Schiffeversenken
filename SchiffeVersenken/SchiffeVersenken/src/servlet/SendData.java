package servlet;

import java.io.IOException;
import java.io.PrintWriter;

import javax.mail.MessagingException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class SendData
 */
//@WebServlet("/SendData")
public class SendData extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
	SendMail mail;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public SendData() {
        super();
        mail = new SendMail();
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		

		
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		String vorname = request.getParameter("vorname");
		String nachname = request.getParameter("nachname");
		String email = request.getParameter("email");
		String bemerkung = request.getParameter("bemerkungen");
		
		response.setContentType("text/html");
		PrintWriter out = response.getWriter();
		
		try {
			mail.sendMail("daniel.stratmann@uni-oldenburg.de", vorname + " " + nachname +
					" " + email + " hat geschrieben: " + bemerkung, "SchiffeVersenken");
			
			out.println("<html>");
			out.println("<body bgcolor=\"#fed\">");

			out.println("<table align=\"center\">");
			out.println("<tr> <td colspan=3> <h1> Kontakt </h1> </td> </tr>");
			out.println("<tr> <td colspan=3> folgende Daten wurden an uns übersendet: </td> </tr>");
			
			out.println("<tr> <td width=\"50px\"> <b> Vorname: </b> </td> <td width=\"200px\"> " + vorname + " </td> </tr> ");
			out.println("<tr> <td width=\"50px\"> <b> Nachname: </b> </td> <td width=\"200px\"> " + nachname + " </td> </tr> ");
			out.println("<tr> <td width=\"50px\"> <b> Email: </b> </td> <td width=\"200px\"> " + email + " </td> </tr> ");
			out.println("<tr> <td width=\"50px\"> <b> Text: </b> </td> <td width=\"200px\"> " + bemerkung + " </td> </tr> ");
			out.println("<tr> <td colspan=3> <b> Vielen Dank für ihr Feedback! </b> </td> </tr> ");
			out.println("</table>");
			out.println("</body>");
			out.println("</head>");
			
			
		} catch (MessagingException e) {
			// TODO Auto-generated catch block
			out.println("<html>");
			out.println("<body bgcolor=\"#fed\">");

			out.println("<table align=\"center\">");
			out.println("<tr> <td colspan=3> <h1> Es wurden keine Daten versendet </h1> </td> </tr>");
			out.println("</table>");
			out.println("</body>");
			out.println("</head>");
		}
		
		

		
		
	}

}
