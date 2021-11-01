init:
	@make init-front
	@make init-api
	@make init-husky
init-front:
	cd frontend && yarn
init-husky:
	yarn
init-api:
	cd api && yarn
start-front:
	cd frontend && yarn start
start-api:
	cd api && yarn start:dev
build-front:
	cd frontend && yarn build
start-sql:
	docker compose up
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
