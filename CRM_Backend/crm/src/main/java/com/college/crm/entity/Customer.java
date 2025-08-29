package com.college.crm.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "customers")
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name = "company_name")
    private String companyName;
    @Column(unique = true)
    private String email;
    @Column(unique = true)
    private String phone;
    private String revenue;
    private String status;
    @Column(name = "last_contacted")
    private String lastContacted;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getRevenue() {
        return revenue;
    }

    public void setRevenue(String revenue) {
        this.revenue = revenue;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getLastContacted() {
        return lastContacted;
    }

    public void setLastContacted(String lastContacted) {
        this.lastContacted = lastContacted;
    }

    @Override
    public String toString() {
        return "Customer{" +
                "id=" + id +
                ", company='" + companyName + '\'' +
                ", email='" + email + '\'' +
                ", phone='" + phone + '\'' +
                ", revenue=" + revenue +
                ", status=" + status +
                ", lastContacted='" + lastContacted + '\'' +
                '}';
    }
}
