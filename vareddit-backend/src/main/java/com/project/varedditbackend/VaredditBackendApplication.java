package com.project.varedditbackend;

import com.project.varedditbackend.entities.*;
import com.project.varedditbackend.repositories.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class VaredditBackendApplication {

	private static final Logger log = LoggerFactory.getLogger(VaredditBackendApplication.class);


	public static void main(String[] args) {
		SpringApplication.run(VaredditBackendApplication.class, args);
	}

	@GetMapping("/hello")
	public String hello(@RequestParam(value = "name", defaultValue = "World") String name) {
		return String.format("Hello %s!", name);
	}

/*	@Bean
	public CommandLineRunner demo(CustomerRepository repository) {
		return (args) -> {
			// save a few customers
			repository.save(new Customer("Jack", "Bauer"));
			repository.save(new Customer("Chloe", "O'Brian"));
			repository.save(new Customer("Kim", "Bauer"));
			repository.save(new Customer("David", "Palmer"));
			repository.save(new Customer("Michelle", "Dessler"));

			// fetch all customers
			log.info("Customers found with findAll():");
			log.info("-------------------------------");
			for (Customer customer : repository.findAll()) {
				log.info(customer.toString());
			}
			log.info("");

			// fetch an individual customer by ID
			Customer customer = repository.findById(1L);
			log.info("Customer found with findById(1L):");
			log.info("--------------------------------");
			log.info(customer.toString());
			log.info("");

			// fetch customers by last name
			log.info("Customer found with findByLastName('Bauer'):");
			log.info("--------------------------------------------");
			repository.findByLastName("Bauer").forEach(bauer -> {
				log.info(bauer.toString());
			});
			// for (Customer bauer : repository.findByLastName("Bauer")) {
			//  log.info(bauer.toString());
			// }
			log.info("");
		};
	}*/


	@Bean
	public CommandLineRunner demo(PostRepository repo) {
		return (args) -> {
			// save a few customers
			repo.save(new Post("post-1"));
			repo.save(new Post("post-2"));

			// fetch all posts
			log.info("Post found with findAll():");
			log.info("-------------------------------");
			for (Post post : repo.findAll()) {
				log.info(post.toString());
			}

			log.info("");
		};
	}

	@Bean
	public CommandLineRunner demo2(UserRepository repo) {
		return (args) -> {
			// save a few customers
			repo.save(new User("Toto", "1234"));
			repo.save(new User("Jean", "1234"));

			// fetch all posts
			log.info("Post found with findAll():");
			log.info("-------------------------------");
			for (User user : repo.findAll()) {
				log.info(user.toString());
			}

			log.info("");
		};
	}

}