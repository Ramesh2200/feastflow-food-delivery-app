package com.foodapp.dao;

import com.foodapp.config.DBConnection;
import com.foodapp.model.Restaurant;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class RestaurantDAO {

    public List<Restaurant> getAllRestaurants() {
        List<Restaurant> list = new ArrayList<>();
        String sql = "SELECT * FROM restaurants ORDER BY rating DESC";
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql);
             ResultSet rs = stmt.executeQuery()) {
            while (rs.next()) {
                list.add(mapRestaurant(rs));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return list;
    }

    public Restaurant getRestaurantById(int id) {
        String sql = "SELECT * FROM restaurants WHERE restaurant_id = ?";
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setInt(1, id);
            ResultSet rs = stmt.executeQuery();
            if (rs.next()) {
                return mapRestaurant(rs);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    private Restaurant mapRestaurant(ResultSet rs) throws SQLException {
        return new Restaurant(
                rs.getInt("restaurant_id"),
                rs.getInt("manager_id"),
                rs.getString("restaurant_name"),
                rs.getString("cuisine"),
                rs.getString("phone"),
                rs.getString("address"),
                rs.getDouble("rating"),
                rs.getString("image"),
                rs.getString("status")
        );
    }
}
