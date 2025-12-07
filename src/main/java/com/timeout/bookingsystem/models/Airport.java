package com.timeout.bookingsystem.models;

import jakarta.persistence.*;

@Entity
@Table(name = "airports")
public class Airport {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name_airport", nullable = false)
    private String nameAirport;

    @Column(name = "country_airport", nullable = false)
    private String countryAirport;

    @Column(name = "city_airport", nullable = false)
    private String cityAirport;

    @Column(name = "code", nullable = false, unique = true)
    private String code;

    public Airport() {
    }

    public Airport(String nameAirport, String countryAirport, String cityAirport, String code) {
        this.nameAirport = nameAirport;
        this.countryAirport = countryAirport;
        this.cityAirport = cityAirport;
        this.code = code;
    }

    public Long getId() {
        return id;
    }

    public String getNameAirport() {
        return nameAirport;
    }

    public void setNameAirport(String nameAirport) {
        this.nameAirport = nameAirport;
    }

    public String getCountryAirport() {
        return countryAirport;
    }

    public void setCountryAirport(String countryAirport) {
        this.countryAirport = countryAirport;
    }

    public String getCityAirport() {
        return cityAirport;
    }

    public void setCityAirport(String cityAirport) {
        this.cityAirport = cityAirport;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }
}
