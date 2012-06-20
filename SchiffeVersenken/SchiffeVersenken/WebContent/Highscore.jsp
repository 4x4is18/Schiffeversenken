<%@page import="ship.servlet.Highscore"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Highscores</title>
<link rel="stylesheet" type="text/css" href="style.css">
        <style type ="text/css"></style>
</head>
 <body>
 <%@ page import = "java.sql.*" isThreadSafe="false" %>
       
	 <%
	  String sDbDrv = "com.mysql.jdbc.Driver";
	  String sDbUrl = "jdbc:mysql://134.106.56.164:1234/Schiffeversenken";
	  String sUsr   = "root";
	  String sPwd   = "sittingby5";
	  String sTable = "highscore";
	  String sSql   = "";
	  if( request.getParameterNames().hasMoreElements() == true )
	  {
	    sDbDrv = request.getParameter( "prmDbDrv" );
	    sDbUrl = request.getParameter( "prmDbUrl" );
	    sUsr   = request.getParameter( "prmUsr" );
	    sPwd   = request.getParameter( "prmPwd" );
	    sTable = request.getParameter( "prmTab" );
	    sSql   = request.getParameter( "prmSql" );
	    if( null != sTable && 0 <  sTable.length() &&
	       (null == sSql   || 0 == sSql.length())  )
	      sSql = "SELECT * FROM " + sTable;
	  }
	%>
	
      
       
        <div id="Seite">
            <h1></h1>

             <ul id="Navigation">
                <li><a href="index.html">Startseite</a></li>
                <li><a href="news.html">News</a></li>
                <li><a href="spieleanleitung.html">Spielanleitung</a></li>
                <li><a href="team.html">Das Team</a></li>
                <li><a href="highscore.html">Highscore</a></li>
            </ul>

            <div id="Inhalt">
                <h2>Highscores</h2>

                <table>
                
                	<%
  if( request.getParameterNames().hasMoreElements() == true
      && null != sDbDrv && 0 < sDbDrv.length()
      && null != sDbUrl && 0 < sDbUrl.length()
      && null != sSql   && 0 < sSql.length() )
  {
    Connection cn = null;
    Statement  st = null;
    ResultSet  rs = null;
    try {
      Class.forName( sDbDrv );
      cn = DriverManager.getConnection( sDbUrl, sUsr, sPwd );
      st = cn.createStatement();
      rs = st.executeQuery( sSql );
      ResultSetMetaData rsmd = rs.getMetaData();
      int n = rsmd.getColumnCount();
      out.println( "<table border=1 cellspacing=0><tr>" );
      for( int i=1; i<=n; i++ )    // Achtung: erste Spalte mit 1 statt 0
        out.println( "<th>" + rsmd.getCatalogName( i ) + "</th>" );
      while( rs.next() )
      {
        out.println( "</tr><tr>" );
        for( int i=1; i<=n; i++ )  // Achtung: erste Spalte mit 1 statt 0
          out.println( "<td>" + rs.getString( i ) + "</td>" );
      }
      out.println( "</tr></table>" );
    } finally {
      try { if( null != rs ) rs.close(); } catch( Exception ex ) {/*ok*/}
      try { if( null != st ) st.close(); } catch( Exception ex ) {/*ok*/}
      try { if( null != cn ) cn.close(); } catch( Exception ex ) {/*ok*/}
    }
  }
%>
                
             
              
                </table>
               
            </div>

            <p id="Fusszeile">Copyright by Team Easyyyyy  :)</p>
        </div>
    </body>
</html>
 




   
