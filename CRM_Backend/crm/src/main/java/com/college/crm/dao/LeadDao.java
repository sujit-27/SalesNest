package com.college.crm.dao;

import com.college.crm.entity.Customer;
import com.college.crm.entity.Leads;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LeadDao extends JpaRepository<Leads,Integer> {

}
