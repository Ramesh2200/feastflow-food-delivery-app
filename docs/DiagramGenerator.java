import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.File;
import javax.imageio.ImageIO;

public class DiagramGenerator {

    public static void main(String[] args) throws Exception {
        int width = 1200;
        int height = 1600;
        BufferedImage img = new BufferedImage(width, height, BufferedImage.TYPE_INT_ARGB);
        Graphics2D g = img.createGraphics();

        // High quality rendering hints
        g.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);
        g.setRenderingHint(RenderingHints.KEY_TEXT_ANTIALIASING, RenderingHints.VALUE_TEXT_ANTIALIAS_ON);

        // Dark Background
        g.setColor(new Color(15, 23, 42));
        g.fillRect(0, 0, width, height);

        // Title
        g.setColor(new Color(255, 94, 54));
        g.setFont(new Font("SansSerif", Font.BOLD, 28));
        g.drawString("FeastFlow - Master End-to-End System Architecture", 50, 60);

        g.setColor(new Color(148, 163, 184));
        g.setFont(new Font("SansSerif", Font.PLAIN, 16));
        g.drawString("Step-by-step request execution lifecycle across layers", 50, 95);

        // Draw Diagram Blocks
        int x = 100;
        int boxW = 1000;
        int boxH = 110;
        int y = 140;

        String[][] steps = {
            {"1. React Frontend SPA", "User triggers action in React UI (e.g. Login, Place Order, Update Status)", "#3b82f6"},
            {"2. Fetch HTTP Client", "Browser sends HTTP REST Request (GET / POST / PUT) to http://localhost:8080/api/*", "#06b6d4"},
            {"3. Embedded Tomcat 10 Server", "Tomcat listens on port 8080 & BaseServlet injects CORS Headers", "#6366f1"},
            {"4. Java Servlets (Controllers)", "AuthServlet / RestaurantServlet / MenuServlet / OrderServlet parse JSON body", "#8b5cf6"},
            {"5. Data Access Layer (DAOs)", "UserDAO / RestaurantDAO / MenuDAO / OrderDAO execute business & SQL logic", "#ec4899"},
            {"6. JDBC Connection Provider", "DBConnection opens java.sql.Connection (root:081506 @ localhost:3306)", "#f43f5e"},
            {"7. MySQL Engine (food_delivery_db)", "Executes PreparedStatement DML / DDL queries & manages ACID transactions", "#10b981"},
            {"8. JSON Response Serialization", "Jackson ObjectMapper serializes POJO Model to JSON & streams HTTP 200/201", "#f59e0b"},
            {"9. React Virtual DOM Re-render", "React state updates, Virtual DOM diffing applies live UI changes", "#ff5e36"}
        };

        for (int i = 0; i < steps.length; i++) {
            Color accent = Color.decode(steps[i][2]);

            // Card background
            g.setColor(new Color(30, 41, 59));
            g.fillRoundRect(x, y, boxW, boxH, 20, 20);

            // Card border
            g.setColor(accent);
            g.setStroke(new BasicStroke(2));
            g.drawRoundRect(x, y, boxW, boxH, 20, 20);

            // Left Pill
            g.fillRoundRect(x + 20, y + 20, 10, boxH - 40, 6, 6);

            // Title Text
            g.setColor(Color.WHITE);
            g.setFont(new Font("SansSerif", Font.BOLD, 20));
            g.drawString(steps[i][0], x + 45, y + 45);

            // Subtitle Text
            g.setColor(new Color(148, 163, 184));
            g.setFont(new Font("SansSerif", Font.PLAIN, 15));
            g.drawString(steps[i][1], x + 45, y + 78);

            // Arrow connection to next box
            if (i < steps.length - 1) {
                g.setColor(new Color(148, 163, 184));
                g.setStroke(new BasicStroke(3));
                int arrowY1 = y + boxH;
                int arrowY2 = y + boxH + 30;
                g.drawLine(width / 2, arrowY1, width / 2, arrowY2);

                // Arrow head
                Polygon p = new Polygon();
                p.addPoint(width / 2 - 8, arrowY2 - 8);
                p.addPoint(width / 2 + 8, arrowY2 - 8);
                p.addPoint(width / 2, arrowY2 + 2);
                g.fillPolygon(p);
            }

            y += boxH + 35;
        }

        File outFile = new File("/Users/chinnesh/.gemini/antigravity-ide/scratch/food-delivery-app/docs/diagrams/master_architecture_flow.png");
        ImageIO.write(img, "png", outFile);
        System.out.println("Generated: " + outFile.getAbsolutePath());
    }
}
