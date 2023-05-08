import org.springframework.boot.gradle.tasks.bundling.BootJar

plugins {
	java
	id("org.springframework.boot") version "3.0.4"
	id("io.spring.dependency-management") version "1.1.0"
}

group = "com.pr.golf"
version = "0.0.1-SNAPSHOT"
java.sourceCompatibility = JavaVersion.VERSION_17

repositories {
	mavenCentral()
}

dependencies {
	implementation("org.springframework.boot:spring-boot-starter")
	implementation("org.springframework.boot:spring-boot-starter-web")
    implementation("org.springframework.boot:spring-boot-starter-webflux")
	
	implementation ("org.springframework.boot:spring-boot-starter-data-jpa")

	implementation("net.sourceforge.tess4j:tess4j:4.5.1")

	compileOnly("org.projectlombok:lombok:1.18.26")
	annotationProcessor("org.projectlombok:lombok:1.18.26")

	compileOnly("org.springframework.boot:spring-boot-devtools")

	implementation("io.projectreactor:reactor-core:3.5.3")

	implementation ("org.mariadb.jdbc:mariadb-java-client:3.0.8")

	implementation("org.junit.jupiter:junit-jupiter-api:5.9.2")

// https://mvnrepository.com/artifact/org.junit.jupiter/junit-jupiter-api
	testImplementation("org.junit.jupiter:junit-jupiter-api:5.9.2")

	testImplementation("org.springframework.boot:spring-boot-starter-test")
}

tasks.withType<Test> {
	useJUnitPlatform()
}

tasks.getByName<BootJar>("bootJar") {
    archiveFileName.set("my-app.jar")
    mainClass.set("com.pr.golf.golfapp.GolfAppApplication")
}

