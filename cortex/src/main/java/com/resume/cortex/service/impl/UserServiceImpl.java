package com.resume.cortex.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.resume.cortex.entity.User;
import com.resume.cortex.repo.UserRepo;
import com.resume.cortex.service.UserService;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class UserServiceImpl implements UserService {

    private final UserRepo repo;

    public UserServiceImpl(UserRepo repo) {
        this.repo = repo;
    }

    @Override
    public User findById(Long id) {
        return repo.findById(id).orElse(null);
    }

    @Override
    public User findByEmail(String email) {
        return repo.findByEmail(email).orElse(null);
    }

    @Override
    public List<User> findAllUsers() {
        return repo.findAll();
    }

    @Override
    public User saveUser(User user) {
        return repo.save(user);
    }

    @Override
    public User updateUser(User user) {
        if (repo.existsById(user.getPkId())) {
            return repo.save(user);
        }
        return null;
    }

    @Override
    public void deleteUser(Long userId) {
        repo.deleteById(userId);
    }

}
