package com.college.crm.entity;

import jakarta.persistence.*;

import java.time.LocalTime;

@Entity
public class Activities {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String type;
    @Column(name = "customer_name")
    private String customer;
    private String description;
    private LocalTime time;
    private String status;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getCustomer() {
        return customer;
    }

    public void setCustomer(String customer) {
        this.customer = customer;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalTime getTime() {
        return time;
    }

    public void setTime(LocalTime time) {
        this.time = time;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "Activities{" +
                "id=" + id +
                ", type='" + type + '\'' +
                ", customer='" + customer + '\'' +
                ", description='" + description + '\'' +
                ", time=" + time +
                ", status='" + status + '\'' +
                '}';
    }
}
