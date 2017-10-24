package io.minhasaude.msapi.componet.user.firebase;


import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.UserRecord;
import com.google.firebase.tasks.Task;
import com.google.firebase.tasks.Tasks;

import io.minhasaude.msapi.componet.user.CurrentUserDetails;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

@Service
public class FirebaseUserDetailsServices implements UserDetailsService {

    @Override
    public UserDetails loadUserByUsername(String uid) throws UsernameNotFoundException {
        try {
            Task<UserRecord> user = FirebaseAuth.getInstance().getUser(uid);
            Tasks.await(user, 3, TimeUnit.SECONDS);

            UserRecord userRecord = user.getResult();
            if (userRecord == null) {
                throw new UsernameNotFoundException("Nome de usuário não encontrado!");
            }

            Set<GrantedAuthority> authorities = new HashSet<>();
            authorities.add(new SimpleGrantedAuthority("ROLE_USER"));

            return new CurrentUserDetails(userRecord.getUid(), authorities);
            
        } catch (InterruptedException | ExecutionException | TimeoutException e) {
            e.printStackTrace();

            throw new UsernameNotFoundException("Nome de usuário não encontrado!");
        }
    }
}
