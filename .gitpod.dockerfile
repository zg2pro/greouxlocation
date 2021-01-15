FROM gitpod/workspace-full

RUN sudo apt-get update

#RUN npm install travis-cli -g

RUN sudo apt install ruby ruby-dev -y

RUN sudo gem install travis
