# Use an official PHP image as the base image
FROM php:8.2-fpm

# Install system dependencies and PHP extensions required for Laravel
RUN apt-get update && apt-get install -y libpng-dev libjpeg-dev libfreetype6-dev zip git && \
    docker-php-ext-configure gd --with-freetype --with-jpeg && \
    docker-php-ext-install gd pdo pdo_mysql

# Install Composer (PHP dependency manager)
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Set the working directory in the container
WORKDIR /var/www

# Copy the Laravel application into the container
COPY . /var/www

# Install Laravel dependencies using Composer
RUN composer install --optimize-autoloader --no-dev

# Set proper permissions for Laravel files
RUN chown -R www-data:www-data /var/www

# Expose port 9000 (or your app's port)
EXPOSE 9000

# Start the PHP-FPM server
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=9000"]
