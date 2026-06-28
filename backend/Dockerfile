# FROM ubuntu

# # Install Node.js
# RUN apt-get update && apt-get install -y curl \
#     && curl -sL https://deb.nodesource.com/setup_18.x | bash - \
#     && apt-get install -y nodejs \
#     && apt-get clean

# WORKDIR /app

# COPY package*.json ./
# RUN npm install

# # 🔥 COPY ALL FILES (including config/)
# COPY . .

# EXPOSE 3000

# CMD ["node", "index.js"]

FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "index.js"]

