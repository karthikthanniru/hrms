package com.ems.auth.service;

import com.ems.auth.dto.ForgetPasswordChange;
import com.ems.auth.dto.ForgetPasswordRequest;
import com.ems.auth.dto.LoginRequest;
import com.ems.auth.dto.RegisterRequest;

public interface AuthService {
    String register(RegisterRequest registerRequest);

    String login(LoginRequest loginRequest);

    void forgotPassword(ForgetPasswordRequest forgetPasswordRequest);

    void forgetPasswordChange(ForgetPasswordChange forgetPasswordChange);
}
