package com.college.crm.controller;

import com.college.crm.entity.Deals;
import com.college.crm.service.DealsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class DealsController {

    @Autowired
    private DealsService service;

    @GetMapping("deals")
    public List<Deals> getDeals(){
        return service.getDeals();
    }

    @PostMapping("addDeal")
    public String addDeal(@RequestBody Deals deal){
        return service.addDeal(deal);
    }
}
