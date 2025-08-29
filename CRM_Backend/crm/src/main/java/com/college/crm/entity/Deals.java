package com.college.crm.entity;

import jakarta.persistence.*;

@Entity
public class Deals {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name = "deal_name")
    private String dealName;
    @Column(name = "customer_name")
    private String customerName;
    private String status;
    private String value;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getDealName() {
        return dealName;
    }

    public void setDealName(String dealName) {
        this.dealName = dealName;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    @Override
    public String toString() {
        return "Deals{" +
                "id=" + id +
                ", dealName='" + dealName + '\'' +
                ", customerName='" + customerName + '\'' +
                ", status='" + status + '\'' +
                ", value='" + value + '\'' +
                '}';
    }
}
