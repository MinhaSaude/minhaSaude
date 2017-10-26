package io.minhasaude.msapi.componet.user.firebase;

import com.google.firebase.FirebaseApp;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseToken;
import com.google.firebase.tasks.Task;
import com.google.firebase.tasks.Tasks;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

@Slf4j
public class FirebaseUserOncePerRequestFilter extends OncePerRequestFilter {

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws IOException, ServletException {
		String token = request.getHeader("X-Auth-Token");

		if (!StringUtils.isEmpty(token)) {
			try {
				FirebaseApp firebaseApp = FirebaseApp.getInstance();
				FirebaseAuth firebaseAuth = FirebaseAuth.getInstance(firebaseApp);

				System.out.println("TOKEN ================ " + token);
				

				Task<FirebaseToken> firebaseTokenTask = firebaseAuth.verifyIdToken(token);

				System.out.println("TOKEN TASK ================ " + firebaseTokenTask.getException());

				Tasks.await(firebaseTokenTask, 3, TimeUnit.SECONDS);

				String aux = "";

				if (!firebaseTokenTask.isSuccessful()) {

					throw new BadCredentialsException(aux = firebaseTokenTask.getException().getMessage(),
							firebaseTokenTask.getException());

				}

				System.out.println("Execption  task = ============= " + aux);

				FirebaseToken firebaseToken = firebaseTokenTask.getResult();

				FirebaseUserAuthenticationToken firebaseUserAuthenticationToken = new FirebaseUserAuthenticationToken(
						firebaseToken);

				SecurityContextHolder.getContext().setAuthentication(firebaseUserAuthenticationToken);

			} catch (ExecutionException | InterruptedException | TimeoutException e) {
				e.printStackTrace();
			}
		}

		filterChain.doFilter(request, response);
	}
}