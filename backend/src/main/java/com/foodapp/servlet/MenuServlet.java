package com.foodapp.servlet;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.foodapp.dao.MenuDAO;
import com.foodapp.model.MenuItem;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.List;

@WebServlet("/api/menu/*")
public class MenuServlet extends BaseServlet {
    private final MenuDAO menuDAO = new MenuDAO();
    private final ObjectMapper mapper = new ObjectMapper();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        setCorsHeaders(resp);
        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");

        String restaurantIdParam = req.getParameter("restaurant_id");

        if (restaurantIdParam != null && !restaurantIdParam.isEmpty()) {
            try {
                int restaurantId = Integer.parseInt(restaurantIdParam);
                List<MenuItem> items = menuDAO.getMenuByRestaurantId(restaurantId);
                mapper.writeValue(resp.getWriter(), items);
            } catch (NumberFormatException e) {
                resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                resp.getWriter().write("{\"message\":\"Invalid restaurant ID\"}");
            }
        } else {
            List<MenuItem> allItems = menuDAO.getAllMenuItems();
            mapper.writeValue(resp.getWriter(), allItems);
        }
    }
}
