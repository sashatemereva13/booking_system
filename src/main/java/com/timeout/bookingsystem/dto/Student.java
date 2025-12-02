package com.timeout.bookingsystem.dto;

public class Student {

    // private fields → hidden from outside
    private String name;
    private String birthday;
    private String email;

    // Constructor
    public Student(String name, String birthday, String email) {
        this.name = name;
        this.birthday = birthday;
        this.email = email;
    }

    // GETTERS (read-only access)
    public String getName() {
        return name;
    }

    public String getAge() {
        return birthday;
    }

    public String getEmail() {
        return email;
    }

    // SETTERS (controlled write)
    public void setName(String name) {
        this.name = name;
    }

    public void setAge(int age) {
            this.birthday = birthday;

    }

    public void setEmail(String email) {
        this.email = email;
    }
}
