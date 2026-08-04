package com.foodapp.model;

public class MenuItem {
    private int menuId;
    private int restaurantId;
    private String itemName;
    private String description;
    private double price;
    private String category;
    private String image;
    private boolean available;

    public MenuItem() {}

    public MenuItem(int menuId, int restaurantId, String itemName, String description, double price, String category, String image, boolean available) {
        this.menuId = menuId;
        this.restaurantId = restaurantId;
        this.itemName = itemName;
        this.description = description;
        this.price = price;
        this.category = category;
        this.image = image;
        this.available = available;
    }

    public int getMenuId() { return menuId; }
    public void setMenuId(int menuId) { this.menuId = menuId; }

    public int getRestaurantId() { return restaurantId; }
    public void setRestaurantId(int restaurantId) { this.restaurantId = restaurantId; }

    public String getItemName() { return itemName; }
    public void setItemName(String itemName) { this.itemName = itemName; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getImage() { return image; }
    public void setImage(String image) { this.image = image; }

    public boolean isAvailable() { return available; }
    public void setAvailable(boolean available) { this.available = available; }
}
