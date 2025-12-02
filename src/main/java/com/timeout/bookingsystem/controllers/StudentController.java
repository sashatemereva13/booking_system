package com.timeout.bookingsystem.controllers;

import com.timeout.bookingsystem.dto.Student;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1")
public class StudentController {

    @GetMapping("/student")
    public String[] getStudents() {
        return new String[]{
                "Ilias", "12.04.1998", "ilias@gmail.com"};
    }
    @PostMapping("student")
    public Student createStudent(@RequestBody Student student) {
        return student;
    }
}
