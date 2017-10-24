package io.minhasaude.msapi.config;

import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.auth.FirebaseCredentials;
import org.springframework.beans.factory.DisposableBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;

import java.io.IOException;

@Configuration
public class FirebaseConfig implements DisposableBean {

    // TODO : Change this values
    private interface OPENSOURCE {
        String credential = "service-account.json";
        String host = "https://lucky-display-182713.firebaseio.com";
    }

    @Bean
    public FirebaseApp website() throws IOException {
        Resource resource = new ClassPathResource(OPENSOURCE.credential);

        FirebaseOptions options = new FirebaseOptions.Builder()
                .setCredential(FirebaseCredentials.fromCertificate(resource.getInputStream()))
                .setDatabaseUrl(OPENSOURCE.host)
                .build();

        return FirebaseApp.initializeApp(options);
    }

    @Override
    public void destroy() throws Exception {
        for (FirebaseApp firebaseApp : FirebaseApp.getApps()) {
            firebaseApp.delete();
        }
    }
}