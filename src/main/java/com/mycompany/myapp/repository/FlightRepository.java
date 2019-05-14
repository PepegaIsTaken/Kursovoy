package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Flight;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;


/**
 * Spring Data  repository for the Flight entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FlightRepository extends JpaRepository<Flight, Long> {

    Page<Flight> findByCompany(String currentUserLogin, Pageable pageable);
    Page<Flight> findByDateBetween(LocalDate current, LocalDate weeks, Pageable pageable);
    Page<Flight> findByCompanyAndDateBetween(String currentUserLogin, LocalDate current, LocalDate weeks, Pageable pageable);
}
