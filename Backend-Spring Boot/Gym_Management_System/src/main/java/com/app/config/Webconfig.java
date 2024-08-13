package com.app.config;


import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class Webconfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000") // specify allowed origins
                .allowedMethods("GET", "POST", "PUT","PATCH", "DELETE", "OPTIONS") // specify allowed HTTP methods
                .allowedHeaders("*") // specify allowed headers
                .allowCredentials(true) // allow credentials
                .maxAge(3600); // specify how long the response from a preflight request can be cached by clients
    }
}