package com.foodapp.dao;

import com.foodapp.config.DBConnection;
import com.foodapp.model.MenuItem;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class MenuDAO {

    public List<MenuItem> getMenuByRestaurantId(int restaurantId) {
        List<MenuItem> list = new ArrayList<>();
        String sql = "SELECT * FROM menu WHERE restaurant_id = ? AND available = TRUE";
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setInt(1, restaurantId);
            ResultSet rs = stmt.executeQuery();
            while (rs.next()) {
                list.add(mapMenuItem(rs));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return list;
    }

    public List<MenuItem> getAllMenuItems() {
        List<MenuItem> list = new ArrayList<>();
        String sql = "SELECT * FROM menu WHERE available = TRUE";
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql);
             ResultSet rs = stmt.executeQuery()) {
            while (rs.next()) {
                list.add(mapMenuItem(rs));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return list;
    }

    private MenuItem mapMenuItem(ResultSet rs) throws SQLException {
        return new MenuItem(
                rs.getInt("menu_id"),
                rs.getInt("restaurant_id"),
                rs.getString("item_name"),
                rs.getString("description"),
                rs.getDouble("price"),
                rs.getString("category"),
                rs.getString("image"),
                rs.getBoolean("available")
        );
    }
}
