package com.ems.auth.config;

import com.ems.auth.entity.Roles;
import com.ems.auth.repository.RoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final RoleRepository roleRepository;

    @Override
    public void run(String... args){
        createRoleIfNotExists("ADMIN");
        createRoleIfNotExists("HR");
        createRoleIfNotExists("MANAGER");
        createRoleIfNotExists("EMPLOYEE");

    }

    private void createRoleIfNotExists(String roleName){
        roleRepository.findByName(roleName)
                .orElseGet(()->roleRepository.save(Roles.builder().name(roleName).build()));

    }
}
