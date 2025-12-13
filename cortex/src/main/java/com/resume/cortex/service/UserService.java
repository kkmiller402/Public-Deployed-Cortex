package com.resume.cortex.service;

import java.util.List;

import com.resume.cortex.entity.User;

public interface UserService {

    User findById(Long id);

    User findByEmail(String email);

    List<User> findAllUsers();

    User saveUser(User user);

    User updateUser(User user);

    void deleteUser(Long userId);

}
