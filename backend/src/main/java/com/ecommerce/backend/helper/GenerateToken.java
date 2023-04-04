package com.ecommerce.backend.helper;

import java.security.SecureRandom;
import java.util.Base64;

public class GenerateToken {
    private SecureRandom secureRandom = new SecureRandom();

    public String generateToken() {
        byte[] token = new byte[32];
        secureRandom.nextBytes(token);
        return Base64.getUrlEncoder().withoutPadding().encodeToString(token);
    }
}
