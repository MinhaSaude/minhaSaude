package io.minhasaude.msapi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

import io.minhasaude.msapi.property.MinhaSaudeProperty;

@SpringBootApplication
@EnableConfigurationProperties(MinhaSaudeProperty.class)
public class MsApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(MsApiApplication.class, args);
	}
}
