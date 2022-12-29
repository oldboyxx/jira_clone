FROM amazonlinux:latest
# RUN touch ~/.bashrc
RUN mkdir /app
COPY . /app

RUN yum install curl procps tar -y
RUN curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash
RUN echo "source ~/.nvm/nvm.sh" >> ~/.profile
SHELL ["/bin/bash", "-l", "-c"]
RUN source ~/.profile
RUN nvm install 12.19.0
RUN nvm use 12.19.0
RUN npm --version
RUN cd /app && npm run install-dependencies

CMD ["bash", "/app/start.sh"]