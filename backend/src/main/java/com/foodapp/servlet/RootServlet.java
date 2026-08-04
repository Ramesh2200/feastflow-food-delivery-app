package com.foodapp.servlet;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

@WebServlet("")
public class RootServlet extends BaseServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        setCorsHeaders(resp);
        resp.setContentType("text/html;charset=UTF-8");
        resp.getWriter().write("""
            <!DOCTYPE html>
            <html>
            <head>
                <title>FeastFlow API Server</title>
                <style>
                    body { font-family: system-ui, sans-serif; background: #0b0f17; color: #f8fafc; padding: 40px; text-align: center; }
                    .card { background: #121824; border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 32px; max-width: 600px; margin: 0 auto; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
                    h1 { color: #ff5e36; margin-bottom: 8px; }
                    .badge { background: #10b981; color: #fff; padding: 4px 12px; border-radius: 20px; font-weight: bold; font-size: 0.85rem; display: inline-block; margin-bottom: 20px; }
                    a { color: #ff5e36; font-weight: bold; text-decoration: none; }
                    a:hover { text-decoration: underline; }
                    ul { text-align: left; background: rgba(255,255,255,0.04); padding: 20px 30px; border-radius: 12px; }
                    li { margin-bottom: 10px; }
                </style>
            </head>
            <body>
                <div class="card">
                    <h1>🚀 FeastFlow Java Servlet API Backend</h1>
                    <div class="badge">SERVER STATUS: ONLINE & CONNECTED TO MYSQL (food_delivery_db)</div>
                    <p>The backend server is running on port 8080.</p>
                    <p style="margin-top: 20px; font-weight: bold;">🌐 Access Frontend React Application:</p>
                    <p><a href="http://localhost:5173" style="font-size: 1.1rem; background: #ff5e36; color: #fff; padding: 10px 20px; border-radius: 8px; display: inline-block;">Open React Frontend App (http://localhost:5173)</a></p>
                    <h3 style="margin-top: 30px; text-align: left;">Available REST API Endpoints:</h3>
                    <ul>
                        <li><a href="/api/restaurants">GET /api/restaurants</a> - List all restaurants</li>
                        <li><a href="/api/menu">GET /api/menu</a> - List all menu dishes</li>
                        <li><a href="/api/orders?user_id=2">GET /api/orders?user_id=2</a> - User orders list</li>
                    </ul>
                </div>
            </body>
            </html>
        """);
    }
}
