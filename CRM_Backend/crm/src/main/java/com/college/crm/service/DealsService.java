package com.college.crm.service;

import com.college.crm.dao.DealsDao;
import com.college.crm.entity.Deals;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DealsService {

    @Autowired
    private DealsDao repo;

    public List<Deals> getDeals() {
        return repo.findAll();
    }

    public String addDeal(Deals deal) {
        repo.save(deal);
        return "Deal Added Successfully";
    }
}
