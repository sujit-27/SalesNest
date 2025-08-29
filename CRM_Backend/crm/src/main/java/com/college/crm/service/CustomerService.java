package com.college.crm.service;

import com.college.crm.dao.CustomerDao;
import com.college.crm.entity.Customer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CustomerService {

    @Autowired
    private CustomerDao repo;

    public void addCustomer(Customer customer){
        repo.save(customer);
    }

    public List<Customer> getCustomers() {
        return repo.findAll();
    }

    public Optional<Customer> getCustomer(int customerId) {
        return repo.findById(customerId);
    }

    public String updateCustomer(int customerId , Customer customer) {
        Optional<Customer> customerOpt = repo.findById(customerId);
        if(customerOpt.isPresent()){
            Customer customer1 = customerOpt.get();
            customer1.setCompanyName(customer.getCompanyName());
            customer1.setStatus(customer.getStatus());
            customer1.setLastContacted(customer.getLastContacted());
            customer1.setEmail(customer.getEmail());
            customer1.setPhone(customer.getPhone());
            customer1.setRevenue(customer.getRevenue());

            repo.save(customer1);
            return "Customer Updated Successfully";
        }else {
            return "Customer Not Found";
        }
    }

    public String deleteCustomer(int customerId) {
        Optional<Customer> customerOpt = repo.findById(customerId);
        if(customerOpt.isPresent()){
            Customer customer = customerOpt.get();
            repo.delete(customer);
            return "Customer Deleted Successfully";
        }else {
            return "Customer Not Found";
        }
    }
}
