install:
	npm ci

ci-check:
	npm run ci:check

clean:
	scripts/clean

build-android:
	android/gradlew app:assembleRelease -p android/

run-android:
	npm run android

build-ios:
	bundle exec fastlane ios test

sonarqube:
	@sonar-scanner \
		-Dproject.settings=sonar-scanner.properties \
    -Dsonar.login=${SONAR_CLOUD_TOKEN}
