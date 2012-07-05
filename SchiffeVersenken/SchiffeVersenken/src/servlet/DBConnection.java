//TODO: Javadoc schreiben 
/**
 * 
 */
package servlet;

import java.sql.*;

/**
 * Stellt eine Verbindung zur MySQL-Datenbank her
 */
public class DBConnection {
	private Connection con;
	private ResultSet rs;
	final private String database = "Schiffeversenken";
	final private String standardUser = "root";
	final private String standardPW = "sittingby5";

	/**
	 * Datenbankverbindung mit unseren Zugangsdaten
	 */
	public DBConnection() {
		String domain = "jdbc:mysql://134.106.56.164:1234/"
				+ this.database;
		connect(domain, standardUser, standardPW);
	}
	
	/**
	 * Datenbankverbindung ohne Zugangsdaten
	 * @param host URL der Datenbank
	 * @param port Port der Datenbank
	 * @param database Name der Datenbank
	 * @param user Benutzername f�r den Zugriff auf die Datenbank
	 * @param PW Passwort des Benutzers
	 */
	public DBConnection(String host, int port, String database, String user,
			String PW) {
		String domain = "jdbc:mysql://" + host + ":" + port + "/" + database;
		connect(domain, user, PW);
	}

	/**
	 * Verbindung zu unserer Datenbank, Benutzername und Passwort m�ssen noch eingegeben werden
	 * @param user Benutzername
	 * @param PW Passwort
	 */
	public DBConnection(String user, String PW) {
		String domain = "jdbc:mysql://134.106.56.164:1234/"
				+ this.database;
		connect(domain, user, PW);
	}

	/**
	 * Verbindung zur Datenbank und laden des Datenbankteibers
	 * @param domain URL der Datenbank
	 * @param user Benutzername
	 * @param PW Passwort
	 */
	private void connect(String domain, String user, String PW) {
		try {
			Class.forName("com.mysql.jdbc.Driver").newInstance();
			con = DriverManager.getConnection(domain, user, PW);
		}
		catch(Exception e) {
			System.err.print("MySQL-Datenbankfehler: " + e);
		}		
	}
	
	/**
	 * SQL-Anfrage an die Datenbank
	 * @param SQLQuery SQL-Anfrage
	 * @return Gibt die Anzahl der gefundenen Tupel zur�ck
	 * @throws SQLException
	 */
	public int query(String SQLQuery) throws SQLException {

		rs = null;
		int anz = 0;
		Statement st = con.createStatement();
		if (SQLQuery.equals(""))
			throw new SQLException("Leere SQLQuery wird nicht akzeptiert.");
		else if (SQLQuery.toLowerCase().startsWith("select")) {
			rs = st.executeQuery(SQLQuery);
			rs.afterLast();
			anz = rs.getRow();
			rs.beforeFirst();
		}

		else {
			anz = st.executeUpdate(SQLQuery);
		}

		return anz;
	}

	/**
	 * Gibt das ResultSet zur�ck
	 * @return Tabelle der gefundenen Tupel
	 */
	public ResultSet getResultSet() {
		return rs;
	}

	/**
	 * Schlie�t die Verbindung zur Datenbank
	 * @throws SQLException
	 */
	public void close() throws SQLException {
		rs.close();
		con.close();
	}

}
