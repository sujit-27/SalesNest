package com.college.crm.dao;

import com.college.crm.entity.Activities;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ActivitiesDao extends JpaRepository<Activities,Integer> {
}
