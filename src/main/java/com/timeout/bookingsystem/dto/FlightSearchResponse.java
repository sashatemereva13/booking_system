package com.timeout.bookingsystem.dto;

public class FlightSearchResponse {

    public Long id;
    public String flightNumber;
    public String departureAirport;
    public String arrivalAirport;
    public String departureTime;
    public String arrivalTime;

    public int economyAvailable;
    public int businessAvailable;
    public int firstAvailable;

    public Double priceEconomy;
    public Double priceBusiness;
    public Double priceFirst;

    public FlightSearchResponse(Long id, String flightNumber, String departureAirport,
                                String arrivalAirport, String departureTime, String arrivalTime,
                                int economyAvailable, int businessAvailable, int firstAvailable,
                                Double priceEconomy, Double priceBusiness, Double priceFirst) {
        this.id = id;
        this.flightNumber = flightNumber;

        this.departureAirport = departureAirport;
        this.arrivalAirport = arrivalAirport;

        this.departureTime = departureTime;
        this.arrivalTime = arrivalTime;

        this.economyAvailable = economyAvailable;
        this.businessAvailable = businessAvailable;
        this.firstAvailable = firstAvailable;

        this.priceEconomy = priceEconomy;
        this.priceBusiness = priceBusiness;
        this.priceFirst = priceFirst;
    }
}
