package com.resume.cortex.dto;

import com.resume.cortex.entity.User;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDTO {

    private String email;
    private String firstName;
    private String middleInitial;
    private String lastName;
    private String suffix;
    private String phone;
    private String location;
    private String role;
    private String lastSignedIn;
    private String createdDate;

    public static UserDTO fromUser(User user) {
        UserDTO dto = new UserDTO();
        dto.setEmail(user.getEmail());
        dto.setFirstName(user.getFirstName());
        dto.setMiddleInitial(user.getMiddleInitial());
        dto.setLastName(user.getLastName());
        dto.setSuffix(user.getSuffix());
        dto.setPhone(user.getPhone());
        dto.setLocation(user.getLocation());
        dto.setRole(user.getRole().toString());
        dto.setLastSignedIn(user.getLastSignedIn().toString());
        dto.setCreatedDate(user.getCreatedDate().toString());
        return dto;
    }
}
