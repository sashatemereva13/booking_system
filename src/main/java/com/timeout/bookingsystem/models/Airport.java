package com.timeout.bookingsystem.models;
import jakarta.persistence.*;


@Entity
@Table(name = "airports")

public class Airport {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="name_airport", nullable = false)
    private String nameAirport;

    @Column(name="country_airport", nullable = false)
    private String countryAirport;

    @Column(name="city_airport", nullable = false)
    private String cityAirport;

    @Column(name="code", nullable = false)
    private String code;

    public Airport() {}

    public Airport(String nameAirport, String countryAirport, String cityAirport) {
        this.nameAirport = nameAirport;
        this.countryAirport = countryAirport;
        this.cityAirport = cityAirport;
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

}
