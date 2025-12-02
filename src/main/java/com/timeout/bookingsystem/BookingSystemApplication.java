package com.timeout.bookingsystem;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
//import org.springframework.web.bind.annotation.RestController;
//import org.springframework.web.bind.annotation.RequestMapping;

@SpringBootApplication
public class BookingSystemApplication {

    public static void main(String[] args) {
        SpringApplication.run(BookingSystemApplication.class, args);
    }

//    @RestController
//    public class HelloController {
//
//        @RequestMapping("/hello")
//        public String hello() {
//            return "Hello World";
//        }
//    }
}
