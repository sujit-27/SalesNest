package com.college.crm.controller;

import com.college.crm.entity.Activities;
import com.college.crm.service.ActivitiesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class ActivitiesController {

    @Autowired
    private ActivitiesService service;

    @GetMapping("activities")
    public List<Activities> getActivities(){
        return service.getActivities();
    }

    @PostMapping("addActivity")
    public String addActivity(@RequestBody Activities activity){
        return service.addActivity(activity);
    }
}
