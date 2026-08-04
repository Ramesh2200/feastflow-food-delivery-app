package com.foodapp.servlet;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.foodapp.dao.RestaurantDAO;
import com.foodapp.model.Restaurant;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.List;

@WebServlet("/api/restaurants/*")
public class RestaurantServlet extends BaseServlet {
    private final RestaurantDAO restaurantDAO = new RestaurantDAO();
    private final ObjectMapper mapper = new ObjectMapper();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        setCorsHeaders(resp);
        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");

        String pathInfo = req.getPathInfo();

        if (pathInfo == null || "/".equals(pathInfo) || pathInfo.isEmpty()) {
            List<Restaurant> restaurants = restaurantDAO.getAllRestaurants();
            mapper.writeValue(resp.getWriter(), restaurants);
        } else {
            try {
                String idStr = pathInfo.startsWith("/") ? pathInfo.substring(1) : pathInfo;
                int id = Integer.parseInt(idStr);
                Restaurant restaurant = restaurantDAO.getRestaurantById(id);
                if (restaurant != null) {
                    mapper.writeValue(resp.getWriter(), restaurant);
                } else {
                    resp.setStatus(HttpServletResponse.SC_NOT_FOUND);
                    resp.getWriter().write("{\"message\":\"Restaurant not found\"}");
                }
            } catch (NumberFormatException e) {
                resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                resp.getWriter().write("{\"message\":\"Invalid restaurant ID\"}");
            }
        }
    }
}
