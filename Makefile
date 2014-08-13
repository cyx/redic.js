test:
	node test.js

start_redis:
	redis-server --daemonize yes --port 10001 --requirepass test

stop_redis:
	redis-cli -p 10001 -a test SHUTDOWN

.PHONY: test
