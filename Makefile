init:
	@make init-front
	@make init
init-front:
	cd frontend && yarn
init:
	yarn
start-front:
	cd frontend && yarn start
build-front:
	cd frontend && yarn build
test-front:
	cd frontend && yarn test
eslint-front:
	cd frontend && yarn fix:eslint
prettier-front:
	cd frontend && yarn fix:prettier
