package com.mycompany.myapp.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A Flight.
 */
@Entity
@Table(name = "flight")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Flight implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "jhi_number")
    private Integer number;

    @Column(name = "passengers")
    private Integer passengers;

    @Column(name = "distance")
    private Integer distance;

    @Column(name = "company")
    private String company;

    @Column(name = "seats")
    private Integer seats;

    @Column(name = "jhi_date")
    private LocalDate date;

    @ManyToOne
    @JsonIgnoreProperties("flights")
    private Airport departureAirport;

    @ManyToOne
    @JsonIgnoreProperties("flights")
    private Airport arrivalAirport;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getNumber() {
        return number;
    }

    public Flight number(Integer number) {
        this.number = number;
        return this;
    }

    public void setNumber(Integer number) {
        this.number = number;
    }

    public Integer getPassengers() {
        return passengers;
    }

    public Flight passengers(Integer passengers) {
        this.passengers = passengers;
        return this;
    }

    public void setPassengers(Integer passengers) {
        this.passengers = passengers;
    }

    public Integer getDistance() {
        return distance;
    }

    public Flight distance(Integer distance) {
        this.distance = distance;
        return this;
    }

    public void setDistance(Integer distance) {
        this.distance = distance;
    }

    public String getCompany() {
        return company;
    }

    public Flight company(String company) {
        this.company = company;
        return this;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public Integer getSeats() {
        return seats;
    }

    public Flight seats(Integer seats) {
        this.seats = seats;
        return this;
    }

    public void setSeats(Integer seats) {
        this.seats = seats;
    }

    public LocalDate getDate() {
        return date;
    }

    public Flight date(LocalDate date) {
        this.date = date;
        return this;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Airport getDepartureAirport() {
        return departureAirport;
    }

    public Flight departureAirport(Airport airport) {
        this.departureAirport = airport;
        return this;
    }

    public void setDepartureAirport(Airport airport) {
        this.departureAirport = airport;
    }

    public Airport getArrivalAirport() {
        return arrivalAirport;
    }

    public Flight arrivalAirport(Airport airport) {
        this.arrivalAirport = airport;
        return this;
    }

    public void setArrivalAirport(Airport airport) {
        this.arrivalAirport = airport;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Flight flight = (Flight) o;
        if (flight.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), flight.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Flight{" +
            "id=" + getId() +
            ", number=" + getNumber() +
            ", passengers=" + getPassengers() +
            ", distance=" + getDistance() +
            ", company='" + getCompany() + "'" +
            ", seats=" + getSeats() +
            ", date='" + getDate() + "'" +
            "}";
    }
}
