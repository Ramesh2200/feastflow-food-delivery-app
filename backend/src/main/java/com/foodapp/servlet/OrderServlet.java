package com.foodapp.servlet;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.foodapp.dao.OrderDAO;
import com.foodapp.model.Order;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@WebServlet("/api/orders/*")
public class OrderServlet extends BaseServlet {
    private final OrderDAO orderDAO = new OrderDAO();
    private final ObjectMapper mapper = new ObjectMapper();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        setCorsHeaders(resp);
        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");

        String userIdParam = req.getParameter("user_id");

        if (userIdParam != null && !userIdParam.isEmpty()) {
            try {
                int userId = Integer.parseInt(userIdParam);
                List<Order> orders = orderDAO.getOrdersByUserId(userId);
                mapper.writeValue(resp.getWriter(), orders);
            } catch (NumberFormatException e) {
                resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                resp.getWriter().write("{\"message\":\"Invalid user ID\"}");
            }
        } else {
            List<Order> allOrders = orderDAO.getAllOrders();
            mapper.writeValue(resp.getWriter(), allOrders);
        }
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        setCorsHeaders(resp);
        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");

        Order newOrder = mapper.readValue(req.getInputStream(), Order.class);
        Order created = orderDAO.createOrder(newOrder);

        Map<String, Object> jsonResponse = new HashMap<>();
        if (created != null) {
            jsonResponse.put("success", true);
            jsonResponse.put("order", created);
            jsonResponse.put("message", "Order placed successfully!");
            resp.setStatus(HttpServletResponse.SC_CREATED);
        } else {
            jsonResponse.put("success", false);
            jsonResponse.put("message", "Failed to place order");
            resp.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
        }

        mapper.writeValue(resp.getWriter(), jsonResponse);
    }

    @Override
    protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        setCorsHeaders(resp);
        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");

        Map<String, Object> body = mapper.readValue(req.getInputStream(), Map.class);
        int orderId = Integer.parseInt(body.get("order_id").toString());
        String status = body.get("status").toString();

        boolean updated = orderDAO.updateOrderStatus(orderId, status);
        Map<String, Object> jsonResponse = new HashMap<>();
        jsonResponse.put("success", updated);
        jsonResponse.put("message", updated ? "Order status updated" : "Update failed");

        mapper.writeValue(resp.getWriter(), jsonResponse);
    }
}
