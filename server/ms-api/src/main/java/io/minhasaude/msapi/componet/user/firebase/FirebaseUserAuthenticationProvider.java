package io.minhasaude.msapi.componet.user.firebase;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

@Component
public class FirebaseUserAuthenticationProvider implements AuthenticationProvider {

    private final FirebaseUserDetailsServices firebaseUserDetailsServices;

    @Autowired
    public FirebaseUserAuthenticationProvider(FirebaseUserDetailsServices firebaseUserDetailsServices) {
        this.firebaseUserDetailsServices = firebaseUserDetailsServices;
    }

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        String uid = (String) authentication.getPrincipal();

        UserDetails userDetails = firebaseUserDetailsServices.loadUserByUsername(uid);

        return new UsernamePasswordAuthenticationToken(userDetails.getUsername(), userDetails.getPassword(), userDetails.getAuthorities());
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return FirebaseUserAuthenticationToken.class.isAssignableFrom(authentication);
    }
}
