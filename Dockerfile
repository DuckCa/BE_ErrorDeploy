
# Sử dụng Node.js LTS làm base image
FROM node:20

# Thiết lập thư mục làm việc
WORKDIR /src/server

# Sao chép package.json và package-lock.json
COPY package*.json ./
RUN if [ -f package-lock.json ]; then npm ci; else npm install; fi

# Cài đặt dependencies chỉ cho production
RUN npm ci --only=production

# Thiết lập biến môi trường cho production
ENV NODE_ENV production

# Sao chép toàn bộ mã nguồn vào container
COPY . .

# Thiết lập cổng mặc định
EXPOSE 8050

# Chạy ứng dụng
CMD ["node", "src/server.js"]



