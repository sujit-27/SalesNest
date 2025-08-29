package com.college.crm.controller;

import com.college.crm.entity.Customer;
import com.college.crm.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
public class CustomerController {

    @Autowired
    private CustomerService service;

    @GetMapping("customers")
    public List<Customer> getCustomers(){
        return service.getCustomers();
    }

    @GetMapping("customer/{customerId}")
    public Optional<Customer> getCustomer(@PathVariable int customerId){
        return service.getCustomer(customerId);
    }

    @PostMapping("addCustomer")
    public String addCustomer(@RequestBody Customer customer){
        service.addCustomer(customer);
        return "Customer Added Successfully";
    }

    @PutMapping("customer/{customerId}")
    public String updateCustomer(@PathVariable int customerId , @RequestBody Customer customer){
        return service.updateCustomer(customerId ,customer);
    }

    @DeleteMapping("customer/{customerId}")
    public String deleteCustomer(@PathVariable int customerId){
        return service.deleteCustomer(customerId);
    }

}
