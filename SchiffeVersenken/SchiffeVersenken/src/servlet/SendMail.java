package servlet;


import java.util.Properties;

import javax.mail.Address;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;


public class SendMail {
	


	/**
	 * Versenden einer eMail, mit einer �bergebenen Mailadresse, einem Text und
	 * einem Betreff *
	 * 
	 * @param mailAdress
	 *            eMail Adresse des Empf�ngers
	 * @param text
	 *            Der Inhalt der eMail
	 * @param betreff
	 *            Der Betreff der eMail
	 * @throws MessagingException
	 */
	public void sendMail(String mailAdress, String text, String betreff)
			throws MessagingException {

		Transport transport;
		Properties props;
		Session session;
		Address[] addresses;
		Message message;
		String host = "";
		int port = 0;
		String user = "";
		String password = "";	

		// Daten des Servers aus INI-Datei auslesen
		// PropertieDatei �ffnen

	
			// DB Konfiguration aus der Datei laden
			host = "mail.oelti.de";
			port = 465;
			user = "sp12gg@oelti.de";
			password = "Ato6Nos1";
			

		// Daten f�r Mail Authentifizierung werden gesetzt
		props = new Properties();
		props.put("mail.smtp.auth", "true");
		props.put("mail.smtp.socketFactory.port", String.valueOf(port));
		props.put("mail.smtp.socketFactory.class", "javax.net.ssl.SSLSocketFactory");
		session = Session.getDefaultInstance(props);

		// Ausw�hlen des SMTP Protokolls
		transport = session.getTransport("smtp");

		// Verbindung zum Server herstellen
		transport.connect(host, port, user, password);
		message = new MimeMessage(session);

		// Empf�ngerdaten eintragen
		addresses = InternetAddress.parse(mailAdress);
		message.setFrom(new InternetAddress(user));
		message.setRecipients(Message.RecipientType.TO, addresses);

		// Betreff eintragen
		message.setSubject(betreff);

		// Inhalt der Mail eintragen
		message.setText(text);

		// Mail absenden
		transport.sendMessage(message, addresses);

		// Verbindung zum Server schlie�en
		transport.close();

	}
}
