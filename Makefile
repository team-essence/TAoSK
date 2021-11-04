init:
	@make init-front
	@make init-api
	@make init-husky
	@make generate-gql
init-front:
	cd frontend && yarn
init-husky:
	yarn
init-api:
	cd api && yarn
start-front:
	cd frontend && yarn start
build-front:
	cd frontend && yarn build
generate-gql:
	cd frontend && yarn generate-gql
start-api:
	cd api && docker compose up
down-api:
	cd api && docker compose down
ps:
	cd api && docker compose ps
re-build-api:
	cd api && docker compose up --build
test-front:
	cd frontend && yarn test
eslint-front:
	cd frontend && yarn fix:eslint
prettier-front:
	cd frontend && yarn fix:prettier
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
init-database:
	cd api && docker compose exec db-server mysql -u root -p -e'CREATE DATABASE IF NOT EXISTS taosk_db; GRANT ALL PRIVILEGES ON taosk_db.* TO develop@"%";'
sql:
	cd api && docker compose exec db-server bash -c 'mysql -u $$MYSQL_USER -p$$MYSQL_PASSWORD $$MYSQL_DATABASE'
