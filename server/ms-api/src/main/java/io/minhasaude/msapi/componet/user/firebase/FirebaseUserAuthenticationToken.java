package io.minhasaude.msapi.componet.user.firebase;

import com.google.firebase.auth.FirebaseToken;
import org.springframework.security.authentication.AbstractAuthenticationToken;

public class FirebaseUserAuthenticationToken extends AbstractAuthenticationToken {

    private FirebaseToken firebaseToken;

    public FirebaseUserAuthenticationToken(FirebaseToken firebaseToken) {
        super(null);

        this.firebaseToken = firebaseToken;
    }

    @Override
    public Object getCredentials() {
        return firebaseToken.getClaims();
    }

    @Override
    public Object getPrincipal() {
        return firebaseToken.getUid();
    }
}
