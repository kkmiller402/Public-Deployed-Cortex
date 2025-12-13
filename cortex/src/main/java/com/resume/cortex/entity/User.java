package com.resume.cortex.entity;

import java.time.LocalDateTime;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.apache.commons.lang3.StringUtils;

import com.resume.cortex.enums.Roles;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pkId")
    private Long pkId;
    @Column(unique = true)
    private String email;
    @Column(name = "encPass")
    private String encPass;
    @Column(name = "firstName")
    private String firstName;
    @Column(name = "middleInitial")
    private String middleInitial;
    @Column(name = "lastName")
    private String lastName;
    private String suffix;
    private String phone;
    private String location;
    @Column(updatable = false, name = "createdDate")
    private LocalDateTime createdDate;
    @Column(name = "updatedDate")
    private LocalDateTime updatedDate;
    @Column(name = "lastSignedIn")
    private LocalDateTime lastSignedIn;
    @Enumerated(EnumType.STRING)
    private Roles role;

    public String getFullName() {
        return Stream.of(firstName, middleInitial, lastName, suffix).filter(StringUtils::isNotBlank).map(String::trim)
                .collect(Collectors.joining(" "));
    }
}
