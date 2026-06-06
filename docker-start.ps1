Write-Host "Iniciando Docker Compose..." -ForegroundColor Green
docker-compose down -v
docker-compose up --build