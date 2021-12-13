init:
	@make init-front
	@make init-api
	@make init-husky
	@make generate-gql
	@make build
init-front:
	cd frontend && yarn
init-husky:
	yarn
init-api:
	cd api && yarn
generate-gql:
	cd frontend && yarn generate-gql
up:
	docker compose up
down:
	docker compose down
restart:
	@make down
	@make up
ps:
	docker compose ps
build:
	docker compose up --build
init-database:
	docker compose exec db-server mysql -u root -p -e'CREATE DATABASE IF NOT EXISTS taosk_db; GRANT ALL PRIVILEGES ON taosk_db.* TO develop@"%";'
sql:
	docker compose exec db-server bash -c 'mysql -u $$MYSQL_USER -p$$MYSQL_PASSWORD $$MYSQL_DATABASE'
prisma-generate:
	cd api && yarn prisma:generate
prisma-seed:
	cd api && yarn prisma:seed
create-model:
	cd api && nest g mo ${name}
create-resolver:
	cd api && nest g r ${name}
create-service:
	cd api && nest g s ${name}
create-class:
	cd api && nest g cl ${name}
create-config:
	cd api && nest g config ${name}
create-controller:
	cd api && nest g co ${name}
create-decorator:
	cd api && nest g d ${name}
create-filter:
	cd api && nest g f ${name}
create-gateway:
	cd api && nest g ga ${name}
create-guard:
	cd api && nest g gu ${name}
create-interceptor:
	cd api && nest g in ${name}
create-interface:
	cd api && nest g interface ${name}
create-middleware:
	cd api && nest g mi ${name}
create-pipe:
	cd api && nest g pi ${name}
create-provider:
	cd api && nest g pr ${name}
create-library:
	cd api && nest g lib ${name}
create-resource:
	cd api && nest g res ${name}
