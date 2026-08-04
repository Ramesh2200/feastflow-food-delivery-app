package com.foodapp.dao;

import com.foodapp.config.DBConnection;
import com.foodapp.model.Order;
import com.foodapp.model.OrderItem;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class OrderDAO {

    public Order createOrder(Order order) {
        String sqlOrder = "INSERT INTO orders (user_id, restaurant_id, delivery_agent_id, total_amount, payment_method, order_status, delivery_address) VALUES (?, ?, ?, ?, ?, ?, ?)";
        String sqlItem = "INSERT INTO order_items (order_id, menu_id, quantity, price) VALUES (?, ?, ?, ?)";

        Connection conn = null;
        try {
            conn = DBConnection.getConnection();
            conn.setAutoCommit(false);

            PreparedStatement stmtOrder = conn.prepareStatement(sqlOrder, Statement.RETURN_GENERATED_KEYS);
            stmtOrder.setInt(1, order.getUserId());
            stmtOrder.setInt(2, order.getRestaurantId());
            stmtOrder.setInt(3, order.getDeliveryAgentId() > 0 ? order.getDeliveryAgentId() : 4); // Default delivery agent Ajay
            stmtOrder.setDouble(4, order.getTotalAmount());
            stmtOrder.setString(5, order.getPaymentMethod() != null ? order.getPaymentMethod() : "UPI");
            stmtOrder.setString(6, order.getOrderStatus() != null ? order.getOrderStatus() : "PLACED");
            stmtOrder.setString(7, order.getDeliveryAddress());

            int affected = stmtOrder.executeUpdate();
            if (affected > 0) {
                ResultSet rs = stmtOrder.getGeneratedKeys();
                if (rs.next()) {
                    int orderId = rs.getInt(1);
                    order.setOrderId(orderId);

                    PreparedStatement stmtItem = conn.prepareStatement(sqlItem);
                    for (OrderItem item : order.getItems()) {
                        stmtItem.setInt(1, orderId);
                        stmtItem.setInt(2, item.getMenuId());
                        stmtItem.setInt(3, item.getQuantity());
                        stmtItem.setDouble(4, item.getPrice());
                        stmtItem.addBatch();
                    }
                    stmtItem.executeBatch();
                    conn.commit();
                    return order;
                }
            }
        } catch (SQLException e) {
            if (conn != null) {
                try { conn.rollback(); } catch (SQLException ex) { ex.printStackTrace(); }
            }
            e.printStackTrace();
        } finally {
            if (conn != null) {
                try { conn.setAutoCommit(true); conn.close(); } catch (SQLException e) { e.printStackTrace(); }
            }
        }
        return null;
    }

    public List<Order> getOrdersByUserId(int userId) {
        List<Order> list = new ArrayList<>();
        String sql = "SELECT o.*, r.restaurant_name FROM orders o JOIN restaurants r ON o.restaurant_id = r.restaurant_id WHERE o.user_id = ? ORDER BY o.order_date DESC";
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setInt(1, userId);
            ResultSet rs = stmt.executeQuery();
            while (rs.next()) {
                Order order = mapOrder(rs);
                order.setItems(getOrderItems(order.getOrderId(), conn));
                list.add(order);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return list;
    }

    public List<Order> getAllOrders() {
        List<Order> list = new ArrayList<>();
        String sql = "SELECT o.*, r.restaurant_name FROM orders o JOIN restaurants r ON o.restaurant_id = r.restaurant_id ORDER BY o.order_date DESC";
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql);
             ResultSet rs = stmt.executeQuery()) {
            while (rs.next()) {
                Order order = mapOrder(rs);
                order.setItems(getOrderItems(order.getOrderId(), conn));
                list.add(order);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return list;
    }

    public boolean updateOrderStatus(int orderId, String newStatus) {
        String sql = "UPDATE orders SET order_status = ? WHERE order_id = ?";
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, newStatus);
            stmt.setInt(2, orderId);
            return stmt.executeUpdate() > 0;
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }

    private Order mapOrder(ResultSet rs) throws SQLException {
        return new Order(
                rs.getInt("order_id"),
                rs.getInt("user_id"),
                rs.getInt("restaurant_id"),
                rs.getString("restaurant_name"),
                rs.getInt("delivery_agent_id"),
                rs.getDouble("total_amount"),
                rs.getString("payment_method"),
                rs.getString("order_status"),
                rs.getString("delivery_address"),
                rs.getTimestamp("order_date").toString(),
                new ArrayList<>()
        );
    }

    private List<OrderItem> getOrderItems(int orderId, Connection conn) throws SQLException {
        List<OrderItem> items = new ArrayList<>();
        String sql = "SELECT oi.*, m.item_name FROM order_items oi JOIN menu m ON oi.menu_id = m.menu_id WHERE oi.order_id = ?";
        try (PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setInt(1, orderId);
            ResultSet rs = stmt.executeQuery();
            while (rs.next()) {
                items.add(new OrderItem(
                        rs.getInt("order_item_id"),
                        rs.getInt("order_id"),
                        rs.getInt("menu_id"),
                        rs.getString("item_name"),
                        rs.getInt("quantity"),
                        rs.getDouble("price")
                ));
            }
        }
        return items;
    }
}
