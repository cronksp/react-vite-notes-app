# cronksp 
# Dockerfile for the "React Playground" project, a general react playground for testing and learning react concepts

# Use the official image as a parent image
FROM node:14

# Let scripts know we're running in Docker (useful for containerised development)
ENV RUNNING_IN_DOCKER true

# Create workspaces directory (multi dir paths will create all directories in the path) & set it as the working directory
# NOTE: This is the directory that will be "bind" mounted to the local workspace folder based on the devcontainer.json
# NOTE: This dir is being created now so that the user can be created with the correct permissions
# NOTE: /workspaces is the default directory for the devcontainer in vscode
# NOTE: /workspaces/react-playground is the directory for this project, so RUN npm install here.
#WORKDIR /workspaces
#WORKDIR /dev/workspaceExample
WORKDIR /workspaces/react-playground

#Export the path to the node_modules/.bin directory to the $PATH environment variable
ENV PATH /workspaces/react-playground/node_modules/.bin:$PATH

# Copy package.json and package-lock.json to the container
# unneeded as we are letting the devContainer "bind" mount the ${localWorkspaceFolder} to /workspaces
## per our directory structure, this includes the package.json file
#COPY /react-playground/package.json ./

# Install dependencies from the package.json file within the container
RUN npm install --silent

# Copy the current directory contents into the container at /workspace after npm install to avoid re-installing dependencies
# unneeded as we are letting the devContainer "bind" mount the ${localWorkspaceFolder} to /workspaces
## per our directory structure, this includes the package.json file
#COPY /react-playground ./

# Installs tool requirements, curl, git, zsh, wget etc.
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    git \
    zsh \
    wget \
    && rm -rf /var/lib/apt/lists/*

# Define the non root user (DevConUser) to use when running the container
# NOTE: Make this a unique USERNAME/GID/UID for your project (I've had issues with the default 1000 being used by other containers)
ARG USERNAME=DevConUser2
ARG USER_UID=1001
ARG USER_GID=$USER_UID

# Create the user
RUN groupadd --gid $USER_GID $USERNAME \
    && useradd --uid $USER_UID --gid $USER_GID -m $USERNAME \
    # give the user access to /app or /workspaces or other dir
    #&& chown -R $USERNAME /app \
    && chown -R $USERNAME /workspaces \
    # [Optional] Add sudo support. Omit if you don't need to install software after connecting.
    && apt-get update \
    && apt-get install -y sudo \
    && echo $USERNAME ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/$USERNAME \
    && chmod 0440 /etc/sudoers.d/$USERNAME \
    # Bash persistency (untested)
    && SNIPPET="export PROMPT_COMMAND='history -a' && export HISTFILE=/commandhistory/..zsh_history" \
    && mkdir /commandhistory \
    && touch /commandhistory/.zsh_history \
    && chown -R $USERNAME /commandhistory \
    && echo "$SNIPPET" >> "/home/$USERNAME/.zshrc"

# [Optional] Set the default user. Omit if you want to keep the default as root.
USER $USERNAME

# During debugging, this entry point will be overridden. For more information, please refer to https://aka.ms/vscode-docker-python-debug
# File wsgi.py was not found. Please enter the Python path to wsgi file.
#CMD ["gunicorn", "--bind", "0.0.0.0:8777", "pythonPath.to.wsgi"]

# Set the environment variable to use polling for file watching
ENV CHOKIDAR_USEPOLLING=true
#ENV WATCHPACK_POLLING=true

#CMD ["npm install"]
CMD ["zsh","npm", "start"]