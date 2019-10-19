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
	@cd server && nohup java -jar camagru-0.0.1.jar >/dev/null 2>&1 &
	@sleep 0.5
	@echo "\r\t     [ $(YELLOW)\xE2\x9C\x94$(RESET) ]"
	@echo ""
	@sleep 0.5

	@echo "\t     [   ]  Installing the $(UNDERLINE)Dependency of React$(RESET).\c"
	@cd app && npm install &> /dev/null
	@sleep 0.5
	@echo "\r\t     [ $(YELLOW)\xE2\x9C\x94$(RESET) ]"
	@echo ""
	@sleep 0.5
	
	@echo "\t     [   ]  Initializing the $(UNDERLINE)React Web Application$(RESET).\c"
	@cd app && nohup npm start >/dev/null 2>&1 &
	@sleep 0.5
	@echo "\r\t     [ $(YELLOW)\xE2\x9C\x94$(RESET) ]"
	@echo ""
	@sleep 0.5

	@echo "\t$(GREEN_BOLD)CAMAGRU APP > $(WHITE_BOLD)It has been completed. $(UNDERLINE)It will be opened your browser automatically$(RESET)."
	@echo ""

end:
	@echo "Trying to terminate all Camagru application server :)"
	@pkill -9 -f camagru

