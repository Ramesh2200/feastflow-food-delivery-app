package com.foodapp.model;

public class Restaurant {
    private int restaurantId;
    private int managerId;
    private String restaurantName;
    private String cuisine;
    private String phone;
    private String address;
    private double rating;
    private String image;
    private String status; // OPEN, CLOSED

    public Restaurant() {}

    public Restaurant(int restaurantId, int managerId, String restaurantName, String cuisine, String phone, String address, double rating, String image, String status) {
        this.restaurantId = restaurantId;
        this.managerId = managerId;
        this.restaurantName = restaurantName;
        this.cuisine = cuisine;
        this.phone = phone;
        this.address = address;
        this.rating = rating;
        this.image = image;
        this.status = status;
    }

    public int getRestaurantId() { return restaurantId; }
    public void setRestaurantId(int restaurantId) { this.restaurantId = restaurantId; }

    public int getManagerId() { return managerId; }
    public void setManagerId(int managerId) { this.managerId = managerId; }

    public String getRestaurantName() { return restaurantName; }
    public void setRestaurantName(String restaurantName) { this.restaurantName = restaurantName; }

    public String getCuisine() { return cuisine; }
    public void setCuisine(String cuisine) { this.cuisine = cuisine; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public double getRating() { return rating; }
    public void setRating(double rating) { this.rating = rating; }

    public String getImage() { return image; }
    public void setImage(String image) { this.image = image; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
