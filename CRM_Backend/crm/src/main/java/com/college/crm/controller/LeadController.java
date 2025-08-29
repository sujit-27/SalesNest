package com.college.crm.controller;

import com.college.crm.entity.Customer;
import com.college.crm.entity.Leads;
import com.college.crm.service.LeadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class LeadController {

    @Autowired
    private LeadService service;

    @GetMapping("leads")
    public List<Leads> getCustomers(){
        return service.getleads();
    }

    @PostMapping("addLead")
    public String addLead(@RequestBody Leads lead){
        service.addLead(lead);
        return service.addLead(lead);
    }

    @PutMapping("lead/{leadId}")
    public String updateCustomer(@PathVariable int leadId , @RequestBody Leads lead){
        return service.updateLead(leadId ,lead);
    }

    @DeleteMapping("lead/{leadId}")
    public String deleteCustomer(@PathVariable int leadId){
        return service.deleteLead(leadId);
    }
}
