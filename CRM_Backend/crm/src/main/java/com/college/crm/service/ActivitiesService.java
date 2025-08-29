package com.college.crm.service;

import com.college.crm.dao.ActivitiesDao;
import com.college.crm.entity.Activities;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ActivitiesService {

    @Autowired
    private ActivitiesDao repo;

    public List<Activities> getActivities() {
       return repo.findAll();
    }

    public String addActivity(Activities activity) {
        repo.save(activity);
        return "Activity Added Successfully";
    }
}
