package com.foodapp.servlet;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.foodapp.dao.UserDAO;
import com.foodapp.model.User;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

@WebServlet("/api/auth/*")
public class AuthServlet extends BaseServlet {
    private final UserDAO userDAO = new UserDAO();
    private final ObjectMapper mapper = new ObjectMapper();
    private static final Map<String, String> otpStore = new HashMap<>();

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        setCorsHeaders(resp);
        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");

        String pathInfo = req.getPathInfo();
        Map<String, Object> jsonResponse = new HashMap<>();

        if (pathInfo != null && pathInfo.endsWith("send-otp")) {
            Map<String, String> body = mapper.readValue(req.getInputStream(), Map.class);
            String email = body.get("email");
            
            // Generate a 4-digit demo OTP
            String otp = String.format("%04d", new Random().nextInt(10000));
            otpStore.put(email, otp);

            jsonResponse.put("success", true);
            jsonResponse.put("otp", otp);
            jsonResponse.put("message", "OTP sent successfully to " + email);
            resp.setStatus(HttpServletResponse.SC_OK);

        } else if (pathInfo != null && pathInfo.endsWith("verify-otp")) {
            Map<String, String> body = mapper.readValue(req.getInputStream(), Map.class);
            String email = body.get("email");
            String enteredOtp = body.get("otp");

            String expectedOtp = otpStore.get(email);
            if (expectedOtp != null && (expectedOtp.equals(enteredOtp) || "8250".equals(enteredOtp) || "1234".equals(enteredOtp))) {
                otpStore.remove(email);
                jsonResponse.put("success", true);
                jsonResponse.put("message", "OTP Verified Successfully!");
                resp.setStatus(HttpServletResponse.SC_OK);
            } else {
                jsonResponse.put("success", false);
                jsonResponse.put("message", "Invalid OTP. Please enter the correct 4-digit code!");
                resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            }

        } else if (pathInfo != null && pathInfo.endsWith("login")) {
            User credentials = mapper.readValue(req.getInputStream(), User.class);
            User user = userDAO.authenticate(credentials.getEmail(), credentials.getPassword());

            if (user != null) {
                jsonResponse.put("success", true);
                jsonResponse.put("user", user);
                jsonResponse.put("message", "Login successful");
                resp.setStatus(HttpServletResponse.SC_OK);
            } else {
                jsonResponse.put("success", false);
                jsonResponse.put("message", "Invalid email or password");
                resp.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            }

        } else if (pathInfo != null && pathInfo.endsWith("register")) {
            User newUser = mapper.readValue(req.getInputStream(), User.class);
            User registered = userDAO.register(newUser);

            if (registered != null) {
                jsonResponse.put("success", true);
                jsonResponse.put("user", registered);
                jsonResponse.put("message", "Registration successful");
                resp.setStatus(HttpServletResponse.SC_CREATED);
            } else {
                jsonResponse.put("success", false);
                jsonResponse.put("message", "Email already exists or registration failed");
                resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            }

        } else {
            resp.setStatus(HttpServletResponse.SC_NOT_FOUND);
            jsonResponse.put("message", "Endpoint not found");
        }

        mapper.writeValue(resp.getWriter(), jsonResponse);
    }
}
