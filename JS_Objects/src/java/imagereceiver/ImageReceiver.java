/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package imagereceiver;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;

import java.io.InputStreamReader;
import java.util.logging.Logger;
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;

@WebServlet(urlPatterns = "/ImageReceiver")
@MultipartConfig
public class ImageReceiver extends HttpServlet {

    private static final Logger logger = Logger.getLogger(
            ImageReceiver.class.getName());

    public ImageReceiver() {
        super();
    }

    protected void doGet(HttpServletRequest request,
            HttpServletResponse response) throws ServletException, IOException {
        for (Part part : request.getParts()) {
            String filename = getFilename(part);
            if (filename == null) {
// Process regular form field (input type="text|radio|checkbox|etc", select,).
                String fieldname = part.getName();
                String fieldvalue = getValue(part);
                logger.info("Normal field processed - Name: " + fieldname
                        + ", Value: " + fieldvalue);
            } else if (!filename.isEmpty()) {
                // Process form file field (input type="file").
                String fieldname = part.getName();
                filename = filename.substring(filename.lastIndexOf('/') + 1)
                        .substring(filename.lastIndexOf('\\') + 1); // MSIE fix.
                //InputStream filecontent = part.getInputStream();
                logger.info("File processed - File Name: " +filename 
                        + ", Length : " + part.getSize());
                part.write(filename);
            }
        }
    }

    private static String getFilename(Part part) {
        for (String cd : part.getHeader("content-disposition").split(";")) {
            if (cd.trim().startsWith("filename")) {
              return cd.substring(cd.indexOf('=') + 1).trim().replace("\"", "");
            }
        }
        return null;
    }

    private static String getValue(Part part) throws IOException {
        InputStream is = part.getInputStream();
        BufferedReader reader = new BufferedReader(
                new InputStreamReader(is, "UTF-8"));
        int len = is.available();
        StringBuilder value = new StringBuilder();
        char[] buffer = new char[len];
        for (int length = 0; (length = reader.read(buffer)) > 0;) {
            value.append(buffer, 0, length);
        }
        return value.toString();
    }

    protected void doPost(HttpServletRequest request,
            HttpServletResponse response) throws ServletException, IOException {
        doGet(request, response);
    }
}