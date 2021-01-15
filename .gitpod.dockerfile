FROM gitpod/workspace-full

RUN sudo apt-get update

#RUN npm install travis-cli -g

RUN sudo apt install ruby ruby-dev libffi-dev make gcc -y
RUN cd /usr/local ; 
RUN sudo touch Gemfile
RUN sudo chmod 777 Gemfile
RUN sudo gem install travis
