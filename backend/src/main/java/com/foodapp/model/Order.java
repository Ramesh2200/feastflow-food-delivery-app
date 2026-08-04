package com.foodapp.model;

import java.util.List;

public class Order {
    private int orderId;
    private int userId;
    private int restaurantId;
    private String restaurantName;
    private int deliveryAgentId;
    private double totalAmount;
    private String paymentMethod; // COD, UPI, CARD
    private String orderStatus; // PLACED, CONFIRMED, PREPARING, OUT_FOR_DELIVERY, DELIVERED, CANCELLED
    private String deliveryAddress;
    private String orderDate;
    private List<OrderItem> items;

    public Order() {}

    public Order(int orderId, int userId, int restaurantId, String restaurantName, int deliveryAgentId, double totalAmount, String paymentMethod, String orderStatus, String deliveryAddress, String orderDate, List<OrderItem> items) {
        this.orderId = orderId;
        this.userId = userId;
        this.restaurantId = restaurantId;
        this.restaurantName = restaurantName;
        this.deliveryAgentId = deliveryAgentId;
        this.totalAmount = totalAmount;
        this.paymentMethod = paymentMethod;
        this.orderStatus = orderStatus;
        this.deliveryAddress = deliveryAddress;
        this.orderDate = orderDate;
        this.items = items;
    }

    public int getOrderId() { return orderId; }
    public void setOrderId(int orderId) { this.orderId = orderId; }

    public int getUserId() { return userId; }
    public void setUserId(int userId) { this.userId = userId; }

    public int getRestaurantId() { return restaurantId; }
    public void setRestaurantId(int restaurantId) { this.restaurantId = restaurantId; }

    public String getRestaurantName() { return restaurantName; }
    public void setRestaurantName(String restaurantName) { this.restaurantName = restaurantName; }

    public int getDeliveryAgentId() { return deliveryAgentId; }
    public void setDeliveryAgentId(int deliveryAgentId) { this.deliveryAgentId = deliveryAgentId; }

    public double getTotalAmount() { return totalAmount; }
    public void setTotalAmount(double totalAmount) { this.totalAmount = totalAmount; }

    public String getPaymentMethod() { return paymentMethod; }
    public void setPaymentMethod(String paymentMethod) { this.paymentMethod = paymentMethod; }

    public String getOrderStatus() { return orderStatus; }
    public void setOrderStatus(String orderStatus) { this.orderStatus = orderStatus; }

    public String getDeliveryAddress() { return deliveryAddress; }
    public void setDeliveryAddress(String deliveryAddress) { this.deliveryAddress = deliveryAddress; }

    public String getOrderDate() { return orderDate; }
    public void setOrderDate(String orderDate) { this.orderDate = orderDate; }

    public List<OrderItem> getItems() { return items; }
    public void setItems(List<OrderItem> items) { this.items = items; }
}
