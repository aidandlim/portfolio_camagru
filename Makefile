NAME = camagru

GREEN_BOLD = \033[1;34m
WHITE_BOLD = \033[1;37m
YELLOW = \033[0;32m
UNDERLINE = \033[1;4;37m
RESET = \033[0;37m

all:
	@echo "usage:"
	@echo "\tmake start : to initialize Camagru application"
	@echo "\tmake end : to terminate Camagru application"

start:
	@echo ""
	@echo "\t$(GREEN_BOLD)CAMAGRU APP > $(WHITE_BOLD)Welcome! The server setting process is initializing.$(RESET)"
	@echo ""
	@echo "\t     [   ]  Initializing the $(UNDERLINE)Restful API Backend Server$(RESET).\c"
	@rm -rf ./server/src/main/resources/data/picture
	@mkdir ./server/src/main/resources/data/picture
	@cd server && nohup java -jar camagru-1.0.0.jar >/dev/null 2>&1 &
	@sleep 0.5
	@echo "\r\t     [ $(YELLOW)#$(RESET) ]"
	@echo ""
	@sleep 0.5

	@echo "\t     [   ]  Installing the $(UNDERLINE)Dependency of React Application$(RESET).\c"
	@cd app && npm install --quiet --no-progress > /dev/null 2>&1
	@sleep 0.5
	@echo "\r\t     [ $(YELLOW)#$(RESET) ]"
	@echo ""
	@sleep 0.5
	
	@echo "\t     [   ]  Initializing the $(UNDERLINE)Frontend Web Application$(RESET).\c"
	@cd app && nohup npm start >/dev/null 2>&1 &
	@sleep 0.5
	@echo "\r\t     [ $(YELLOW)#$(RESET) ]"
	@echo ""
	@sleep 0.5

	@echo "\t$(GREEN_BOLD)CAMAGRU APP > $(WHITE_BOLD)It has been completed."
	@echo ""

end:
	@echo "Trying to terminate all Camagru application server :)"
	@pkill -9 -f camagru

deploy:
	cd server && sudo nohup java -jar camagru-1.0.0.jar &
	cd app && sudo nohup npm start &
