package io.minhasaude.msapi.resource;

import java.security.Principal;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.minhasaude.msapi.componet.user.CurrentUser;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin
public class TesteResource {
	
    @RequestMapping("/test")
    @PreAuthorize("hasAnyRole('ROLE_USER')")
    public ResponseEntity<String> userIndex(@CurrentUser Principal principal) {
        return ResponseEntity.ok("Hello, " + principal.getName());
    }
}
