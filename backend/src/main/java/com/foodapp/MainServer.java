package com.foodapp;

import com.foodapp.servlet.AuthServlet;
import com.foodapp.servlet.MenuServlet;
import com.foodapp.servlet.OrderServlet;
import com.foodapp.servlet.RestaurantServlet;
import com.foodapp.servlet.RootServlet;
import org.apache.catalina.Context;
import org.apache.catalina.startup.Tomcat;

import java.io.File;

public class MainServer {
    public static void main(String[] args) throws Exception {
        int port = 8080;
        Tomcat tomcat = new Tomcat();
        tomcat.setPort(port);
        tomcat.getConnector();

        File baseDir = new File(System.getProperty("java.io.tmpdir"));
        Context ctx = tomcat.addContext("", baseDir.getAbsolutePath());

        // Register Servlets
        Tomcat.addServlet(ctx, "RootServlet", new RootServlet());
        ctx.addServletMappingDecoded("", "RootServlet");
        ctx.addServletMappingDecoded("/", "RootServlet");

        Tomcat.addServlet(ctx, "AuthServlet", new AuthServlet());
        ctx.addServletMappingDecoded("/api/auth", "AuthServlet");
        ctx.addServletMappingDecoded("/api/auth/*", "AuthServlet");

        Tomcat.addServlet(ctx, "RestaurantServlet", new RestaurantServlet());
        ctx.addServletMappingDecoded("/api/restaurants", "RestaurantServlet");
        ctx.addServletMappingDecoded("/api/restaurants/*", "RestaurantServlet");

        Tomcat.addServlet(ctx, "MenuServlet", new MenuServlet());
        ctx.addServletMappingDecoded("/api/menu", "MenuServlet");
        ctx.addServletMappingDecoded("/api/menu/*", "MenuServlet");

        Tomcat.addServlet(ctx, "OrderServlet", new OrderServlet());
        ctx.addServletMappingDecoded("/api/orders", "OrderServlet");
        ctx.addServletMappingDecoded("/api/orders/*", "OrderServlet");

        System.out.println("=================================================");
        System.out.println("🚀 Food Delivery Java Servlet Backend Running!");
        System.out.println("   Listening on http://localhost:" + port);
        System.out.println("=================================================");

        tomcat.start();
        tomcat.getServer().await();
    }
}
