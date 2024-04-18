install:
	docker-compose up -d

tests:
	docker-compose exec backend bash -c 'npm run test'