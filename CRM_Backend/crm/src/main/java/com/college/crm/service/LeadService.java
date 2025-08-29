package com.college.crm.service;

import com.college.crm.dao.LeadDao;
import com.college.crm.entity.Leads;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LeadService {

    @Autowired
    private LeadDao repo;

    public List<Leads> getleads() {
        return repo.findAll();
    }

    public String addLead(Leads lead) {
        repo.save(lead);
        return "Lead Added Successfully";
    }

    public String updateLead(int leadId, Leads lead) {
        Optional<Leads> leadOpt = repo.findById(leadId);
        if(leadOpt.isPresent()){
            Leads lead1 = leadOpt.get();
            lead1.setName(lead.getName());
            lead1.setEmail(lead.getEmail());
            lead1.setStatus(lead.getStatus());
            repo.save(lead1);
            return "Lead Updated Successfully";
        }else {
            return "Lead Not Found";
        }
    }

    public String deleteLead(int leadId) {
        Optional<Leads> leadOpt = repo.findById(leadId);
        if(leadOpt.isPresent()){
            Leads lead = leadOpt.get();
            repo.delete(lead);
            return "Lead Deleted Successfully";
        }else {
            return "Lead Not Found";
        }
    }
}
